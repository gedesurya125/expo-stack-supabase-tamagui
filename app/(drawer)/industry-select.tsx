import { Link } from 'expo-router';
import { Button, H2, YStack } from 'tamagui';
import { useProjects } from '~/api/xentral/useProjects';
import { StyledButton } from '~/components/StyledButton';

export default function IndustrySelect() {
  const { data: xentralProjectData } = useProjects();

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
        {xentralProjectData?.data?.map((projectData, index) => {
          return (
            <Link
              asChild
              href={{
                pathname: '/(drawer)/catalogue',
                params: {
                  projectId: projectData.id,
                  projectName: projectData.name
                }
              }}
              key={index}>
              <StyledButton colorStyle="secondary">{projectData.name}</StyledButton>
            </Link>
          );
        })}
      </YStack>
    </YStack>
  );
}
