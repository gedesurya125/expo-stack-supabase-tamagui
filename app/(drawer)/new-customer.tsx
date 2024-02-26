import { useState, useEffect } from 'react';
import { H1, H2, YStack, Separator, Form, Button, Spinner } from 'tamagui';
import { SelectField } from '~/components';
import { DateTimePicker } from '~/components/DateTimePicker';
import { TextInput } from '~/components/TextInput';

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
      <SelectField
        options={[{ name: 'company' }, { name: 'person' }]}
        selectTitle="Type"
        placeholder="Select Type"
        initialValue="company"
      />
      <TextInput placeholder="Firs Name" />
      <TextInput placeholder="Last name" />
      <TextInput placeholder="Address" />
      <TextInput placeholder="City" />
      <DateTimePicker />
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
