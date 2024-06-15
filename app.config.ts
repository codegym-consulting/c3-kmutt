export default defineAppConfig({
  ui: {
    primary: 'blue',
    secondary: 'gray-10',
    icons: {
      dynamic: true,
    },
    container: {
      constrained: 'max-w-screen-container',
    },
    formGroup: {
      label: {
        wrapper: 'mb-4',
        base: 'text-base text-gray-10',
        required: "after:content-['*'] after:ms-0.5 after:text-giants-orange",
      },
    },
    modal: {
      background: 'bg-gray-1',
      padding: '!p-4',
      container: 'flex min-h-full items-center justify-center text-center',
      base: 'py-14 px-4 md:px-12',
      rounded: 'rounded-[40px]',
      width: '!max-w-[872px]',
    },
    checkbox: {
      border: 'border border-gray-7',
      rounded: 'rounded-none',
      color: 'text-chrysler-blue',
      label: 'text-base text-gray-10 font-bai-jamjuree',
    },
    button: {
      base: 'justify-center transition-all',
      rounded: 'rounded-lg',
      size: {
        md: 'min-w-[180px] h-[44px] text-base font-medium',
      },
      color: {
        primary: {
          solid:
            'bg-gray-10 text-white hover:bg-white hover:text-gray-10 disabled:!bg-gray-4 disabled:!text-gray-3',
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
        link: 'min-w-fit w-fit h-fit text-gray-10 text-base leading-5 font-bold !border-0 !ring-0 !outline-none hover:text-gray-10 [&_svg]:-translate-y-[1px] disabled:text-gray-4 disabled:no-underline',
        'inline-link':
          'min-w-fit w-fit h-fit text-chrysler-blue text-base underline font-normal p-0 leading-5 !border-0 !ring-0 !outline-none hover:text-gray-10 disabled:no-underline',
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
