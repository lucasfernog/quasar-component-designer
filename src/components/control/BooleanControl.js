import {
  QToggle
} from 'quasar'

import Vue from 'vue'

export default Vue.extend({
  name: 'BooleanControl',

  props: {
    value: Boolean,
    prop: {
      type: String,
      required: true
    }
  },

  render (h) {
    return h(QToggle, {
      props: {
        value: this.value,
        label: this.prop
      },
      on: {
        input: val => {
          this.$emit('input', val)
        }
      }
    })
  }
})
