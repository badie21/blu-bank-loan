'use client';

import { LoanCard } from 'components';
import { useAppSelector } from 'libs/redux';

const LoanList = () => {
  const { activeLoans } = useAppSelector((state) => state.loans);

  return (
    <div className={'text-black pb-10'}>
      <h2 className="font-bold text-xl mb-5">لیست تسهیلات فعال</h2>
      {activeLoans.map((item, index) => (
        <LoanCard key={index} loanInfo={item} />
      ))}
    </div>
  );
};

export default LoanList;
