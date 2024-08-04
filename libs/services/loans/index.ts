import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TLoan } from 'types';

export const loanApi = createApi({
  reducerPath: 'loanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/loans/api'
  }),
  endpoints: (builder) => ({
    getLoans: builder.query<{ data: TLoan[] }, void>({
      query: () => ({ url: '/' })
    })
  })
});

export const { useGetLoansQuery } = loanApi;
