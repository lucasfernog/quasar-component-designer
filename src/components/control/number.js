import {
  QInput
} from 'quasar'

export default (h, model, property, definition) => {
  return h(QInput, {
    props: {
      value: model[property],
      label: property,
      type: 'number'
    },
    on: {
      input: (val) => {
        if (val === null || val === void 0 || val === '') {
          model[property] = null
        } else {
          model[property] = val.includes('.') ? parseFloat(val) : parseInt(val)
        }
      }
    },
    attrs: {
      placeholder: definition.desc
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
