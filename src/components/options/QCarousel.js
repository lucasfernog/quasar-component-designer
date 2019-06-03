import { QCarouselSlide } from 'quasar'

function getCarouselSlide (h, name, text) {
  return h(QCarouselSlide, {
    props: {
      name
    },
    staticClass: 'column no-wrap flex-center'
  }, [
    h('div', text)
  ])
}

export default {
  renderChildren (h, props) {
    return [
      getCarouselSlide(h, 'first', 'First slide'),
      getCarouselSlide(h, 'second', 'Second slide'),
      getCarouselSlide(h, 'third', 'Third slide')
    ]
  },
  props: {
    value: {
      defaultValue: 'first'
    },
    navigation: {
      defaultValue: true
    },
    arrows: {
      defaultValue: true
    },
    'control-color': {
      defaultValue: 'primary'
    }
  }
}
