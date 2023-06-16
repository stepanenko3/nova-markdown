<template>
    <DefaultField
        :field="currentField"
        :errors="errors"
        :full-width-content="true"
        :show-help-text="showHelpText"
    >
        <template #field>
            <div
                class="bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
                :class="{
                    'markdown-fullscreen fixed inset-0 z-50': isFullScreen,
                    'form-input form-input-bordered px-0': !isFullScreen,
                    'form-input-border-error': errors.has('body'),
                }"
            >
                <header
                    class="flex items-center overflow-x-auto content-center justify-between border-b border-gray-200 dark:border-gray-700"
                    :class="{ 'bg-gray-100': currentlyIsReadonly }"
                >
                    <div class="w-full flex items-center content-center">
                        <button
                            :class="{
                                'text-primary-500 font-bold':
                                    this.mode == 'write',
                            }"
                            @click.prevent="write"
                            class="ml-1 text-90 px-3 h-10"
                        >
                            {{ __("Write") }}
                        </button>
                        <button
                            :class="{
                                'text-primary-500 font-bold':
                                    this.mode == 'preview',
                            }"
                            @click.prevent="preview"
                            class="text-90 px-3 h-10"
                        >
                            {{ __("Preview") }}
                        </button>
                    </div>

                    <div v-if="!currentlyIsReadonly" class="flex items-center">
                        <button
                            :key="tool.action"
                            @click.prevent="callAction(tool.action)"
                            v-for="tool in headerTools"
                            class="rounded-none w-10 h-10 flex-shrink-0 ico-button inline-flex items-center justify-center px-2 text-sm border-l border-gray-200 dark:border-gray-700"
                        >
                            <template v-if="tool.icon">
                                <Icon
                                    v-if="tool.useHeroIcons"
                                    class="w-4 h-4"
                                    :type="tool.icon"
                                />
                                <component
                                    v-else
                                    class="w-4 h-4"
                                    :is="tool.icon"
                                />
                            </template>
                            <p v-else class="text-bold" v-text="tool.text"></p>
                        </button>
                    </div>
                </header>

                <div
                    v-if="!currentlyIsReadonly"
                    class="flex items-center overflow-x-auto content-center border-b border-gray-200 dark:border-gray-700"
                >
                    <button
                        :key="tool.action"
                        @click.prevent="callAction(tool.action)"
                        v-for="tool in tools"
                        class="rounded-none w-10 h-10 flex-shrink-0 ico-button inline-flex items-center justify-center px-2 text-sm border-r border-gray-200 dark:border-gray-700"
                    >
                        <template v-if="tool.icon">
                            <Icon
                                v-if="tool.useHeroIcons"
                                class="w-4 h-4"
                                :type="tool.icon"
                            />
                            <component v-else class="w-4 h-4" :is="tool.icon" />
                        </template>
                        <p v-else class="text-bold" v-text="tool.text"></p>
                    </button>
                </div>

                <div
                    v-show="mode == 'write'"
                    @click="focus"
                    class="dark:bg-gray-900 p-4"
                    :class="{ 'readonly bg-gray-100': currentlyIsReadonly }"
                >
                    <textarea
                        ref="theTextarea"
                        spellcheck="true"
                        :class="{ 'bg-gray-100': currentlyIsReadonly }"
                    />
                </div>

                <div
                    v-show="mode == 'preview'"
                    class="markdown overflow-scroll p-4"
                    v-html="previewContent()"
                />

                <footer
                    v-if="statuses?.length > 0"
                    class="flex items-center overflow-x-auto content-center justify-end border-t border-gray-200 dark:border-gray-700"
                >
                    <div
                        :key="status.name"
                        v-for="status in statuses"
                        class="rounded-none h-10 flex-shrink-0 ico-button inline-flex items-center justify-center px-2 text-sm border-r border-gray-200 dark:border-gray-700"
                    >
                        {{ statusData[status.name] }}
                    </div>
                </footer>
            </div>


            <Teleport to="body">
                <BrowserModal
                    :multiple="true"
                    :selecting="true"
                    v-model:state="fileManagerState"
                    @confirmSelection="confirmSelection"
                />
            </Teleport>
        </template>
    </DefaultField>
</template>

<script>
import each from "lodash/each";
import map from "lodash/map";

import md from "markdown-it";
import CodeMirror from "codemirror";

// import './codemirror/tablist'
import "codemirror/mode/gfm/gfm.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/xml/xml.js";

import "codemirror/addon/edit/continuelist.js";
import "codemirror/addon/selection/mark-selection.js";

import { DependentFormField, HandlesValidationErrors } from "laravel-nova";
import Markdown from "../mixins/markdown.js";
import { BrowserModal } from "nova-file-manager";

