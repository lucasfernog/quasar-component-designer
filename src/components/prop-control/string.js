import { QInput, QSelect } from 'quasar'

export default (h, propValues, prop, propDefinition) => {
  const props = {
    value: propValues[prop],
    label: prop
  }

  // TODO
  if (prop.includes('transition')) {
    if (!propDefinition.values) {
      propDefinition.values = [
        'slide-up',
        'slide-down'
      ]
    }
  }

  let component
  if (propDefinition.values === void 0) {
    component = QInput
  } else {
    component = QSelect
    props.options = propDefinition.values.map(v => {
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
      input: (val) => {
        propValues[prop] = val
      }
    },
    domProps: {
      placeholder: prop
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
