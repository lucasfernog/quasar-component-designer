import Vue from 'vue'
import { QBadge, QPopupEdit, QSelect } from 'quasar'
import types from './types.js'

export default Vue.extend({
  name: 'PropControl',

  props: {
    propDefinition: {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    value: {
      validator () {
        return true
      }
    },
    contentClass: String
  },

  data () {
    const type = this.propDefinition.type
    return {
      currentType: Array.isArray(type) ? type[0] : type
    }
  },

  methods: {
    __renderTypeChooser (h) {
      return h(QBadge, [
        this.currentType,
        h(QPopupEdit, {
          props: {
            value: this.currentType,
            title: 'Choose type',
            buttons: true
          },
          ref: 'popupEdit',
          on: {
            input: val => {
              this.currentType = val
            }
          }
        }, [
          h(QSelect, {
            props: {
              value: this.currentType,
              'emit-value': true,
              options: this.propDefinition.type.map(t => {
                return {
                  label: t,
                  value: t
                }
              }),
              dense: true,
              'options-dense': true
            },
            on: {
              input: val => {
                this.currentType = val
                this.$refs.popupEdit.set()
              }
            }
          })
        ])
      ])
    }
  },

  render (h) {
    const children = Array.isArray(this.propDefinition.type)
      ? [this.__renderTypeChooser(h)] : []
    if (types[this.currentType] === void 0) {
      return h('div', [`Type ${this.currentType} not found`])
    }

    return h('div', [h(types[this.currentType].component, {
      props: {
        value: this.value,
        prop: this.prop,
        propDefinition: this.propDefinition
      },
      on: {
        input: val => {
          this.$emit('input', val)
        }
      },
      staticClass: this.contentClass
    })].concat(children))
  }
})
