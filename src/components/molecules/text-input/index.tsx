import classNames from 'classnames';
import React, { HTMLProps } from 'react';

import { Input, Label } from 'components/atoms';

const TextInput = React.forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement> & {
    error?: string;
  }
>(function TextInput({ name, label, error, ...restProps }, ref) {
  const hasError = Boolean(error);

  return (
    <Label htmlFor={name} label={label}>
      <Input {...restProps} className={classNames(hasError && 'border-red-700', 'w-full')} name={name} ref={ref} />
      {hasError && <p className={'text-red-700'}>{error}</p>}
    </Label>
  );
});

export default TextInput;
