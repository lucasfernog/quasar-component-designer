import Vue from 'vue'
const Quasar = require('quasar')
import defaultOptions from './options/default'
import ArgumentPicker from './ArgumentPicker.js'
import types from './types.js'

export default Vue.extend({
  // name: 'ComponentName',

  props: {
    component: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      propValues: {},
      api: null,
      tab: null,
      options: null
    }
  },

  methods: {
    __groupBy (list, groupKey, defaultGroupKeyValue) {
      const res = {}
      for (let key in list) {
        if (list.hasOwnProperty(key)) {
          let value = list[key]
          let groupKeyValue = (value[groupKey] || defaultGroupKeyValue).split('|')
          for (let groupKeyV of groupKeyValue) {
            if (res[groupKeyV] === void 0) {
              res[groupKeyV] = {}
            }
            res[groupKeyV][key] = value
          }
        }
      }
      return res
    },

    __renderTabs (h) {
      return h(Quasar.QTabs, {
        props: {
          value: this.tab
        },
        on: {
          input: (val) => {
            this.tab = val
          }
        }
      }, Object.keys(this.api.props).map(
        c => h(Quasar.QTab, {
          props: {
            name: c,
            label: c
          }
        })
      ))
    },

    __renderTabPanels (h, controls) {
      return h(Quasar.QTabPanels, {
        props: {
          value: this.tab
        },
        on: {
          input: (val) => {
            this.tab = val
          }
        }
      }, Object.keys(controls).map(
        c => h(Quasar.QTabPanel, {
          props: {
            name: c
          }
        }, controls[c])
      ))
    },

    __renderMethodsButtons (h) {
      return this.api.methods ? Object.keys(this.api.methods).map(
        m => h(Quasar.QBtn, {
          props: {
            label: m,
            color: 'primary'
          },
          staticClass: 'q-mx-xs',
          on: {
            click: () => {
              if (this.api.methods[m].params === void 0) {
                this.$refs.component[m]()
              }
            }
          }
        }, this.api.methods[m].params === void 0 ? null : [h(ArgumentPicker, {
          props: {
            arguments: this.api.methods[m].params
          },
          on: {
            pick: (args) => {
              const argArray = []
              for (const arg in args) {
                argArray.push(args[arg])
              }
              console.log(argArray)
              this.$refs.component[m].apply(this, argArray)
            }
          }
        })])
      ) : null
    }
  },

  watch: {
    component: {
      immediate: true,
      async handler () {
        this.api = (await import(`quasar/dist/api/${this.component}.json`)).default
        this.api.props = this.__groupBy(this.api.props, 'category', 'general')
        this.tab = Object.keys(this.api.props)[0]
        try {
          this.options = require(`./options/${this.component}.js`).default
        } catch {
          this.options = defaultOptions
        }

        for (let prop in this.options.props) {
          const propDef = this.options.props[prop]
          if (propDef.defaultValue !== void 0) {
            this.$set(this.propValues, prop, propDef.defaultValue)
          }
        }
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
        let defaultValue = null,
          type = propDefinition.type
        if (Array.isArray(type)) {
          type = type[0]
        }

        if (types[type]) {
          if (prop !== 'value') {
            controls[category].push(
              types[type].render(h, this.propValues, prop, propDefinition)
            )
          }
          defaultValue = types[type].defaultValue(propDefinition)
        }

        if (this.propValues[prop] === void 0) {
          this.$set(this.propValues, prop, defaultValue)
        }
      }
    }

    const tabs = this.__renderTabs(h)
    const tabPanels = this.__renderTabPanels(h, controls)
    const methodsButtons = this.__renderMethodsButtons(h)

    return h('div', {
      staticClass: 'q-px-md'
    }, [
      h(Quasar[this.component], {
        ref: 'component',
        props: this.propValues,
        on: {
          input: (val) => {
            this.propValues.value = val
          }
        }
      }),
      methodsButtons,
      tabs,
      tabPanels
    ])
  }
})
