export default {
  props: {
    options: {
      defaultValue: [{
        label: 'Label1',
        value: 1
      }, {
        label: 'Label2',
        value: 2
      }]
    },
    value: {
      defaultValue: {
        label: 'Label1',
        value: 1
      }
    },
    label: {
      defaultValue: 'Test Select'
    },
    'use-chips': {
      defaultValue: true
    }
  }
}
