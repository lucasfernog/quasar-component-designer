import Vue from 'vue'
import { QMenu, QBtn } from 'quasar'
import types from './utils/types.js'

export default Vue.extend({
  props: {
    arguments: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      model: {}
    }
  },

  render (h) {
    const controls = []

    for (let argument in this.arguments) {
      const argumentDefinition = this.arguments[argument]
      let defaultValue = null,
        type = argumentDefinition.type
      if (Array.isArray(type)) {
        type = type[0]
      }

      if (types[type]) {
        controls.push(
          h(types[type].component, {
            props: {
              value: this.model[argument],
              prop: argument,
              propDefinition: argumentDefinition
            },
            on: {
              input: val => {
                this.model[argument] = val
              }
            }
          })
        )
        defaultValue = types[type].defaultValue(argumentDefinition)
      }

      if (this.model[argument] === void 0) {
        this.$set(this.model, argument, defaultValue)
      }
    }

    controls.push(h(QBtn, {
      props: {
        label: 'Call',
        color: 'primary'
      },
      staticClass: 'full-width',
      directives: [
        {
          name: 'close-popup'
        }
      ],
      on: {
        click: () => {
          this.$emit('pick', this.model)
        }
      }
    }))

    return h(QMenu, [h('div', {
      staticClass: 'col'
    }, controls)])
  }
})
