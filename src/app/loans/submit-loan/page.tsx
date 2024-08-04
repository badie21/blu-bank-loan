import type { Metadata } from 'next';

import { SubmitLoanForm } from 'components';

export const metadata: Metadata = {
  title: 'ثبت درخواست',
  description: 'Generated by create next app'
};

const Page = () => {
  return <SubmitLoanForm />;
};

export default Page;
