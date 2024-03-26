import React from 'react';
import type { CardProps } from 'tamagui';
import { Button, Card, H2, Image, Paragraph, View, XStack } from 'tamagui';
import { imagePlaceholder } from '~/images/placeholder';

interface ProductCardProps extends CardProps {
  productData: any;
}

export function ProductCard({ productData, ...props }: ProductCardProps) {
  return (
    <Card elevate height={300} bordered {...props}>
      <Card.Header padded bg="rgba(0,0,0, 0.7)">
        <H2>{productData?.title}</H2>
        <Paragraph theme="alt2">
          {productData?.availableForSale ? 'Available' : 'Not available'}
        </Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10" backgroundColor="$primary">
          Purchase
        </Button>
      </Card.Footer>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: productData?.featuredImage?.url || imagePlaceholder
          }}
        />
      </Card.Background>
    </Card>
  );
}
