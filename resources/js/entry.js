Nova.booting((Vue) => {
    Vue.component('index-markdown', require('./fields/IndexField').default);
    Vue.component('detail-markdown', require('./fields/DetailField').default);
    Vue.component('form-markdown', require('./fields/FormField').default);
});
