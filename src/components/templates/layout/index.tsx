import { FC, ReactNode } from 'react';

import { NavBar } from 'components/organisms';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-5  bg-gray-300">
      <div className={'w-[390px] bg-white h-screen overflow-auto pt-24 flex justify-center relative'}>
        <NavBar />
        <main className={'w-full p-4'}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
