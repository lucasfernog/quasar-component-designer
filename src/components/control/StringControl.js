import {
  QInput,
  QSelect
} from 'quasar'
import Vue from 'vue'

export default Vue.extend({
  name: 'StringControl',

  props: {
    value: String,
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
    const props = {
      value: this.value,
      label: this.prop,
      disable: this.disable,
      hint: this.hint
    }

    let component
    if (this.propDefinition.values === void 0) {
      component = QInput
    } else {
      component = QSelect
      props.options = this.propDefinition.values.map(v => {
        return {
          label: v,
          value: v
        }
      })
      props['emit-value'] = true
    }

    return h(component, {
      props,
      on: {
        input: val => {
          this.$emit('input', val)
        }
      },
      attrs: {
        placeholder: this.prop
      }
    })
  }
})
