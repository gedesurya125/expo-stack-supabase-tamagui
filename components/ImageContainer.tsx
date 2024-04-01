import React from 'react';
import { Image } from 'tamagui';
import { imagePlaceholder } from '~/images/placeholder';

interface ImageContainerProps extends React.ComponentProps<typeof Image> {
  imageUri?: string;
  imageSize?: {
    width: number;
    height: number;
  };
}

export const ImageContainer = ({ imageUri, imageSize, ...props }: ImageContainerProps) => {
  return (
    <Image
      width="100%"
      source={{
        uri: imageUri || imagePlaceholder,
        width: imageSize?.width || 300,
        height: imageSize?.height || 200
      }}
      {...props}
    />
  );
};
