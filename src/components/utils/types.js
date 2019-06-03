export default {
  Boolean: {
    component: require('../control/BooleanControl').default,
    defaultValue: def => {
      const val = def.default
      if (val === true) {
        return true
      }
      if (val === false) {
        return false
      }
      return (def.default || 'false').toLowerCase() === 'true'
    }
  },
  String: {
    component: require('../control/StringControl').default,
    defaultValue: def => def.required ? (def.default || '') : void 0
  },
  Any: {
    component: require('../control/JsonControl').default,
    defaultValue: def => def.required ? (def.default || '') : void 0
  },
  Array: {
    component: require('../control/ArrayControl').default,
    defaultValue: def => def.required ? (def.default || []) : void 0
  },
  Number: {
    component: require('../control/NumberControl').default,
    defaultValue: def => def.required ? (def.default || 0) : void 0
  }
}
