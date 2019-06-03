import {
  QBreadcrumbs
} from 'quasar'

export default {
  getParentComponent: (props) => QBreadcrumbs,
  props: {
    label: {
      defaultValue: 'Breadcrumb'
    }
  }
}
