import Vue from 'vue'
const Quasar = require('quasar')
import defaultOptions from './options/default'
import ArgumentSelector from './ArgumentSelector.js'
import PropSelector from './PropSelector.js'
import ComponentList from './ComponentList.js'
import ComponentRenderer from './ComponentRenderer.js'
import types from './utils/types.js'
import groupBy from './utils/groupBy.js'
import ComponentDeclaration from './ComponentDeclaration'

const transitions = require('./props/transitions').default

export default Vue.extend({
  name: 'ComponentDesigner',

  props: {
    component: {
      type: String,
      required: true
    },
    iconSet: {
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
      api: {},
      tab: null,
      options: {},
      splitter1: 15,
      splitter2: 50,
      loadedApi: false
    }
  },

  computed: {
    currentApi () {
      return this.api[this.currentComponent]
    },
    currentModel () {
      return this.model[this.currentComponent]
    },
    currentAttrs () {
      return this.attrs[this.currentComponent]
    },
    currentPropOptions () {
      return this.propOptions[this.currentComponent]
    },
    currentOptions () {
      return this.options[this.currentComponent]
    }
  },

  methods: {
    __renderMethodsButtons (h) {
      return this.currentApi.methods ? Object.keys(this.currentApi.methods).map(
        m => {
          const skipParams = this.currentApi.methods[m].params === void 0 ||
            Object.keys(this.currentApi.methods[m].params).some(p => ['Object', 'Function'].includes(this.currentApi.methods[m].params[p].type))
          return h(Quasar.QBtn, {
            props: {
              label: m,
              color: 'primary'
            },
            on: {
              click: () => {
                if (skipParams) {
                  this.$refs.componentRenderer.$refs.component[m]()
                }
              }
            }
          }, skipParams
            ? null
            : [
              h(ArgumentSelector, {
                props: {
                  arguments: this.currentApi.methods[m].params
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
              })
            ])
        }
      ) : null
    }
  },

  watch: {
    iconSet () {
      for (const component in this.model) {
        const model = this.model[component]
        for (const prop in model) {
          if (prop.includes('icon')) {
            model[prop] = void 0
          }
        }
      }
    },
    component (val) {
      this.currentComponent = val
    },
    currentComponent: {
      immediate: true,
      handler () {
        if (this.api[this.currentComponent] === void 0) {
          const model = {},
            attrs = {},
            propOptions = {},
            api = Quasar.extend(true, {}, require(`quasar/dist/api/${this.currentComponent}.json`))
          api.props = groupBy(api.props, 'category', 'general')

          this.$set(this.model, this.currentComponent, model)
          this.attrs[this.currentComponent] = attrs
          this.propOptions[this.currentComponent] = propOptions
          this.api[this.currentComponent] = api

          for (let category in api.props) {
            for (let prop in api.props[category]) {
              const propDefinition = api.props[category][prop]

              if (prop.includes('transition')) {
                propDefinition.values = transitions
              }

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

          this.options[this.currentComponent] = options
        }
        this.loadedApi = true
      }
    }
  },

  render (h) {
    if (!this.currentApi) {
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
              componentProps: this.currentModel,
              componentAttrs: this.currentAttrs,
              renderChildren: this.currentOptions.renderChildren,
              getParentComponent: this.currentOptions.getParentComponent,
              events: this.currentOptions.events || {}
            },
            on: {
              input: val => {
                this.currentModel.value = val
              }
            },
            ref: 'componentRenderer',
            staticClass: this.currentModel.dark ? 'bg-grey-10' : void 0
          }),
          h('div', {
            staticClass: 'q-mt-md q-gutter-sm'
          }, [methodsButtons]),
          h(ComponentDeclaration, {
            props: {
              component: this.currentComponent,
              props: this.currentModel,
              api: this.currentApi
            },
            staticClass: 'bg-accent text-white q-mt-lg q-pa-md'
          })
        ]),
        h('div', {
          slot: 'after',
          staticClass: 'fit'
        }, [
          h(PropSelector, {
            props: {
              api: this.currentApi,
              value: this.currentModel,
              options: this.currentPropOptions,
              iconSet: this.iconSet,
              contentClass: 'column'
            },
            on: {
              input: (prop, val) => {
                this.currentModel[prop] = val
              }
            }
          })
        ])
      ])
    ])
  }
})
