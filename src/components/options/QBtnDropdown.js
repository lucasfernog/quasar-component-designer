import {
  QList, QItem, QItemSection
} from 'quasar'

function getItem (h, text) {
  return h(QItem, {
    props: {
      clickable: true
    },
    directives: [
      {
        name: 'close-popup'
      }
    ]
  }, [
    h(QItemSection, text)
  ])
}

export default {
  renderChildren: (h, props) => [
    h(QList, [
      getItem(h, 'Button 1'),
      getItem(h, 'Button 2'),
      getItem(h, 'Button 3')
    ])
  ],
  props: {
    label: {
      defaultValue: 'Dropdown Label'
    }
  }
}
