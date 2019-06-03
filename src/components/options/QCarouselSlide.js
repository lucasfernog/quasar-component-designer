import Vue from 'vue'
import {
  QCarousel, slot
} from 'quasar'

export default {
  getParentComponent (props) {
    return Vue.extend({
      render (h) {
        return h(QCarousel, {
          props: {
            value: 'style'
          }
        }, slot(this, 'default'))
      }
    })
  },

  props: {
    'img-src': {
      defaultValue: 'https://cdn.quasar.dev/img/parallax1.jpg'
    },
    'name': {
      defaultValue: 'style',
      disabled: true, // TODO
      hint: 'This is disabled because its the model value of the QCarousel presented' // TODO
    }
  }
}
