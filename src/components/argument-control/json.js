import {
  QInput
} from 'quasar'

export default (h, argumentValues, argument, argumentDefinition) => {
  const props = {
    value: typeof argumentValues[argument] === 'object'
      ? JSON.stringify(argumentValues[argument], null, 2)
      : argumentValues[argument],
    label: argument,
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
        argumentValues[argument] = json
      }
    },
    attrs: {
      placeholder: argumentDefinition.desc
    },
    staticClass: 'col-xs-12 col-md-4'
  })
}
