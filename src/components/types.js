export default {
  Boolean: {
    render: require('./control/boolean').default,
    defaultValue: def => (def.default || 'false').toLowerCase() === 'true'
  },
  String: {
    render: require('./control/string').default,
    defaultValue: def => def.required ? (def.default || '') : null
  },
  Any: {
    render: require('./control/json').default,
    defaultValue: def => def.required ? (def.default || '') : null
  }
}
