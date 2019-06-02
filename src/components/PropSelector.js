import Vue from 'vue'
import types from './types.js'
import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'

export default Vue.extend({
  name: 'PropSelector',

  props: {
    api: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      tab: null,
      options: null
    }
  },

  methods: {
    __renderTabs (h) {
      return h(QTabs, {
        props: {
          value: this.tab
        },
        on: {
          input: (val) => {
            this.tab = val
          }
        }
      }, Object.keys(this.api.props).map(
        c => h(QTab, {
          props: {
            name: c,
            label: c
          }
        })
      ))
    },

    __renderTabPanels (h, controls) {
      return h(QTabPanels, {
        props: {
          value: this.tab
        },
        on: {
          input: (val) => {
            this.tab = val
          }
        }
      }, Object.keys(controls).map(
        c => h(QTabPanel, {
          props: {
            name: c
          }
        }, controls[c])
      ))
    }
  },

  watch: {
    api: {
      immediate: true,
      async handler () {
        this.tab = Object.keys(this.api.props)[0]
      }
    }
  },

  render (h) {
    if (!this.api) {
      return
    }

    const controls = {}
    for (let category in this.api.props) {
      controls[category] = []
      for (let prop in this.api.props[category]) {
        const propDefinition = this.api.props[category][prop]
        let type = propDefinition.type
        if (Array.isArray(type)) {
          type = type[0]
        }

        if (types[type]) {
          if (prop !== 'value') {
            controls[category].push(
              h(types[type].component, {
                props: {
                  value: this.value[prop],
                  prop,
                  propDefinition
                },
                on: {
                  input: val => {
                    this.$emit('input', prop, val)
                  }
                },
                staticClass: type === 'Boolean' ? 'col-xs-3 col-md-2' : 'col-xs-12 col-md-4'
              })
            )
          }
        }
      }
    }

    const tabs = this.__renderTabs(h)
    const tabPanels = this.__renderTabPanels(h, controls)

    return h('div', {
      staticClass: 'q-px-md'
    }, [tabs, tabPanels])
  }
})
