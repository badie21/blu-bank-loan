import classNames from 'classnames';
import React, { HTMLProps } from 'react';

import { Input, Label } from 'components/atoms';

const NumberInput = React.forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement> & {
    error?: string;
  }
>(function NumberInput({ name, label, error, ...restProps }, ref) {
  const hasError = Boolean(error);

  return (
    <Label htmlFor={name} label={label} className={'w-full'}>
      <Input {...restProps} className={classNames(hasError && 'border-red-700', 'w-full')} type={'number'} name={name} ref={ref} />
      {hasError && <p className={'text-red-700'}>{error}</p>}
    </Label>
  );
});

export default NumberInput;
