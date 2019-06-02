import Vue from 'vue'
const Quasar = require('quasar')
import defaultOptions from './options/default'
import ArgumentSelector from './ArgumentSelector.js'
import PropSelector from './PropSelector.js'
import ComponentList from './ComponentList.js'
import types from './types.js'
import groupBy from './groupBy.js'

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
      currentComponent: this.component,
      api: null,
      tab: null,
      options: null,
      splitter1: 15,
      splitter2: 50
    }
  },

  methods: {
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
    component (val) {
      this.currentComponent = val
    },
    currentComponent: {
      immediate: true,
      async handler () {
        this.model = {}
        this.api = (await import(`quasar/dist/api/${this.currentComponent}.json`)).default
        this.api.props = groupBy(this.api.props, 'category', 'general')

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
            }
            if (this.model[prop] === void 0) {
              this.$set(this.model, prop, defaultValue)
            }
          }
        }

        let options
        try {
          options = require(`./options/${this.currentComponent}.js`).default
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

    return h(Quasar.QSplitter, {
      props: {
        value: this.splitter1,
        limits: [10, 30]
      },
      on: {
        input: val => {
          this.splitter1 = val
        }
      },
      style: 'height: calc(100vh - 50px)'
    }, [
      h('div', {
        slot: 'before'
      }, [
        h(ComponentList, {
          props: {
            value: this.currentComponent
          },
          on: {
            input: val => {
              this.currentComponent = val
            }
          }
        })
      ]),
      h(Quasar.QSplitter, {
        props: {
          value: this.splitter2,
          limits: [30, 70]
        },
        on: {
          input: val => {
            this.splitter2 = val
          }
        },
        slot: 'after'
      }, [
        h('div', {
          slot: 'before',
          staticClass: 'q-pa-md'
        }, [
          h(Quasar[this.currentComponent], {
            ref: 'component',
            props: this.model,
            on: {
              input: (val) => {
                this.model.value = val
              }
            },
            staticClass: this.model.dark ? 'bg-grey-10' : void 0
          }),
          h('div', {
            staticClass: 'q-mt-md'
          }, [methodsButtons])
        ]),
        h('div', {
          slot: 'after'
        }, [
          h(PropSelector, {
            props: {
              api: this.api,
              value: this.model,
              contentClass: 'column'
            },
            on: {
              input: (prop, val) => {
                this.model[prop] = val
              }
            }
          })
        ])
      ])
    ])
  }
})
