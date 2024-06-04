import { Card, Heading, ScrollView, Separator, Spinner, Text, View, YStack } from 'tamagui';
import { BcCustomer } from '~/api/businessCentral/types/customer';
import { BcPaymentTerm } from '~/api/businessCentral/types/paymentTerm';
import { CreateBcSalesQuoteLineRequest } from '~/api/businessCentral/types/salesQuoteLine';
import { useBcSinglePaymentTerms } from '~/api/businessCentral/useBcSinglePaymentTerms';
import { useCreateBcSalesQuote } from '~/api/businessCentral/useCreateBcSalesQuote';
import { LabelledDateTimePicker } from '~/components/DateTimePicker';
import { ProductItem } from '~/components/ProductInCartList';
import { StyledButton } from '~/components/StyledButton';
import { LabelledTextInput } from '~/components/TextInput';
import { useCartContext } from '~/context/CartContext';
import { useSelectedCustomerContext } from '~/context/SelectedCustomerContext';

export default function SendAsQuote() {
  return (
    <YStack flex={1} flexDirection="row" backgroundColor="$background" alignItems="stretch">
      <CheckoutInfo />
      <ItemsInfo />
    </YStack>
  );
}

const ItemsInfo = () => {
  const { products, totalProductPrice } = useCartContext();
  const shippingFee = 0;
  const vat = 7.68;

  return (
    <YStack flex={1}>
      <ScrollView>
        <YStack padding="$3" gap="$4">
          <Heading>Items</Heading>
          {products.map((data, index) => {
            return <ProductItem key={index} data={data} hideActionButton />;
          })}
          <Information label="Subtotal" value={`€${totalProductPrice.toFixed(2)}`} />
          <Information label="ShippingFee" value={shippingFee ? `€${shippingFee}` : 'Free'} />
          <Information
            label="Total"
            value={`€${(totalProductPrice + shippingFee).toFixed(2)}`}
            textProps={{
              fontSize: '$9'
            }}
          />
          <Text>Tax is not included</Text>
          <Separator />
        </YStack>
      </ScrollView>
    </YStack>
  );
};

const Information = ({
  label,
  value,
  textProps
}: {
  label: string;
  value: string;
  textProps?: React.ComponentProps<typeof Text>;
}) => {
  return (
    <View flexDirection="row" justifyContent="space-between">
      <Text {...textProps}>{label}</Text>
      <Text {...textProps}>{value}</Text>
    </View>
  );
};

const CheckoutInfo = () => {
  const { customerInfo } = useSelectedCustomerContext();

  const { data: paymentTerm } = useBcSinglePaymentTerms(customerInfo?.paymentTermsId || '');

  return (
    <YStack width="50%" backgroundColor="$gray3">
      <ScrollView>
        <YStack padding="$3" gap="$4">
          <ShipmentPreferenceCard />
          <DeliveryAddress customerInfo={customerInfo} />
          <BillingDetails customerInfo={customerInfo} paymentTerm={paymentTerm} />
          <InvoiceDetails customerInfo={customerInfo} />
          <Separator marginTop="auto" />
          <ProcessButton customerInfo={customerInfo} paymentTerm={paymentTerm} />
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
const DeliveryAddress = ({ customerInfo }: { customerInfo?: BcCustomer | null }) => {
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
const BillingDetails = ({
  customerInfo,
  paymentTerm
}: {
  customerInfo?: BcCustomer | null;
  paymentTerm?: BcPaymentTerm | null;
}) => {
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
      {paymentTerm ? (
        <LabelledTextInput
          label="Payment terms"
          marginTop="$4"
          textInputProps={{
            value: paymentTerm?.displayName,
            disabled: true
          }}
        />
      ) : (
        <StyledButton colorStyle="secondary" mt="$4">
          + Add Payment Term
        </StyledButton>
      )}
    </InformationCard>
  );
};
//? Invoice detail probably not exist in quote creation, it should probably named as Quotes Details
const InvoiceDetails = ({ customerInfo }: { customerInfo?: BcCustomer | null }) => {
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

const ProcessButton = ({
  customerInfo,
  paymentTerm
}: {
  customerInfo?: BcCustomer | null;
  paymentTerm?: BcPaymentTerm | null;
}) => {
  const createBcSalesQuote = useCreateBcSalesQuote();

  const documentDate = new Date().toISOString().slice(0, 10);
  const { products } = useCartContext();

  const convertedProductToBeQuoteLineRequest: CreateBcSalesQuoteLineRequest[] = products.map(
    (data) => {
      const { item, quantity } = data;
      return {
        itemId: item.id,
        description: item.displayName,
        discountAmount: 0,
        discountPercent: 0,
        lineObjectNumber: item.number,
        lineType: 'Item',
        quantity: quantity || 0,
        unitOfMeasureCode: item?.baseUnitOfMeasureCode,
        unitOfMeasureId: item?.baseUnitOfMeasureId,
        unitPrice: item.unitPrice
      };
    }
  );

  if (createBcSalesQuote.isPending) return <Spinner size="large" />;
  return (
    <StyledButton
      colorStyle="primary"
      onPress={() => {
        createBcSalesQuote.mutate({
          newSalesQuote: {
            customerNumber: customerInfo?.number || '',
            currencyCode: 'USD',
            documentDate,
            paymentTermsId: paymentTerm?.id || ''
          },
          newSalesQuoteLines: convertedProductToBeQuoteLineRequest
        });
      }}>
      Send as Quote
    </StyledButton>
  );
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
