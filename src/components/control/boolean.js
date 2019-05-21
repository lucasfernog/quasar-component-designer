import {
  QToggle
} from 'quasar'

export default (h, model, property) => {
  return h(QToggle, {
    props: {
      value: model[property],
      label: property
    },
    on: {
      input: (val) => {
        model[property] = val
      }
    },
    staticClass: 'col-xs-3 col-md-2'
  })
}
