import { QList, QExpansionItem, QItem, QItemSection, QCard } from 'quasar'
import VueJsonPretty from 'vue-json-pretty'
import Vue from 'vue'

export default Vue.extend({
  name: 'ArrayControl',

  props: {
    value: Array,
    disable: Boolean,
    hint: String
  },

  render (h) {
    return h(QList, {
      props: {
        bordered: true,
        dense: true,
        disable: this.disable,
        hint: this.hint
      }
    }, !this.value ? null : this.value.map((item, index) =>
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
})
