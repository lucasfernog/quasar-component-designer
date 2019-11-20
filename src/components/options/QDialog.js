import { QCard, QCardSection } from 'quasar'

export default {
  renderChildren: (h, props) => [
    h(QCard, [
      h(QCardSection, [
        h('div', {
          staticClass: 'text-h6'
        }, 'Dialog title')
      ]),
      h(QCardSection, 'Dialog content')
    ])
  ]
}
