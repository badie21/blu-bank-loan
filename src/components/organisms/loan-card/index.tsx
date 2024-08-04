import { FC } from 'react';

import { Button } from 'components';
import { ISubmittedLoan } from 'types';

interface Props {
  loanInfo: ISubmittedLoan;
  onSubmit?: (loanInfo: ISubmittedLoan) => void;
}

const LoanCard: FC<Props> = ({ loanInfo, onSubmit }) => {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl mb-4">
      <div className="p-6 text-surface text-black">
        <h2 className="mb-2 text-xl font-medium leading-tight">{loanInfo.name}</h2>
        <ul className="w-full m-0 flex flex-col gap-3">
          <li className="flex justify-between">
            <span>مبلغ وام</span>
            <span>{loanInfo.amount.toLocaleString('fa')}</span>
          </li>
          <li className="flex justify-between">
            <span>مدت زمان بازپرداخت</span>
            <span>{loanInfo.repaymentType}</span>
          </li>
          <li className="flex justify-between">
            <span>تعداد اقساط</span>
            <span>{loanInfo.installments.toLocaleString('fa')}</span>
          </li>
          <li className="flex justify-between">
            <span>مبلغ قسط ماهیانه</span>
            <span>{loanInfo.monthlyInstallment.toLocaleString('fa')}</span>
          </li>
          <li className="flex justify-between">
            <span>درصد سود سالیانه</span>
            <span>{loanInfo.interestRate.toLocaleString('fa')} ٪</span>
          </li>
          <li className="flex justify-between">
            <span>مبلغ جریمه دیرکرد</span>
            <span>{loanInfo.penaltyAmount.toLocaleString('fa')}</span>
          </li>
        </ul>
        {onSubmit && (
          <Button onClick={() => onSubmit(loanInfo)} type="button" classnames={'mt-6'}>
            درخواست وام
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoanCard;
