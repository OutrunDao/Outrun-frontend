import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: '#0d0703',
    color: "#fff",
    borderRadius: "6px",
    border: "solid 0.5px #383433"
  },
  header: {
    paddingBottom: '2px',
    margin: 0
  },
  body: {
    paddingTop: '0',
    paddingBottom: '2px',

  },
  footer: {
    margin: 0,
    paddingTop: '2px',
  },
})

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: '0px',
    },
  }),
}

export const CardComponent = {
  components: {
    Card: defineMultiStyleConfig({ baseStyle, sizes }),
  },
}
