import Vue from 'vue'
import { QSpinnerDots } from 'quasar'

export default {
  renderChildren (h, props) {
    return [
      this.infiniteScrollItems === void 0 ? void 0 : this.infiniteScrollItems.map((_, index) => {
        return h('div', {
          props: {
            key: index
          }
        }, [h('p', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.')])
      }),
      h('div', {
        slot: 'loading',
        staticClass: 'row justify-center q-my-md'
      }, [
        h(QSpinnerDots, {
          props: {
            color: 'primary',
            size: '40px'
          }
        })
      ])
    ]
  },

  props: {
    offset: {
      defaultValue: 250
    }
  },

  events: {
    created () {
      Vue.util.defineReactive(this, 'infiniteScrollItems', [{}, {}])
    },

    load (index, done) {
      setTimeout(() => {
        if (this.infiniteScrollItems) {
          this.infiniteScrollItems.push({}, {})
          done()
        }
      }, 2000)
    }
  }
}
