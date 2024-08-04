import type { Metadata } from 'next';

import IdentityInfoForm from './_components/identity-info-form';

export const metadata: Metadata = {
  title: 'اطلاعات هویتی',
  description: 'Generated by create next app'
};

const Page = () => {
  return <IdentityInfoForm />;
};

export default Page;
