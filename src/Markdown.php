<?php

namespace Stepanenko3\NovaMarkdown;

use Illuminate\Support\Arr;
use Laravel\Nova\Contracts\FilterableField;
use Laravel\Nova\Fields\Expandable;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Fields\FieldFilterable;
use Laravel\Nova\Fields\Filters\TextFilter;
use Laravel\Nova\Http\Requests\NovaRequest;

class Markdown extends Field implements FilterableField
{
    use Expandable,
        FieldFilterable;

    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'markdown';

    /**
     * Indicates if the element should be shown on the index view.
     *
     * @var bool
     */
    public $showOnIndex = false;

    /**
     * Indicates the preset the field should use.
     *
     * @var string|array<string, mixed>
     */
    public $preset = 'default';

    /**
     * Create a new element.
     * @param  string|null  $component
     */
    public function __construct($component = null)
    {
        parent::__construct($component);

        $this->withMeta([
            'toolbar' => config('nova-markdown.toolbar'),
            'statusbar' => config('nova-markdown.statusbar'),
        ]);
    }


    public function toolbar($array)
    {
        $this->withMeta([
            'toolbar' => $array,
        ]);

        return $this;
    }

    public function statusbar($array)
    {
        $this->withMeta([
            'statusbar' => $array,
        ]);

        return $this;
    }

    /**
     * Define the preset the field should use. Can be "commonmark", "zero", and "default".
     *
     * @param  string|array<string, mixed>  $preset
     * @return $this
     */
    public function preset($preset)
    {
        $this->preset = $preset;

        return $this;
    }

    /**
     * Make the field filter.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return \Laravel\Nova\Fields\Filters\Filter
     */
    protected function makeFilter(NovaRequest $request)
    {
        return new TextFilter($this);
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function serializeForFilter()
    {
        return transform($this->jsonSerialize(), function ($field) {
            return Arr::only($field, [
                'uniqueKey',
                'name',
                'attribute',
            ]);
        });
    }

    /**
     * Prepare the element for JSON serialization.
     *
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), [
            'shouldShow' => $this->shouldBeExpanded(),
            'preset' => $this->preset,
        ]);
    }
}
