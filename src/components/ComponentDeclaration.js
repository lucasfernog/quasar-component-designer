import Vue from 'vue'
import { QTabs, QTabPanels, QTab, QTabPanel, QBtn, QTooltip, QBadge } from 'quasar'
import getComponentDeclaration from './utils/getComponentDeclaration'

export default Vue.extend({
  props: {
    component: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      required: true
    },
    api: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      tab: 'html',
      copied: false
    }
  },

  methods: {
    __renderCopyButton (h, tab) {
      return h(QBtn, {
        props: {
          color: 'white',
          round: true,
          dense: true,
          flat: true,
          icon: 'content_copy'
        },
        staticClass: 'absolute',
        style: 'top: 8px; right: 8px',
        on: {
          click: () => this.__copyToClipboard(tab)
        }
      }, [
        h(QTooltip, 'Copy to clipboard')
      ])
    },

    __renderCopiedMessage (h) {
      return h('transition', {
        props: {
          'enter-active-class': 'animated fadeIn',
          'leave-active-class': 'animated fadeOut'
        }
      }, this.copied ? [
        h(QBadge, {
          class: 'absolute',
          style: 'top: 16px; right: 58px'
        }, 'Copied to clipboard')
      ] : void 0)
    },

    __copyToClipboard (tab) {
      const markup = this.$el.querySelector(`div#${tab}`)
      markup.setAttribute('contenteditable', 'true')
      markup.focus()
      document.execCommand('selectAll', false, null)
      document.execCommand('copy')
      markup.removeAttribute('contenteditable')
      if (window.getSelection) {
        const sel = window.getSelection()
        if (sel.removeAllRanges) {
          sel.removeAllRanges()
        } else if (sel.empty) {
          sel.empty()
        }
      } else if (document.selection) {
        document.selection.empty && document.selection.empty()
      }
      this.copied = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.copied = false
        this.timer = null
      }, 2000)
    }
  },

  render (h) {
    return h('div', [
      h(QTabs, {
        props: {
          value: this.tab,
          align: 'justify'
        },
        on: {
          input: val => {
            this.tab = val
          }
        }
      }, [
        h(QTab, {
          props: {
            name: 'html',
            label: 'HTML'
          }
        }),
        h(QTab, {
          props: {
            name: 'pug',
            label: 'Pug'
          }
        })
      ]),

      h(QTabPanels, {
        props: {
          value: this.tab,
          animated: true
        },
        on: {
          input: val => {
            this.tab = val
          }
        },
        style: 'background: inherit'
      }, [
        h(QTabPanel, {
          props: {
            name: 'html'
          }
        }, [
          h('div', {
            attrs: {
              id: 'html'
            }
          }, getComponentDeclaration(this.component, this.props, this.api, 'html')),
          this.__renderCopyButton(h, 'html'),
          this.__renderCopiedMessage(h)
        ]),
        h(QTabPanel, {
          props: {
            name: 'pug'
          }
        }, [
          h('div', {
            attrs: {
              id: 'pug'
            }
          }, getComponentDeclaration(this.component, this.props, this.api, 'pug')),
          this.__renderCopyButton(h, 'pug'),
          this.__renderCopiedMessage(h)
        ])
      ])
    ])
  }
})
