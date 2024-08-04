'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { Button, DatePicker, Label, NumberInput, TextInput } from 'components';
import { setIdentityInfo, useAppSelector } from 'redux/store';
import { LoanPages, TIdentityFormValues } from 'types';
import { nationalCodeRegex, phoneNumberRegex } from 'utils';

const schema = yup.object({
  name: yup.string().required('وارد کردن نام الزامیست'),
  lastName: yup.string().required('وارد کردن نام الزامیست'),
  phone: yup.string().matches(phoneNumberRegex, 'فرمت شماره استباه است').required('وارد کردن شماره تلفن الزامیست'),
  nationalCode: yup.string().matches(nationalCodeRegex, 'کد ملی اشتباه است').required('وارد کردن کد ملی الزامیست'),
  birthDate: yup.date().required('وارد کرن تارخ تولد الزامیست')
});

const IdentityInfoForm = () => {
  const { push } = useRouter();

  const { selectedLoan } = useAppSelector((state) => state.loans);

  if (!selectedLoan) {
    push(LoanPages.SelectLoanType);
  }

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TIdentityFormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      phone: '',
      nationalCode: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: TIdentityFormValues) => {
    dispatch(setIdentityInfo(values));

    push(LoanPages.BankInfo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-xl mb-5">مشخصات هویتی</h2>

      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextInput label={'نام'} error={errors.name?.message} value={field.value} onChange={field.onChange} />}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextInput label={'نام‌خانوادگی'} error={errors.lastName?.message} value={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        name="nationalCode"
        control={control}
        render={({ field }) => (
          <NumberInput label={'کد ملی'} error={errors.nationalCode?.message} value={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <NumberInput label={'شماره همراه'} error={errors.phone?.message} value={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <Label label={'تاریخ تولد'}>
            <DatePicker
              error={errors.birthDate?.message}
              value={{ from: field.value ? new Date(field.value) : undefined }}
              onChange={(value) => {
                field.onChange(value.from);
              }}
            />
          </Label>
        )}
      />
      <Button classnames="mt-7" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default IdentityInfoForm;
