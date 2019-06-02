import {
  QInput
} from 'quasar'

import Vue from 'vue'

export default Vue.extend({
  name: 'JsonControl',

  props: {
    value: [Object, String],
    prop: {
      type: String,
      required: true
    },
    propDefinition: {
      type: Object,
      required: true
    }
  },

  render (h) {
    return h(QInput, {
      props: {
        value: typeof this.value === 'object'
          ? JSON.stringify(this.value, null, 2)
          : this.value,
        label: this.prop,
        type: 'textarea'
      },
      on: {
        input: val => {
          let json
          try {
            json = JSON.parse(val)
          } catch {
            json = val
          }
          this.$emit('input', json)
        }
      },
      attrs: {
        placeholder: this.propDefinition.desc
      }
    })
  }
})
