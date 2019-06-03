import Vue from 'vue'
import {
  QCard, QCardSection, QSeparator, QBtn, slot
} from 'quasar'

export default {
  getParentComponent (props) {
    return Vue.extend({
      render (h) {
        return h(QCard, [
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
          slot(this, 'default')
        ])
      }
    })
  },
  renderChildren: (h, props) => [
    h(QBtn, {
      props: {
        flat: true,
        label: 'First action'
      }
    }),
    h(QBtn, {
      props: {
        flat: true,
        label: 'Second action'
      }
    })
  ]
}
