export default {
  props: {
    value: {
      defaultValue: ''
    },
    toolbar: {
      defaultValue: [
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen']
      ]
    }
  }
}
