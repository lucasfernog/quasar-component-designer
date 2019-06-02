import Vue from 'vue'
import groupBy from './groupBy.js'
import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import PropControl from './PropControl.js'

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
    },
    contentClass: String
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
          },
          staticClass: this.contentClass
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
      const groupedProps = groupBy(this.api.props[category], 'type')
      for (let type in groupedProps) {
        const props = groupedProps[type]

        const typeControls = []

        for (let prop in props) {
          const propDefinition = props[prop]
          let type = propDefinition.type
          if (Array.isArray(type)) {
            type = type[0]
          }

          if (prop !== 'value') {
            typeControls.push(
              h(PropControl, {
                props: {
                  value: this.value[prop],
                  prop,
                  propDefinition,
                  contentClass: type === 'Boolean' ? 'col-xs-3 col-md-2 q-pr-md' : 'col-xs-12 col-md-4 q-pr-md'
                },
                on: {
                  input: val => {
                    this.$emit('input', prop, val)
                  }
                }
              })
            )
          }
        }

        controls[category].push(
          h('div', {
            staticClass: 'row col-12'
          }, typeControls)
        )
      }
    }

    const tabs = this.__renderTabs(h)
    const tabPanels = this.__renderTabPanels(h, controls)

    return h('div', {
      staticClass: 'q-px-md'
    }, [tabs, tabPanels])
  }
})
