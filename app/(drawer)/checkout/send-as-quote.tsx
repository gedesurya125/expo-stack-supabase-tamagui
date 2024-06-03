import { Card, Heading, ScrollView, Separator, Text, View, YStack } from 'tamagui';
import { LabelledDateTimePicker } from '~/components/DateTimePicker';
import { StyledButton } from '~/components/StyledButton';
import { LabelledTextInput } from '~/components/TextInput';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';

export default function SendAsQuote() {
  return (
    <YStack flex={1} flexDirection="row" backgroundColor="$background" alignItems="stretch">
      <CheckoutInfo />
    </YStack>
  );
}
const CheckoutInfo = () => {
  return (
    <YStack width="50%" backgroundColor="$gray3">
      <ScrollView>
        <YStack padding="$3" gap="$4">
          <ShipmentPreferenceCard />
          <DeliveryAddress />
          <BillingDetails />
          <InvoiceDetails />
          <Separator marginTop="auto" borderColor="$background" />
          <ProcessButton />
        </YStack>
      </ScrollView>
    </YStack>
  );
};

const ShipmentPreferenceCard = () => {
  const datePlaceholder = new Date();

  return (
    <InformationCard
      title="Shipment Preference"
      contentProps={{
        gap: '$4'
      }}>
      <LabelledDateTimePicker
        label="Date"
        dateTimePickerProps={{
          value: datePlaceholder.toISOString(),
          handleChange: () => {},
          onBlur: () => {}
        }}
      />
      <LabelledDateTimePicker
        label="Time"
        dateTimePickerProps={{
          value: datePlaceholder.toISOString(),
          handleChange: () => {},
          onBlur: () => {},
          mode: 'time'
        }}
      />
    </InformationCard>
  );
};
const DeliveryAddress = () => {
  const { customerInfo } = useSelectedCustomerContext();

  return (
    <InformationCard title="Delivery Address">
      <LabelledTextInput
        label="Address"
        textInputProps={{
          value: customerInfo?.addressLine1
        }}
      />
      <LabelledTextInput
        label="City"
        marginTop="$4"
        textInputProps={{
          value: customerInfo?.city
        }}
      />
      <LabelledTextInput
        label="Zip Code"
        marginTop="$4"
        textInputProps={{
          value: customerInfo?.postalCode
        }}
      />
    </InformationCard>
  );
};
const BillingDetails = () => {
  const { customerInfo } = useSelectedCustomerContext();

  return (
    <InformationCard title="Billing Details">
      <LabelledTextInput
        label="Name"
        textInputProps={{
          value: customerInfo?.displayName
        }}
      />
      <LabelledTextInput
        label="Email"
        marginTop="$4"
        textInputProps={{
          value: customerInfo?.email
        }}
      />
      <LabelledTextInput
        label="Address"
        textInputProps={{
          value: customerInfo?.addressLine1
        }}
      />
      <LabelledTextInput
        label="City"
        marginTop="$4"
        textInputProps={{
          value: customerInfo?.city
        }}
      />
      <LabelledTextInput
        label="Zip Code"
        marginTop="$4"
        textInputProps={{
          value: customerInfo?.postalCode
        }}
      />
      <LabelledTextInput label="Payment terms" marginTop="$4" />
    </InformationCard>
  );
};
//? Invoice detail probably not exist in quote creation, it should probably named as Quotes Details
const InvoiceDetails = () => {
  const { customerInfo } = useSelectedCustomerContext();

  return (
    <InformationCard title="InvoiceDetails">
      <LabelledTextInput
        label="Name"
        textInputProps={{
          value: customerInfo?.displayName
        }}
      />
      <LabelledTextInput
        label="Email"
        marginTop="$4"
        textInputProps={{
          value: customerInfo?.email
        }}
      />
    </InformationCard>
  );
};

const ProcessButton = () => {
  return <StyledButton colorStyle="primary">Send as Quote</StyledButton>;
};

// Reused Components

const InformationCard = ({
  children,
  title,
  contentProps
}: {
  children?: React.ReactNode;
  title: string;
  contentProps?: React.ComponentProps<typeof View>;
}) => {
  return (
    <Card>
      <Card.Header>
        <Heading>{title}</Heading>
        <View marginTop="$4" {...contentProps}>
          {children}
        </View>
      </Card.Header>
    </Card>
  );
};

interface MaskedInputFieldProps {
  isEditMode: boolean;
  label: string;
  value: string;
}

// const MaskedInputfield = ({label}) => {
//   return <LabelledTextInput label="Address" />;
// };
