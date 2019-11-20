import Vue from 'vue'
import { slot } from 'quasar'

export default {
  getParentComponent (props) {
    return Vue.extend({
      render (h) {
        return h('span', {
          staticClass: 'text-h4'
        }, [
          'Test container',
          slot(this, 'default')
        ])
      }
    })
  },

  props: {
    label: {
      defaultValue: 'Label'
    }
  }
}
