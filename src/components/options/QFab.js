import { QFabAction } from 'quasar'

function getFabAction (h, icon) {
  return h(QFabAction, {
    props: {
      icon
    }
  })
}

export default {
  renderChildren (h, props) {
    return [
      getFabAction(h, 'menu'),
      getFabAction(h, 'fullscreen')
    ]
  }
}
