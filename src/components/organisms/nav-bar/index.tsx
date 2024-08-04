import Link from 'next/link';

import { LoanPages, PublicPages } from 'types';

const NavBar = () => {
  return (
    <nav className=" h-16 absolute top-0 left-0 right-0 border-gray-200 bg-gray-900">
      <ul className="flex h-full items-center justify-center gap-2">
        <Link href={LoanPages.SelectLoanType}>
          <li>
            <button
              type="button"
              className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              درخواست تسهیلات جدید
            </button>
          </li>
        </Link>
        <Link href={PublicPages.Dashboard} className={'text-white'}>
          <li className=" bg-transparent">لیست تسهیلات</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
