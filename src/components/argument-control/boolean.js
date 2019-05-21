import {
  QToggle
} from 'quasar'

export default (h, argumentsValues, argument) => {
  return h(QToggle, {
    props: {
      value: argumentsValues[argument],
      label: argument
    },
    on: {
      input: (val) => {
        argumentsValues[argument] = val
      }
    },
    staticClass: 'col-xs-3 col-md-2'
  })
}
