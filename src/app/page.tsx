'use client';
// import { Input } from 'components';

import Image from 'next/image';
import Link from 'next/link';

import { useGetLoansQuery } from 'services';

export default function Home() {
  const { data } = useGetLoansQuery();

  return <div className=""></div>;
}
