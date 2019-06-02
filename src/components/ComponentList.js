import Vue from 'vue'
import { QList, QItem, QItemSection, QInput } from 'quasar'

const context = require.context('quasar/dist/api', true, /\.(json)$/)
const components = context.keys().map(c => c.replace('./', '').replace('.json', '')).filter(c => c[0] === 'Q')

export default Vue.extend({
  props: {
    value: String
  },

  data () {
    return {
      filter: null
    }
  },

  computed: {
    filteredComponents () {
      if (this.filter) {
        const filter = this.filter.toLowerCase()
        return components.filter(c => c.toLowerCase().includes(filter))
      }
      return components
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'column'
    }, [
      h(QInput, {
        props: {
          value: this.filter,
          square: true,
          debounce: 500,
          standout: 'bg-primary text-white'
        },
        attrs: {
          placeholder: 'Search components'
        },
        on: {
          input: val => {
            this.filter = val
          }
        }
      }),
      h(QList, {
        props: {
          separator: true
        }
      }, this.filteredComponents.map(c => h(QItem, {
        props: {
          active: this.value === c,
          clickable: true
        },
        directives: [
          {
            name: 'ripple'
          }
        ],
        on: {
          click: () => {
            this.$emit('input', c)
          }
        }
      }, [h(QItemSection, [c])])))
    ])
  }
})
