import {
  QInput
} from 'quasar'
import Vue from 'vue'

export default Vue.extend({
  name: 'NumberControl',

  props: {
    value: Number,
    prop: {
      type: String,
      required: true
    },
    propDefinition: {
      type: Object,
      required: true
    },
    disable: Boolean,
    hint: String
  },

  render (h) {
    return h(QInput, {
      props: {
        value: this.value,
        label: this.prop,
        type: 'number',
        disable: this.disable,
        hint: this.hint
      },
      on: {
        input: val => {
          let value
          if (val === null || val === void 0 || val === '') {
            value = null
          } else {
            value = val.includes('.') ? parseFloat(val) : parseInt(val)
          }
          this.$emit('input', value)
        }
      },
      attrs: {
        placeholder: this.propDefinition.desc
      }
    })
  }
})
