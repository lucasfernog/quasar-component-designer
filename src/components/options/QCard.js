import { QCardSection, QCardActions, QSeparator, QBtn } from 'quasar'

export default {
  renderChildren: (h, props) => [
    h(QCardSection, [
      h('div', {
        staticClass: 'text-h6'
      }, 'Card Title'),
      h('div', {
        staticClass: 'text-subtitle2'
      }, 'Card subtitle')
    ]),
    h(QCardSection, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
    h(QSeparator, {
      props: {
        dark: props.dark
      }
    }),
    h(QCardActions, [
      h(QBtn, {
        props: {
          flat: true
        }
      }, 'Action btn')])
  ]
}
