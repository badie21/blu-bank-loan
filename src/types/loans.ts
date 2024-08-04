import { number } from 'yup';

export type TLoan = {
  id: string;
  createdDate: Date;
  name: string;
  repaymentType: { name: string; value: number }[];
  amount: number;
  percentageRate?: number;
  interestRate?: number;
  penaltyRate: number;
};

export type TIdentityFormValues = {
  name: string;
  lastName: string;
  nationalCode: string;
  birthDate: Date;
  phone: string;
};

export type IBankInfoFormValues = {
  salaryDeposit?: string;
  shebaNumber: string;
  accountNumber: string;
};

export type ISubmittedLoan = {
  name: string;
  amount: number;
  repaymentType: string;
  installments: number;
  monthlyInstallment: number;
  interestRate: number;
  penaltyAmount: number;
};
