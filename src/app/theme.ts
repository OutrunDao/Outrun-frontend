import { extendTheme, type ColorMode } from '@chakra-ui/react';

interface IBase {
  colorMode: ColorMode;
}

const primaryColor = 'rgb(252 252 3)';
const lightBg = 'rgba(252, 252, 3, 0.1)';

const components = {
  Button: {
    baseStyle: ({ colorMode }: IBase) => ({
      bg: colorMode === 'dark' ? lightBg : lightBg,
      color: colorMode === 'dark' ? '#000' : primaryColor,
      fontSize: '14px',
    }),
    variants: {
      custom: ({ colorMode }: IBase) => ({
        bg: colorMode === 'dark' ? primaryColor : lightBg,
        fontSize: '14px',
      }),
      outline: ({ colorMode }: IBase) => ({
        color: '#000',
        bg: '#fff',
        borderColor: primaryColor,
      }),
    },
  },
  Text: {
    baseStyle: {
      color: primaryColor,
    },
  },
};

export const customTheme = extendTheme({ components });