export default {
    mixins: [HandlesValidationErrors, DependentFormField, Markdown],

    data: () => ({
        fullScreen: false,
        isFocused: false,
        statusData: [],
        mode: "write",
        fileManagerState: false,
    }),

    components: {
        BrowserModal,
    },

    codemirror: null,

    mounted() {
        this.codemirror = CodeMirror.fromTextArea(this.$refs.theTextarea, {
            mode: {
                name: "text/x-markdown",
                highlightFormatting: true,
                name: "gfm",
                gitHubSpice: false,
            },
            showCursorWhenSelecting: true,
            tabSize: 4,
            indentWithTabs: true,
            lineWrapping: true,
            viewportMargin: Infinity,
            inputStyle: 'contenteditable',
            spellcheck: true,
            extraKeys: {
                Enter: "newlineAndIndentContinueMarkdownList",
                ...map(this.tools, (tool) => {
                    return tool.action;
                }),
            },
            readOnly: this.currentlyIsReadonly,
        });

        each(this.keyMaps, (action, map) => {
            const realMap = map.replace(
                "Cmd-",
                CodeMirror.keyMap["default"] == CodeMirror.keyMap.macDefault
                    ? "Cmd-"
                    : "Ctrl-"
            );
            this.codemirror.options.extraKeys[realMap] =
                this.actions[this.keyMaps[map]].bind(this);
        });

        this.doc().on("change", (cm, changeObj) => {
            this.value = cm.getValue();
        });

        this.codemirror.on("focus", () => (this.isFocused = true));
        this.codemirror.on("blur", () => (this.isFocused = false));

        if (this.field.value) {
            this.doc().setValue(this.field.value);
        }

        if (this.statuses?.length > 0) {
            this.statuses.forEach((v) => v.updateValue());
            this.codemirror.on("cursorActivity", () =>
                this.statuses.forEach((v) => v.updateValue())
            );
        }

        Nova.$on(this.fieldAttributeValueEventName, this.listenToValueChanges);

        this.$nextTick(() => this.codemirror.refresh());
    },

    beforeUnmount() {
        Nova.$off(this.fieldAttributeValueEventName, this.listenToValueChanges);
    },

    methods: {
        confirmSelection(files) {
            files.map(file => this.drawImage(this.codemirror, file.url, file.name))
        },

        focus() {
            this.isFocused = true;
            this.codemirror.focus();
        },

        write() {
            this.mode = "write";
            this.$nextTick(() => {
                this.codemirror.refresh();
            });
        },

        preview() {
            this.mode = "preview";
        },

        insert(insertion) {
            this.doc().replaceRange(insertion, {
                line: this.cursor.line,
                ch: this.cursor.ch,
            });
        },

        insertAround(start, end) {
            if (this.doc().somethingSelected()) {
                const selection = this.doc().getSelection();
                this.doc().replaceSelection(start + selection + end);
            } else {
                this.doc().replaceRange(start + end, {
                    line: this.cursor.line,
                    ch: this.cursor.ch,
                });
                this.doc().setCursor({
                    line: this.cursor.line,
                    ch: this.cursor.ch - end.length,
                });
            }
        },

        insertBefore(insertion, cursorOffset) {
            if (this.doc().somethingSelected()) {
                const selects = this.doc().listSelections();
                selects.forEach((selection) => {
                    const pos = [
                        selection.head.line,
                        selection.anchor.line,
                    ].sort();

                    for (let i = pos[0]; i <= pos[1]; i++) {
                        this.doc().replaceRange(insertion, { line: i, ch: 0 });
                    }

                    this.doc().setCursor({
                        line: pos[0],
                        ch: cursorOffset || 0,
                    });
                });
            } else {
                this.doc().replaceRange(insertion, {
                    line: this.cursor.line,
                    ch: 0,
                });
                this.doc().setCursor({
                    line: this.cursor.line,
                    ch: cursorOffset || 0,
                });
            }
        },

        callAction(action) {
            if (!this.currentlyIsReadonly) {
                this.focus();
                this.actions[action].call(this);
            }
        },

        listenToValueChanges(value) {
            this.doc().setValue(value);
            this.$nextTick(() => this.codemirror.refresh());
        },

        doc() {
            return this.codemirror.getDoc();
        },

        cursor() {
            return this.doc().getCursor();
        },

        rawContent() {
            return this.codemirror?.getValue();
        },

        previewContent() {
            return md(this.currentField.preset, {
                html: true,
                xhtmlOut: true,
                linkify: true,
            }).render(this.rawContent() || "");
        },
    },

    computed: {
        keyMaps: () => ({
            "Cmd-B": "bold",
            "Cmd-I": "italicize",
            "Cmd-Alt-I": "image",
            "Cmd-K": "link",
            F11: "fullScreen",
            Esc: "exitFullScreen",
        }),

        actions: () => ({
            h1() {
                if (!this.isEditable) return;

                this.toggleHeading1(this.codemirror);
            },

            h2() {
                if (!this.isEditable) return;

                this.toggleHeading2(this.codemirror);
            },

            h3() {
                if (!this.isEditable) return;

                this.toggleHeading3(this.codemirror);
            },

            headingSmaller() {
                if (!this.isEditable) return;

                this.toggleHeadingSmaller(this.codemirror);
            },

            headingBigger() {
                if (!this.isEditable) return;

                this.toggleHeadingBigger(this.codemirror);
            },

            bold() {
                if (!this.isEditable) return;

                this.toggleBold(this.codemirror);
            },

            italicize() {
                if (!this.isEditable) return;

                this.toggleItalic(this.codemirror);
            },

            strikethrough() {
                if (!this.isEditable) return;

                this.toggleStrikethrough(this.codemirror);
            },

            quote() {
                if (!this.isEditable) return;

                this.toggleBlockquote(this.codemirror);
            },

            unorderedList() {
                if (!this.isEditable) return;

                this.toggleUnorderedList(this.codemirror);
            },

            orderedList() {
                if (!this.isEditable) return;

                this.toggleOrderedList(this.codemirror);
            },

            link() {
                if (!this.isEditable) return;

                this.drawLink(this.codemirror);
            },

            quoteBlock() {
                if (!this.isEditable) return;

                this.drawQuoteBlock(this.codemirror);
            },

            link() {
                if (!this.isEditable) return;

                this.drawLink(this.codemirror);
            },

            fileManager() {
                if (!this.isEditable) return;

                this.fileManagerState = true;
            },

            image() {
                if (!this.isEditable) return;

                this.drawImage(this.codemirror);
            },

            table() {
                if (!this.isEditable) return;

                this.drawTable(this.codemirror);
            },

            horizontalRule() {
                if (!this.isEditable) return;

                this.drawHorizontalRule(this.codemirror);
            },

            code() {
                if (!this.isEditable) return;

                this.toggleCodeBlock(this.codemirror);
            },

            toggleFullScreen() {
                this.fullScreen = !this.fullScreen;
                this.$nextTick(() => this.codemirror.refresh());
            },

            fullScreen() {
                this.fullScreen = true;
            },

            exitFullScreen() {
                this.fullScreen = false;
            },
        }),

        headerTools: () => [
            {
                name: "fullScreen",
                action: "toggleFullScreen",
                icon: "icon-full-screen",
            },
        ],

        tools() {
            return [
                {
                    name: "h1",
                    action: "h1",
                    text: "h1",
                },
                {
                    name: "h2",
                    action: "h2",
                    text: "h2",
                },
                {
                    name: "h3",
                    action: "h3",
                    text: "h3",
                },
                {
                    name: "headingBigger",
                    action: "headingBigger",
                    text: "H↑",
                },
                {
                    name: "headingSmaller",
                    action: "headingSmaller",
                    text: "H↓",
                },
                {
                    name: "bold",
                    action: "bold",
                    text: "b",
                },
                {
                    name: "italicize",
                    action: "italicize",
                    text: "i",
                },
                {
                    name: "strikethrough",
                    action: "strikethrough",
                    text: "s",
                },
                {
                    name: "quote",
                    action: "quote",
                    text: "q",
                },
                {
                    name: "unorderedList",
                    action: "unorderedList",
                    text: "ul",
                },
                {
                    name: "orderedList",
                    action: "orderedList",
                    text: "ol",
                },
                {
                    name: "quoteBlock",
                    action: "quoteBlock",
                    text: "«»",
                },
                {
                    name: "link",
                    action: "link",
                    icon: "link",
                    useHeroIcons: true,
                },
                {
                    name: "image",
                    action: "image",
                    icon: "photograph",
                    useHeroIcons: true,
                },
                {
                    name: "fileManager",
                    action: "fileManager",
                    icon: "folder",
                    useHeroIcons: true,
                },
                {
                    name: "table",
                    action: "table",
                    text: "t",
                },
                {
                    name: "horizontalRule",
                    action: "horizontalRule",
                    text: "hr",
                },
                {
                    name: "code",
                    action: "code",
                    icon: "code",
                    useHeroIcons: true,
                },
            ].filter((tool) => this.field.toolbar.indexOf(tool.name) !== -1);
        },

        statuses() {
            return [
                {
                    name: "lines",
                    updateValue: () =>
                        (this.statusData.lines = this.__("lines: :value", {
                            value: this.codemirror.lineCount(),
                        })),
                },
                {
                    name: "words",
                    updateValue: () =>
                        (this.statusData.words = this.__("words: :value", {
                            value: this.wordCount(this.rawContent() || ""),
                        })),
                },
                {
                    name: "cursor",
                    updateValue: () => {
                        const cursor = this.codemirror.getCursor();

                        this.statusData.cursor = `${cursor.line}:${cursor.ch}`;
                    },
                },
            ].filter(
                (status) => this.field.statusbar.indexOf(status.name) !== -1
            );
        },

        isFullScreen() {
            return this.fullScreen == true;
        },

        isEditable() {
            return !this.currentlyIsReadonly && this.mode == "write";
        },
    },
};
</script>

<style>
.markdown img,
.markdown svg {
    display: inline-block !important;
}

.markdown a {
    text-decoration: underline;
}
</style>
