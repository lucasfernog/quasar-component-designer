import {
  QInput,
  QSelect
} from 'quasar'

export default (h, model, property, definition) => {
  const props = {
    value: model[property],
    label: property
  }

  let component
  if (definition.values === void 0) {
    component = QInput
  } else {
    component = QSelect
    props.options = definition.values.map(v => {
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
        model[property] = val
      }
    },
    attrs: {
      placeholder: property
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
