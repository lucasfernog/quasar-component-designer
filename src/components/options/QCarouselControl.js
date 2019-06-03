import Vue from 'vue'
import { QCarousel, QCarouselSlide, slot, QToggle } from 'quasar'

export default {
  getParentComponent (props) {
    return Vue.extend({
      render (h) {
        return h(QCarousel, {
          props: {
            value: 'slide',
            'control-color': 'black',
            navigation: true,
            arrows: true
          }
        }, [
          h(QCarouselSlide, {
            props: {
              name: 'slide',
              'img-src': 'https://cdn.quasar.dev/img/mountains.jpg'
            }
          }),
          h('div', {
            slot: 'control'
          }, [slot(this, 'default')])
        ])
      }
    })
  },

  renderChildren (h, props) {
    return h(QToggle, {
      props: {
        dense: true,
        value: true,
        label: 'Toggle'
      }
    })
  }
}
