import React, { HTMLProps } from 'react';

import { Input, Label } from 'components/atoms';

const NumberInput = React.forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement> & { error?: string }>(function NumberInput(
  { name, label, error, ...restProps },
  ref
) {
  return (
    <Label htmlFor={name} label={label}>
      <Input {...restProps} type={'number'} name={name} ref={ref} />
    </Label>
  );
});

export default NumberInput;
