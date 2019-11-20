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
      disable: true,
      hint: 'This is disabled because its the name of the QCarousel presented'
    }
  }
}
