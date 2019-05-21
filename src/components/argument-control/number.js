import {
  QInput
} from 'quasar'

export default (h, argumentsValues, argument, argumentDefinition) => {
  return h(QInput, {
    props: {
      value: argumentsValues[argument],
      label: argument,
      type: 'number'
    },
    on: {
      input: (val) => {
        if (val === null || val === void 0 || val === '') {
          argumentsValues[argument] = null
        } else {
          argumentsValues[argument] = val.includes('.') ? parseFloat(val) : parseInt(val)
        }
      }
    },
    attrs: {
      placeholder: argumentDefinition.desc
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
