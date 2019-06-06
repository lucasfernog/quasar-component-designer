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

  data () {
    return {
      options: null
    }
  },

  render (h) {
    const props = {
      value: this.value,
      label: this.prop,
      disable: this.disable,
      hint: this.hint
    }

    let component, on = {}
    if (this.propDefinition.values === void 0) {
      component = QInput
    } else {
      component = QSelect
      const options = this.propDefinition.values.map(v => {
        return {
          label: v,
          value: v
        }
      })
      if (this.options === null) {
        this.options = options
      }
      props['emit-value'] = true
      props['use-input'] = true
      props['fill-input'] = true
      props['hide-selected'] = true
      props['input-debounce'] = 0
      on.filter = (val, update, abort) => {
        update(() => {
          const needle = val.toLowerCase()
          this.options = options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      }
    }

    return h(component, {
      props: {
        options: this.options,
        ...props
      },
      on: {
        input: val => {
          this.$emit('input', val)
        },
        ...on
      },
      attrs: {
        placeholder: this.prop
      }
    })
  }
})
