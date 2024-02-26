import React from 'react';
import { Label, Separator, XStack, Switch } from 'tamagui';

interface SwitchWithLabelProps extends React.ComponentProps<typeof Switch> {
  label: string;
}

export function LabelledSwitch({ label, ...props }: SwitchWithLabelProps) {
  const id = props.id;
  return (
    <XStack width={200} alignItems="center" gap="$4">
      <Label
        paddingRight="$0"
        minWidth={90}
        justifyContent="flex-end"
        size={props.size}
        htmlFor={id}>
        {label}
      </Label>
      <Separator minHeight={20} vertical />
      <Switch defaultChecked={props.defaultChecked} size="$2" {...props} unstyled>
        <Switch.Thumb animation="quick" backgroundColor="$primary" />
      </Switch>
    </XStack>
  );
}
