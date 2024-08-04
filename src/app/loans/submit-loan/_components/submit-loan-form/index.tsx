'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, LoanCard, SelectInput } from 'components';
import { addLoan, useAppDispatch, useAppSelector } from 'libs/redux';
import { ISubmittedLoan, LoanPages, PublicPages, TLoan } from 'types';

const schema = yup.object({
  repaymentType: yup.string().required('نوع بازپرداخت را انتخاب کنید')
});

const SubmitLoanForm = () => {
  const { push } = useRouter();

  const [loanInfo, setLoanInfo] = useState<null | ISubmittedLoan>(null);

  const { selectedLoan, identityInfo, bankInfo } = useAppSelector((state) => state.loans);

  if (!selectedLoan || !identityInfo || !bankInfo) {
    push(LoanPages.SelectLoanType);
  }

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<{ repaymentType: string }>({
    defaultValues: {
      repaymentType: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: { repaymentType: string }) => {
    const selectedRepaymentType = selectedLoan?.repaymentType.find((repType) => repType.value.toString() === values.repaymentType);

    const installmentAmount =
      (Number(selectedLoan?.amount) + Number(selectedLoan?.amount) * Number(selectedLoan?.percentageRate ?? 0)) /
      Number(selectedRepaymentType?.value);

    const penaltyAmount = Number(selectedLoan?.amount) * Number(selectedLoan?.penaltyRate ?? 0);

    const newLoan: ISubmittedLoan = {
      name: selectedLoan?.name as string,
      amount: selectedLoan?.amount as number,
      repaymentType: selectedRepaymentType?.name as string,
      installments: selectedRepaymentType?.value as number,
      monthlyInstallment: installmentAmount,
      interestRate: selectedLoan?.interestRate ?? 0,
      penaltyAmount
    };

    setLoanInfo(newLoan);
    // push(LoanPages.IdentityInfo);
  };

  const createNewLoan = (newLoan: ISubmittedLoan) => {
    dispatch(addLoan(newLoan));

    push(PublicPages.Dashboard);
  };

  return (
    <>
      <h2 className="font-bold text-xl mb-5">درخواست تسهیلات</h2>

      {loanInfo ? (
        <LoanCard loanInfo={loanInfo} onSubmit={createNewLoan} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="repaymentType"
            control={control}
            render={({ field }) => (
              <SelectInput
                label={'مدت زمان بازپرداخت'}
                options={selectedLoan?.repaymentType.map((opt) => ({ value: opt.value.toString(), label: opt.name }))}
                value={field.value}
                error={errors?.repaymentType?.message}
                onChange={field.onChange}
              />
            )}
          />
          <Button classnames="mt-7" type="submit">
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default SubmitLoanForm;
