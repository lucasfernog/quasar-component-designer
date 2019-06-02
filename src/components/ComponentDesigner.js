import Vue from 'vue'
const Quasar = require('quasar')
import defaultOptions from './options/default'
import ArgumentSelector from './ArgumentSelector.js'
import PropSelector from './PropSelector.js'
import types from './types.js'

export default Vue.extend({
  name: 'ComponentDesigner',

  props: {
    component: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      model: {},
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
        }, this.api.methods[m].params === void 0 ? null : [h(ArgumentSelector, {
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

        for (let category in this.api.props) {
          for (let prop in this.api.props[category]) {
            const propDefinition = this.api.props[category][prop]
            let defaultValue = null,
              type = propDefinition.type
            if (Array.isArray(type)) {
              type = type[0]
            }
            if (types[type] !== void 0) {
              defaultValue = types[type].defaultValue(propDefinition)
              if (this.model[prop] === void 0) {
                this.$set(this.model, prop, defaultValue)
              }
            }
          }
        }

        let options
        try {
          options = require(`./options/${this.component}.js`).default
        } catch {
          options = defaultOptions
        }

        for (let prop in options.props) {
          const propDef = options.props[prop]
          if (propDef.defaultValue !== void 0) {
            this.model[prop] = propDef.defaultValue
          }
        }
      }
    }
  },

  render (h) {
    if (!this.api) {
      return
    }

    const methodsButtons = this.__renderMethodsButtons(h)

    return h('div', {
      staticClass: 'q-px-md'
    }, [
      h(Quasar[this.component], {
        ref: 'component',
        props: this.model,
        on: {
          input: (val) => {
            this.model.value = val
          }
        }
      }),
      methodsButtons,
      h(PropSelector, {
        props: {
          api: this.api,
          value: this.model
        },
        on: {
          input: (prop, val) => {
            this.model[prop] = val
          }
        }
      })
    ])
  }
})
