import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: 'rgb(46 46 50)',
    color: "#fff",
    borderRadius: "4px"
  },
  header: {
    paddingBottom: '2px',
    margin: 0
  },
  body: {
    paddingTop: '6px',
    paddingBottom: '8px',

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
