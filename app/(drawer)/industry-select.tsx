import { Link } from 'expo-router';
import { H2, Spinner, YStack } from 'tamagui';
import { useArticleCategory } from '~/api/weClapp/articleCategory';
import { StyledButton } from '~/components/StyledButton';

export default function IndustrySelect() {
  const { data, isLoading } = useArticleCategory();

  console.log('this is the article category', data);

  return (
    <YStack backgroundColor="$background" flex={1} justifyContent="center" alignItems="center">
      <H2>Helo in industry select</H2>
      <YStack
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="90%"
        gap="$5"
        mt="$6">
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          data?.result?.map((category, index) => {
            return (
              <Link
                asChild
                href={{
                  pathname: '/(drawer)/catalogue',
                  params: {
                    categoryId: category.id,
                    categoryName: category.name
                  }
                }}
                key={index}>
                <StyledButton colorStyle="secondary">{category.name}</StyledButton>
              </Link>
            );
          })
        )}
      </YStack>
    </YStack>
  );
}
