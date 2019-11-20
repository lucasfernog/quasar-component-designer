import { QFab } from 'quasar'

export default {
  getParentComponent: props => QFab,
  props: {
    icon: {
      defaultValue: 'menu'
    }
  }
}
