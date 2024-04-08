import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
export const tableStyles = {
  components: {
    Table: {
      baseStyle: {
        th: {
          color: "#fff"
        },
        td: {
          color: '#fff',
        },
      },
      variants: {
        simple: {
          th: {
            color: "#8b8b8b"
          }
        }
      }
    }
  },
};
