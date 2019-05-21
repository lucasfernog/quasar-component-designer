import {
  QInput
} from 'quasar'

export default (h, model, property, definition) => {
  const props = {
    value: typeof model[property] === 'object'
      ? JSON.stringify(model[property], null, 2)
      : model[property],
    label: property,
    type: 'textarea'
  }

  return h(QInput, {
    props,
    on: {
      input: (val) => {
        let json
        try {
          json = JSON.parse(val)
        } catch {
          json = val
        }
        model[property] = json
      }
    },
    attrs: {
      placeholder: definition.desc
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
