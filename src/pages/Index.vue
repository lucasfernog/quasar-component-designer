<template>
  <q-page>
    <component-designer component="QSelect" :icon-set="iconSet"/>
  </q-page>
</template>

<style>
</style>

<script>
import ComponentDesigner from '../components/ComponentDesigner'
export default {
  name: 'PageIndex',

  components: {
    ComponentDesigner
  },

  data () {
    return {
      iconSet: ''
    }
  },

  created () {
    this.$root.$on('iconSetChange', (val) => {
      this.iconSet = val
    })
  }
}
</script>
