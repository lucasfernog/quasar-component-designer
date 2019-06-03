import { QCarouselSlide } from 'quasar'

function getCarouselSlide (h, name, imgSrc) {
  return h(QCarouselSlide, {
    props: {
      name,
      'img-src': imgSrc
    }
  })
}

export default {
  renderChildren (h, props) {
    return [
      getCarouselSlide(h, 'first', 'https://cdn.quasar.dev/img/mountains.jpg'),
      getCarouselSlide(h, 'second', 'https://cdn.quasar.dev/img/parallax1.jpg'),
      getCarouselSlide(h, 'third', 'https://cdn.quasar.dev/img/parallax2.jpg')
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
      defaultValue: 'white'
    }
  }
}
