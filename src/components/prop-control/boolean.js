import { QToggle } from 'quasar'

export default (h, propValues, prop) => {
  return h(QToggle, {
    props: {
      value: propValues[prop],
      label: prop
    },
    on: {
      input: (val) => {
        propValues[prop] = val
      }
    },
    staticClass: 'col-xs-3 col-md-2'
  })
}
