export default {
  props: {
    options: {
      defaultValue: [{
        label: 'Label1',
        value: 'Value1'
      }, {
        label: 'Label2',
        value: 'Value2'
      }]
    },
    label: {
      defaultValue: 'Test Select'
    },
    'use-chips': {
      defaultValue: true
    }
  }
}
