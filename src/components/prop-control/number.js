import {
  QInput
} from 'quasar'

export default (h, propValues, prop, propDefinition) => {
  return h(QInput, {
    props: {
      value: propValues[prop],
      label: prop,
      type: 'number'
    },
    on: {
      input: (val) => {
        if (val === null || val === void 0 || val === '') {
          propValues[prop] = null
        } else {
          propValues[prop] = val.includes('.') ? parseFloat(val) : parseInt(val)
        }
      }
    },
    attrs: {
      placeholder: propDefinition.desc
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
