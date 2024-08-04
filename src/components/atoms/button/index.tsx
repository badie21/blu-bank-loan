import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  classnames?: string;
}

const Button: FC<Props> = ({ children, type = 'button', onClick, classnames = '' }) => {
  return (
    <button type={type} onClick={onClick ?? undefined} className={classNames('w-full bg-blue-600 p-4 rounded-xl text-white', classnames)}>
      {children}
    </button>
  );
};

export default Button;
