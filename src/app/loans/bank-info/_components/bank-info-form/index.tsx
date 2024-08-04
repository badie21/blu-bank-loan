'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { Button, NumberInput, TextInput } from 'components';
import { setBankInfo, useAppSelector } from 'libs/redux';
import { IBankInfoFormValues, LoanPages } from 'types';
import { shebaRegex } from 'utils';

const schema = yup.object({
  accountNumber: yup.string().length(10, 'شماره حساب اشتباه است').matches(/^\d+$/, 'شماره حساب اشتباه است').required('شماره حساب الزامیست'),
  shebaNumber: yup.string().matches(shebaRegex, 'فرمت شماره شبا استباه است').required('وارد کردن شماره شبا الزامیست'),
  salaryDeposit: yup.string()
});

const BankInfoForm = () => {
  const { push } = useRouter();

  const { identityInfo, selectedLoan } = useAppSelector((state) => state.loans);

  if (!identityInfo || !selectedLoan) {
    push(LoanPages.SelectLoanType);
  }

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IBankInfoFormValues>({
    defaultValues: {},
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: IBankInfoFormValues) => {
    dispatch(setBankInfo(values));

    push(LoanPages.SubmitLoan);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-xl mb-5">مشخصات بانکی</h2>

      <Controller
        name="accountNumber"
        control={control}
        render={({ field }) => (
          <NumberInput label={'شماره حساب'} error={errors.accountNumber?.message} value={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        name="shebaNumber"
        control={control}
        render={({ field }) => (
          <TextInput label={'شماره شبا'} error={errors.shebaNumber?.message} value={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        name="salaryDeposit"
        control={control}
        render={({ field }) => (
          <NumberInput
            label={'میانگین ریالی موجودی سالیانه'}
            error={errors.salaryDeposit?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Button classnames="mt-7" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default BankInfoForm;
