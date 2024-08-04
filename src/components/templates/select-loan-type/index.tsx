'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { Button, SelectInput } from 'components';
import { setSelectedLoan } from 'redux/store';
import { useGetLoansQuery } from 'services';
import { LoanPages, TLoan } from 'types';

const schema = yup.object({
  loan: yup.string().required('انتخاب نوع تسهیلات الزامیست')
});

const SelectLoanTypeForm = () => {
  const { push } = useRouter();

  const { data } = useGetLoansQuery();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<{ loan: string }>({
    defaultValues: {
      loan: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: { loan: string }) => {
    const selectedLoan = data?.data.find((loan: TLoan) => loan.id === values.loan);

    if (!selectedLoan) return;

    dispatch(setSelectedLoan(selectedLoan));

    push(LoanPages.IdentityInfo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="loan"
        control={control}
        render={({ field }) => (
          <SelectInput
            label={'توع تسهیلات'}
            options={data?.data?.map((opt) => ({ value: opt.id, label: opt.name }))}
            value={field.value}
            error={errors?.loan?.message}
            onChange={field.onChange}
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SelectLoanTypeForm;
