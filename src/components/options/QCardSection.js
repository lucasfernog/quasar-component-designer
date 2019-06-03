import { QCard } from 'quasar'

export default {
  getParentComponent: (props) => QCard,
  renderChildren: (h, props) => 'This is the QCardSection content.'
}
