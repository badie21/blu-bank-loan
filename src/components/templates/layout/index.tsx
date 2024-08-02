import { FC, ReactNode } from 'react';

import { NavBar } from 'components/organisms';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-5 p-12 bg-gray-300">
      <NavBar />
      <main className={''}>{children}</main>
    </div>
  );
};

export default Layout;
