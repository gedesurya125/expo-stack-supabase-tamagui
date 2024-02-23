import { useState, useEffect } from 'react';
import { H1, H2, YStack, Separator, Form, Input, Button, Spinner, useTheme } from 'tamagui';

export default function NewCustomer() {
  return (
    <YStack backgroundColor="$background" flex={1} padding="$4">
      <H2>Add New Customer</H2>
      <Separator my="$4" />
      <AddCustomerForm />
    </YStack>
  );
}
const AddCustomerForm = () => {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <Form gap="$4" onSubmit={() => setStatus('submitting')}>
      <TextInput placeholder="Firs Name" />
      <TextInput placeholder="Last name" />
      <TextInput placeholder="Address" />
      <TextInput placeholder="City" />
      <Form.Trigger asChild disabled={status !== 'off'}>
        <Button
          icon={status === 'submitting' ? () => <Spinner /> : undefined}
          backgroundColor="$orange6">
          Submit
        </Button>
      </Form.Trigger>
    </Form>
  );
};

const TextInput = ({ ...props }) => {
  const theme = useTheme();

  return (
    <Input
      {...props}
      borderColor="$orange6"
      focusStyle={{
        borderColor: theme.blue6,
      }}
    />
  );
};
