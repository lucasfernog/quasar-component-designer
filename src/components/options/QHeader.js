import {
  QToolbar,
  QToolbarTitle,
  QLayout,
  slot
} from 'quasar'
import Vue from 'vue'

export default {
  getParentComponent (props) {
    return Vue.extend({
      render (h) {
        return h(QLayout, {
          props: {
            view: 'lHh lpr lFf',
            container: true
          },
          contentClass: 'bg-grey-3',
          style: {
            height: '200px'
          }
        }, slot(this, 'default'))
      }
    })
  },
  renderChildren: (h, props) => [
    h(QToolbar, [
      h(QToolbarTitle, 'Content')
    ])
  ]
}
