import { Formik } from 'formik';
import React from 'react';
import { Form, Button, Spinner, Text } from 'tamagui';
import { CreateCustomerBody, createCustomer } from '~/api/xentral/createCustomer';
import { LabelledSelectField, LabelledSwitch } from '~/components';
import { LabelledDateTimePicker } from '~/components/DateTimePicker';
import { LabelledTextInput } from '~/components/TextInput';
import { useCustomerContext } from '~/context/CustomersContext';

export const AddCustomerForm = () => {
  const { clearExistingCustomer } = useCustomerContext();

  const [errorMessage, setErrorMessage] = React.useState('');

  const initialFormValue: CreateCustomerBody = {
    type: 'company',
    general: {
      title: '',
      name: '',
      birthday: new Date().toISOString(),
      address: {
        street: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        note: ''
      }
    },
    contact: {
      phone: '',
      fax: '',
      mobile: '',
      email: '',
      website: '',
      marketingMails: false,
      trackingMails: false
    }
  };

  return (
    <Formik
      initialValues={initialFormValue}
      onSubmit={async (values, props) => {
        console.log('formik values', JSON.stringify(values));
        const result = await createCustomer(values);
        console.log('this is the result', result);
        if (result?.ok) {
          const text = await result.text();
          clearExistingCustomer();
          console.log('customer crated', result.status, text);
          setErrorMessage('');
        } else {
          const text = await result?.text();
          console.log('customer not created', text);
          setErrorMessage(JSON.stringify(text, null, 2));
        }

        props.setSubmitting(false);
      }}>
      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue }) => {
        return (
          <Form gap="$4" onSubmit={handleSubmit}>
            <LabelledSelectField
              label="Type"
              selectFieldProps={{
                options: [{ name: 'company' }, { name: 'person' }],
                selectTitle: 'Type',
                placeholder: 'Select Type',
                onValueChange: handleChange('type'),
                value: values.type,
                onBlur: handleBlur('type'),
                initialValue: 'company'
              }}
            />
            <LabelledTextInput
              label="Title"
              textInputProps={{
                placeholder: 'Title',
                value: values.general.title,
                onChangeText: handleChange('general.title'),
                onBlur: handleBlur('general.title')
              }}
            />
            <LabelledTextInput
              label="Name"
              textInputProps={{
                placeholder: 'Name',
                value: values.general.name,
                onChangeText: handleChange('general.name'),
                onBlur: handleBlur('general.name')
              }}
            />

            <LabelledDateTimePicker
              label="Birth Date"
              dateTimePickerProps={{
                value: values.general.birthday || new Date().toLocaleDateString(),
                handleChange: handleChange('general.birthday'),
                onBlur: handleBlur('general.birthday')
              }}
            />

            <GroupLabel>Address Information</GroupLabel>

            <LabelledTextInput
              label="Street"
              textInputProps={{
                placeholder: '',
                value: values.general.address.street,
                onChangeText: handleChange('general.address.street'),
                onBlur: handleBlur('general.address.street')
              }}
            />
            <LabelledTextInput
              label="Zip"
              textInputProps={{
                placeholder: '',
                value: values.general.address.zip,
                onChangeText: handleChange('general.address.zip'),
                onBlur: handleBlur('general.address.zip')
              }}
            />
            <LabelledTextInput
              label="City"
              textInputProps={{
                placeholder: '',
                value: values.general.address.city,
                onChangeText: handleChange('general.address.city'),
                onBlur: handleBlur('general.address.city')
              }}
            />
            <LabelledTextInput
              label="State"
              textInputProps={{
                placeholder: '',
                value: values.general.address.state,
                onChangeText: handleChange('general.address.state'),
                onBlur: handleBlur('general.address.state')
              }}
            />
            <LabelledTextInput
              label="Country"
              textInputProps={{
                placeholder: '',
                value: values.general.address.country,
                onChangeText: handleChange('general.address.country'),
                onBlur: handleBlur('general.address.country')
              }}
            />
            <LabelledTextInput
              label="Note"
              textInputProps={{
                placeholder: '',
                value: values.general.address.note,
                onChangeText: handleChange('general.address.note'),
                onBlur: handleBlur('general.address.note')
              }}
            />

            <GroupLabel>Contact Information:</GroupLabel>

            <LabelledTextInput
              label="Phone"
              textInputProps={{
                placeholder: '',
                value: values.contact.phone,
                onChangeText: handleChange('contact.phone'),
                onBlur: handleBlur('contact.phone')
              }}
            />
            <LabelledTextInput
              label="Fax"
              textInputProps={{
                placeholder: '',
                value: values.contact.fax,
                onChangeText: handleChange('contact.fax'),
                onBlur: handleBlur('contact.fax')
              }}
            />
            <LabelledTextInput
              label="Mobile"
              textInputProps={{
                placeholder: '',
                value: values.contact.mobile,
                onChangeText: handleChange('contact.mobile'),
                onBlur: handleBlur('contact.mobile')
              }}
            />
            <LabelledTextInput
              label="Email"
              textInputProps={{
                placeholder: '',
                value: values.contact.email,
                onChangeText: handleChange('contact.email'),
                onBlur: handleBlur('contact.email'),
                autoCapitalize: 'none',
                autoCorrect: false,
                autoComplete: 'email',
                inputMode: 'email'
              }}
            />
            <LabelledTextInput
              label="Website"
              textInputProps={{
                placeholder: '',
                value: values.contact.website,
                onChangeText: handleChange('contact.website'),
                onBlur: handleBlur('contact.website'),
                autoCapitalize: 'none',
                autoComplete: 'url',
                inputMode: 'url'
              }}
            />
            <LabelledSwitch
              label="Marketing mails"
              checked={values.contact.marketingMails}
              onCheckedChange={(value: boolean) => {
                setFieldValue('contact.marketingMails', value);
              }}
              onBlur={handleBlur('contact.marketingMails')}
            />
            {errorMessage && <Text>{errorMessage}</Text>}
            <Form.Trigger asChild disabled={isSubmitting}>
              <Button
                icon={isSubmitting ? () => <Spinner /> : undefined}
                backgroundColor="$orange6"
                marginTop="$5">
                Submit
              </Button>
            </Form.Trigger>
          </Form>
        );
      }}
    </Formik>
  );
};
const GroupLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text marginTop="$5" fontSize="$2">
      {children}
    </Text>
  );
};