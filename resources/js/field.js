import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-nova-markdown', IndexField)
  app.component('detail-nova-markdown', DetailField)
  app.component('form-nova-markdown', FormField)
})
