import { Button, styled } from 'tamagui';

export const StyledButton = styled(Button, {
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary'
      },
      clear: {
        backgroundColor: '$colorTransparent',
        padding: 0
      }
    }
  }
});
