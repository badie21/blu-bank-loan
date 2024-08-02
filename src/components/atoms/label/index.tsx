import { FC, HTMLProps, ReactNode } from 'react';

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ children, label, htmlFor, ...resProps }) => {
  return (
    <>
      <label {...resProps} className={'text-black flex flex-col pb-4'} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </>
  );
};

export default Label;
