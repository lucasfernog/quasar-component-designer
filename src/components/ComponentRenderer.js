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
    getParentComponent: Function,
    events: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      listeners: {}
    }
  },

  watch: {
    events: {
      immediate: true,
      handler () {
        this.events.created && this.events.created.bind(this)()
        for (let event in this.events) {
          if (event !== 'created') {
            this.listeners[event] = this.events[event].bind(this)
          }
        }
      }
    }
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
        ...this.listeners,
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
