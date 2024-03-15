import { Button, styled } from 'tamagui';

export const StyledButton = styled(Button, {
  variants: {
    variant: {
      clear: {
        backgroundColor: '$colorTransparent',
        padding: 0
      }
    },
    colorStyle: {
      primary: {
        backgroundColor: '$primary'
      },
      danger: {
        backgroundColor: '$red6'
      }
    }
  }
});