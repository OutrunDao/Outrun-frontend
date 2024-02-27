import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    brand: {
      500: "#d3027d",
    },
  },
  components: {
    Button: {
      defaultProps: {
        color: "#54c0e6",
        borderColor: "#54c0e6",
        backgroundColor: "transparent",
      },
    },
  },
});
