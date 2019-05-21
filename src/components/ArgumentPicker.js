import Vue from 'vue'
import { QMenu, QBtn } from 'quasar'

const types = {
  Boolean: {
    render: require('./argument-control/boolean').default,
    defaultValue: def => (def.default || 'false').toLowerCase() === 'true'
  },
  String: {
    render: require('./argument-control/string').default,
    defaultValue: def => def.required ? (def.default || '') : null
  },
  Any: {
    render: require('./argument-control/json').default,
    defaultValue: def => def.required ? (def.default || '') : null
  }
}

export default Vue.extend({
  props: {
    arguments: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      argumentsValues: {}
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
          types[type].render(h, this.argumentsValues, argument, argumentDefinition)
        )
        defaultValue = types[type].defaultValue(argumentDefinition)
      }

      if (this.argumentsValues[argument] === void 0) {
        this.$set(this.argumentsValues, argument, defaultValue)
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
          this.$emit('pick', this.argumentsValues)
        }
      }
    }))

    console.log(controls)
    return h(QMenu, [h('div', {
      staticClass: 'col'
    }, controls)])
  }
})
