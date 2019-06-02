export default {
  Boolean: {
    component: require('./control/BooleanControl').default,
    defaultValue: def => (def.default || 'false').toLowerCase() === 'true'
  },
  String: {
    component: require('./control/StringControl').default,
    defaultValue: def => def.required ? (def.default || '') : null
  },
  Any: {
    component: require('./control/JsonControl').default,
    defaultValue: def => def.required ? (def.default || '') : null
  },
  Array: {
    component: require('./control/ArrayControl').default,
    defaultValue: def => def.required ? (def.default || []) : null
  },
  Number: {
    component: require('./control/NumberControl').default,
    defaultValue: def => def.required ? (def.default || 0) : null
  }
}
