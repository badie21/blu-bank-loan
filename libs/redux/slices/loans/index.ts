import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IBankInfoFormValues, ISubmittedLoan, TIdentityFormValues, TLoan } from 'types';

export interface LoanAppState {
  selectedLoan?: TLoan;
  identityInfo?: TIdentityFormValues;
  bankInfo?: IBankInfoFormValues;
  activeLoans: ISubmittedLoan[];
}

const initialState: LoanAppState = {
  activeLoans: []
};

export const loansSlice = createSlice({
  name: 'loanSlice',
  initialState,
  reducers: {
    setSelectedLoan: (state, action: PayloadAction<TLoan>) => {
      return { ...state, selectedLoan: action.payload };
    },
    setIdentityInfo: (state, action: PayloadAction<TIdentityFormValues>) => {
      return {
        ...state,
        identityInfo: action.payload
      };
    },
    setBankInfo: (state, action: PayloadAction<IBankInfoFormValues>) => {
      return { ...state, bankInfo: action.payload };
    },
    addLoan: (state, action: PayloadAction<ISubmittedLoan>) => {
      return { ...state, activeLoans: [...state.activeLoans, action.payload] };
    }
  }
});

export const { setSelectedLoan, setIdentityInfo, setBankInfo, addLoan } = loansSlice.actions;

export default loansSlice.reducer;
