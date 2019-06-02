export default function groupBy (list, groupKey, defaultGroupKeyValue) {
  const res = {}
  for (let key in list) {
    if (list.hasOwnProperty(key)) {
      let value = list[key]
      let groupKeyValue = ((Array.isArray(value[groupKey]) ? 'Multiple' : value[groupKey]) || defaultGroupKeyValue).split('|')
      for (let groupKeyV of groupKeyValue) {
        if (res[groupKeyV] === void 0) {
          res[groupKeyV] = {}
        }
        res[groupKeyV][key] = value
      }
    }
  }
  return res
}
