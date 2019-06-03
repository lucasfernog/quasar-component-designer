import {
  QBreadcrumbsEl
} from 'quasar'

export default {
  renderChildren: (h, props) => [
    h(QBreadcrumbsEl, {
      props: {
        label: 'Home'
      }
    }),
    h(QBreadcrumbsEl, {
      props: {
        label: 'Components'
      }
    }),
    h(QBreadcrumbsEl, {
      props: {
        label: 'ComponentDesigner'
      }
    })
  ]
}
