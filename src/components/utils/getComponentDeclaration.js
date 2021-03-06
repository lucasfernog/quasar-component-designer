import types from './types.js'

function getPropDefinition (api, prop) {
  for (let category in api.props) {
    const props = api.props[category]
    for (let p in props) {
      if (p === prop) {
        return props[p]
      }
    }
  }
}

function html (componentName, props, api) {
  let declaration = `<${componentName}`
  for (let prop in props) {
    let val = props[prop]
    const definition = getPropDefinition(api, prop)
    let type = definition.type
    if (Array.isArray(type)) {
      type = type[0]
    }
    if (type === 'Function' || (types[type] !== void 0 && types[type].defaultValue(definition) === val) || definition.default === val) {
      continue
    }
    if (val !== null && val !== void 0 && val !== '') {
      if (val === true) {
        declaration += ` ${prop}`
      } else if (val === false) {
        declaration += ` :${prop}="false"`
      } else if (typeof val === 'string') {
        declaration += ` ${prop}="${val}"`
      } else {
        declaration += ` :${prop}="${JSON.stringify(val, null, '')}"`
      }
    }
  }
  return `${declaration} />`
}

function pug (componentName, props, api) {
  let declaration = `${componentName}`
  let propsDeclaration = ''
  for (let prop in props) {
    let val = props[prop]
    const definition = getPropDefinition(api, prop)
    let type = definition.type
    if (Array.isArray(type)) {
      type = type[0]
    }
    if (type === 'Function' || (types[type] !== void 0 && types[type].defaultValue(definition) === val) || definition.default === val) {
      continue
    }
    if (val !== null && val !== void 0 && val !== '') {
      if (val === true) {
        propsDeclaration += ` ${prop}`
      } else if (val === false) {
        propsDeclaration += ` :${prop}="false"`
      } else if (typeof val === 'string') {
        propsDeclaration += ` ${prop}="${val}"`
      } else {
        propsDeclaration += ` :${prop}="${JSON.stringify(val, null, '')}"`
      }
    }
  }
  return `${declaration}${propsDeclaration ? ` (${propsDeclaration.trim()})` : ''}`
}

// TODO read listeners
export default (componentName, props, api, language) => {
  if (language === 'html') {
    return html(componentName, props, api)
  } else if (language === 'pug') {
    return pug(componentName, props, api)
  }
  return ''
}
