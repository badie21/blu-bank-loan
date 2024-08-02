import React, { HTMLProps } from 'react';

import { Input, Label } from 'components/atoms';

const TextInput = React.forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement> & { error?: string }>(function TextInput(
  { name, label, error, ...restProps },
  ref
) {
  return (
    <Label htmlFor={name} label={label}>
      <Input {...restProps} name={name} ref={ref} />
    </Label>
  );
});

export default TextInput;
