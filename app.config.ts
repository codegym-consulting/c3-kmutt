export default defineAppConfig({
  ui: {
    icons: {
      dynamic: true,
    },
    container: {
      constrained: "max-w-[83rem]",
    },
    button: {
      base: "justify-center transition-all",
      rounded: "rounded-lg",
      size: {
        md: "min-w-[180px] h-[44px] text-base font-semibold",
      },
      color: {
        primary: {
          solid: "bg-[#1b1b1b] text-white hover:bg-white hover:text-[#1b1b1b]",
          outline:
            "text-[#1b1b1b] border-[#1b1b1b] hover:text-white hover:border-white border",
        },
      },
      variant: {
        icon: "rounded-2xl h-12 min-w-12 bg-[#1b1b1b] text-white hover:bg-white hover:text-[#1b1b1b]",
      },
      default: {
        size: "md",
        variant: "solid",
        color: "primary",
      },
    },
  },
});
