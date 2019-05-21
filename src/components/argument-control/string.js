import {
  QInput,
  QSelect
} from 'quasar'

export default (h, argumentValues, argument, argumentDefinition) => {
  const props = {
    value: argumentValues[argument],
    label: argument
  }

  let component
  if (argumentDefinition.values === void 0) {
    component = QInput
  } else {
    component = QSelect
    props.options = argumentDefinition.values.map(v => {
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
        argumentValues[argument] = val
      }
    },
    attrs: {
      placeholder: argument
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
