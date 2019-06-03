import Vue from 'vue'
import {
  QInput
} from 'quasar'

export default {
  renderChildren (h, props) {
    Vue.util.defineReactive(this, 'val1', '')
    Vue.util.defineReactive(this, 'val2', '')
    const self = this
    return [
      h(QInput, {
        props: {
          value: this.val1,
          label: 'Required Control',
          rules: [val => !!val || 'This field is required']
        },
        on: {
          input (val) {
            self.val1 = val
          }
        }
      }),
      h(QInput, {
        props: {
          value: this.val2,
          label: 'Required Control 2',
          rules: [val => !!val || 'This field is required']
        },
        on: {
          input (val) {
            self.val2 = val
          }
        }
      })
    ]
  }
}
