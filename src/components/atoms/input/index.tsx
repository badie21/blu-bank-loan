import classNames from 'classnames';
import React, { HTMLProps } from 'react';

const Input = React.forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement> & { error?: string }>(function Input(props, ref) {
  return (
    <input
      {...props}
      className={classNames('text-black border-[1px] border-black rounded-b px-2 py-4 outline-0 mb-1', props.className)}
      ref={ref}
    />
  );
});

export default Input;
