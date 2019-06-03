import { QBtn } from 'quasar'

export default {
  renderChildren (h, props) {
    return [
      'This is the banner content',
      h(QBtn, {
        props: {
          flat: true,
          color: 'white',
          label: 'Banner action'
        },
        slot: 'action'
      })
    ]
  },
  props: {
    class: {
      defaultValue: 'bg-primary text-white'
    }
  }
}
