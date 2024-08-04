import Link from 'next/link';

const NavBar = () => {
  return (
    <nav
      className={
        'h-16  p-6 flex justify-center items-center gap-6 text-center fixed top-0 right-0 left-0  bg-black bg-opacity-20 text-black font-bold '
      }
    >
      <Link href={'/'} className={'p-2 bg-gray-500 min-w-40 text-white hover:text-gray-800 hover:bg-gray-400 rounded'}>
        لیست تسهیلات فعال
      </Link>
    </nav>
  );
};

export default NavBar;
