import Vue from 'vue'
import {
  QBtn, slot
} from 'quasar'

export default {
  getParentComponent (props) {
    return props.stretch ? Vue.extend({
      render (h) {
        return h('div', {
          staticClass: 'flex flex-center',
          style: 'height: 120px'
        }, [slot(this, 'default')])
      }
    }) : void 0
  },
  renderChildren: (h, props) => [
    h(QBtn, {
      props: {
        color: 'primary',
        label: 'First',
        icon: 'timeline'
      }
    }),
    h(QBtn, {
      props: {
        color: 'primary',
        label: 'Second',
        icon: 'visibility'
      }
    }),
    h(QBtn, {
      props: {
        color: 'primary',
        label: 'Third',
        icon: 'update'
      }
    })
  ]
}
