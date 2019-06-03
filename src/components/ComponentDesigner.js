import Vue from 'vue'
const Quasar = require('quasar')
import defaultOptions from './options/default'
import ArgumentSelector from './ArgumentSelector.js'
import PropSelector from './PropSelector.js'
import ComponentList from './ComponentList.js'
import ComponentRenderer from './ComponentRenderer.js'
import types from './utils/types.js'
import groupBy from './utils/groupBy.js'
import getComponentDeclaration from './utils/getComponentDeclaration.js'

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
      attrs: {},
      propOptions: {},
      currentComponent: this.component,
      api: null,
      tab: null,
      options: null,
      splitter1: 15,
      splitter2: 50,
      loadedApi: false
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
                this.$refs.componentRenderer.$refs.component[m]()
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
              this.$refs.componentRenderer.$refs.component[m].apply(this, argArray)
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
      handler () {
        const model = {},
          attrs = {},
          propOptions = {},
          api = Quasar.extend(true, {}, require(`quasar/dist/api/${this.currentComponent}.json`))
        api.props = groupBy(api.props, 'category', 'general')

        for (let category in api.props) {
          for (let prop in api.props[category]) {
            const propDefinition = api.props[category][prop]
            propOptions[prop] = {}
            let defaultValue = null,
              type = propDefinition.type
            if (Array.isArray(type)) {
              type = type[0]
            }
            if (types[type] !== void 0) {
              defaultValue = types[type].defaultValue(propDefinition)
            }
            if (model[prop] === void 0) {
              this.$set(model, prop, defaultValue)
            }
          }
        }

        let options
        try {
          options = require(`./options/${this.currentComponent}.js`).default
        } catch {
          options = defaultOptions
        }
        this.options = options

        for (let prop in options.props) {
          const propDef = options.props[prop]
          propOptions[prop] = propDef
          if (propDef.defaultValue !== void 0) {
            if (prop in model) {
              model[prop] = propDef.defaultValue
            } else {
              attrs[prop] = propDef.defaultValue
            }
          }
        }

        this.propOptions = propOptions
        this.attrs = attrs
        this.model = model
        this.api = api
        this.loadedApi = true
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
              this.loadedApi = false
            }
          }
        })
      ]),
      !this.loadedApi ? void 0 : h(Quasar.QSplitter, {
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
          h(ComponentRenderer, {
            props: {
              component: this.currentComponent,
              componentProps: this.model,
              componentAttrs: this.attrs,
              renderChildren: this.options.renderChildren,
              getParentComponent: this.options.getParentComponent
            },
            on: {
              input: val => {
                this.model.value = val
              }
            },
            ref: 'componentRenderer',
            staticClass: this.model.dark ? 'bg-grey-10' : void 0
          }),
          h('div', {
            staticClass: 'q-mt-md'
          }, [methodsButtons]),
          h('div', {
            staticClass: 'bg-accent text-white q-mt-lg q-pa-md'
          }, getComponentDeclaration(this.currentComponent, this.model, this.api))
        ]),
        h('div', {
          slot: 'after'
        }, [
          h(PropSelector, {
            props: {
              api: this.api,
              value: this.model,
              options: this.propOptions,
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
