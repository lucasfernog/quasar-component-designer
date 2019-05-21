import { QList, QExpansionItem, QItem, QItemSection, QCard } from 'quasar'
import VueJsonPretty from 'vue-json-pretty'
export default (h, model, property, definition) => {
  return h(QList, {
    props: {
      bordered: true,
      dense: true
    }
  }, !model[property] ? null : model[property].map((item, index) =>
    typeof item === 'object' ? h(QExpansionItem, {
      props: {
        group: 'GROUP',
        label: `Item ${index + 1}`
      }
    }, [
      h(QCard, [
        h(VueJsonPretty, {
          props: {
            data: item,
            deep: 1,
            showLength: true,
            showDoubleQuotes: false
          }
        })
      ])
    ]) : h(QItem, [
      h(QItemSection, item)
    ])
  ))
}
