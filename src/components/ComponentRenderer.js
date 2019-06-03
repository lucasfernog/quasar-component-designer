import Vue from 'vue'
const Quasar = require('quasar')

export default Vue.extend({
  props: {
    component: {
      type: String,
      required: true
    },
    componentProps: {
      type: Object,
      required: true
    },
    componentAttrs: {
      type: Object,
      required: true
    },
    renderChildren: Function,
    getParentComponent: Function
  },

  render (h) {
    const parent = this.getParentComponent ? this.getParentComponent(this.componentProps) : void 0
    let children = this.renderChildren ? this.renderChildren(h, this.componentProps) : void 0
    if (!Array.isArray(children)) {
      children = [children]
    }

    const component = h(Quasar[this.component], {
      ref: 'component',
      props: this.componentProps,
      staticClass: this.componentAttrs.class,
      on: {
        input: (val) => {
          this.$emit('input', val)
        }
      }
    }, children)

    if (parent) {
      return h(parent, [component])
    }
    return component
  }
})
