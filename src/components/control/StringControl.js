import {
  QInput,
  QSelect
} from 'quasar'
import Vue from 'vue'
const iconSet = require('../props/iconSet.js').default

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
    iconSet: {
      type: String,
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
    const propDefinitionValues = this.propDefinition.values || (this.prop.includes('icon') && iconSet[this.iconSet])
    if (propDefinitionValues) {
      component = QSelect
      const options = propDefinitionValues.map(v => {
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
    } else {
      component = QInput
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
