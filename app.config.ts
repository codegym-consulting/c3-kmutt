export default defineAppConfig({
  ui: {
    primary: 'chrysler-blue',
    secondary: 'gray-10',
    icons: {
      dynamic: true,
    },
    container: {
      constrained: 'max-w-screen-container',
    },
    button: {
      base: 'justify-center transition-all',
      rounded: 'rounded-lg',
      size: {
        md: 'min-w-[180px] h-[44px] text-base font-medium',
      },
      color: {
        primary: {
          solid: 'bg-gray-10 text-white hover:bg-white hover:text-gray-10',
          outline:
            'text-gray-10 border-gray-10 hover:text-white hover:border-white border',
        },
        white: {
          solid: 'bg-white text-gray-10 hover:bg-gray-10 hover:text-white',
          outline:
            'text-white border-white hover:text-gray-10 hover:border-gray-10 border',
        },
      },
      variant: {
        icon: 'rounded-2xl h-12 min-w-12 bg-gray-10 text-white hover:bg-white hover:text-gray-10',
      },
      default: {
        size: 'md',
        variant: 'solid',
        color: 'primary',
      },
    },
  },
  nuxtIcon: {},
})
