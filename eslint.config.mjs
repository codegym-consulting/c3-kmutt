// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/html-indent': 'off',
      'vue/no-v-html': 'off',
      'vue/first-attribute-linebreak': 'off',
      '@typescript-eslint/ban-ts-comment': 'off'
    },
  },
  // Your custom configs here
)
