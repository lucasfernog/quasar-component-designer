import {
  QBtn
} from 'quasar'

const btnProps = {
  icon: 'lens',
  dense: true,
  flat: true,
  round: true,
  size: '8.5px'
}

export default {
  renderChildren: (h, props) => [
    h(QBtn, {
      props: Object.assign({
        color: 'red'
      }, btnProps)
    }),
    h(QBtn, {
      props: Object.assign({
        color: 'yellow'
      }, btnProps)
    }),
    h(QBtn, {
      props: Object.assign({
        color: 'green'
      }, btnProps)
    }),
    h('div', {
      staticClass: 'col text-center text-weight-bold ' + (props.dark ? 'text-white' : 'text-black')
    }, 'My App')
  ]
}
