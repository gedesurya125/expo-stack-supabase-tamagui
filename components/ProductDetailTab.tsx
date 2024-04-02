import React from 'react';
import {
  H5,
  SizableText,
  TabsContentProps,
  Separator,
  Tabs,
  Text,
  View,
  XStack,
  Button,
  YStack,
  Card
} from 'tamagui';
import { StyledButton } from './StyledButton';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface TabContextValue {
  currentTabName: string;
  setCurrentTabName: (tabName: string) => void;
}

const TabContext = React.createContext<TabContextValue>({
  currentTabName: '',
  setCurrentTabName: () => {}
});

const TabContextProvider = ({
  children,
  initialTabName
}: {
  children: React.ReactNode;
  initialTabName: string;
}) => {
  const [currentTabName, setCurrentTabName] = React.useState(initialTabName);

  return (
    <TabContext.Provider
      value={{
        currentTabName,
        setCurrentTabName
      }}>
      {children}
    </TabContext.Provider>
  );
};

const useTabContext = () => React.useContext(TabContext);

interface ProductDetailTabProps {
  productDescription?: string;
  usageDescription?: string;
  dataSheets?: {
    label: string;
    fileLink: string;
  }[];
}

export const ProductDetailTab = ({
  productDescription,
  usageDescription,
  dataSheets
}: ProductDetailTabProps) => {
  return (
    <TabContextProvider initialTabName="tab1">
      <View mt="$10">
        <XStack>
          <TabButton name="tab1">Product Description</TabButton>
          <TabButton name="tab2">Usage Description</TabButton>
          <TabButton name="tab3">PDF Data sheet</TabButton>
        </XStack>
        <Card borderColor="white" borderWidth="$0.25" padded>
          <TabContent name="tab1">
            <Text>Tab1</Text>
          </TabContent>
          <TabContent name="tab2">
            <Text>Tab2</Text>
          </TabContent>
          <TabContent name="tab3">
            <ExternalLink url="https://cdn.shopify.com/s/files/1/0762/3085/2895/files/12.08.2022_AF.pdf?v=1712027672">
              Download File
            </ExternalLink>
          </TabContent>
        </Card>
      </View>
    </TabContextProvider>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  name: string;
}

const TabButton = ({ children, name }: TabButtonProps) => {
  const { setCurrentTabName } = useTabContext();

  return (
    <StyledButton
      colorStyle="clear"
      onPress={() => {
        setCurrentTabName(name);
      }}>
      {children}
    </StyledButton>
  );
};

interface TabContentProps {
  children: React.ReactNode;
  name: string;
}

const TabContent = ({ children, name }: TabContentProps) => {
  const { currentTabName } = useTabContext();
  if (currentTabName !== name) return null;

  return <View>{children}</View>;
};

const ExternalLink = (props: any) => {
  const { url, children, style = {} } = props;

  const onPress = () =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
