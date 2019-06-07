<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div class="q-select__iconSet">
          <q-select class="q-select__iconSet" :options="['material-icons', 'mdi-v3', 'ionicons-v4', 'eva-icons', 'fontawesome-v5', 'themify']" :value="iconSet" @input="onChangeIconSet" />
        </div>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  methods: {
    openURL,
    onChangeIconSet (val) {
      this.iconSet = val
      this.$root.$emit('iconSetChange', val)
      this.$q.iconSet = require(`quasar/icon-set/${val}.js`).default
    }
  },
  mounted () {
    this.$root.$emit('iconSetChange', this.iconSet)
  },
  data () {
    return {
      iconSet: 'material-icons'
    }
  }
}
</script>

<style lang="stylus">
.q-select__iconSet
  & .q-field__native, .q-field__append
    color white!important
</style>
