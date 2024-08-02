import Link from 'next/link';

const NavBar = () => {
  return (
    <nav
      className={
        'h-16 w-full p-6 flex justify-center items-center gap-6 text-center fixed top-0 left-0 right-0 bg-black bg-opacity-20 text-black font-bold '
      }
    >
      <Link href={'/'} className={'p-2 bg-gray-500 min-w-40 text-white hover:text-gray-800 hover:bg-gray-400 rounded'}>
        لیست وام‌های فعال
      </Link>
      <Link href={'/'} className={'p-2 bg-gray-500 min-w-40 text-white hover:text-gray-800 hover:bg-gray-400 rounded'}>
        خانه
      </Link>
      <Link href={'/'} className={'p-2 bg-gray-500 min-w-40 text-white hover:text-gray-800 hover:bg-gray-400 rounded'}>
        درباره ما
      </Link>
    </nav>
  );
};

export default NavBar;
