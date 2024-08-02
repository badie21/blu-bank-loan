import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loanApi = createApi({
  reducerPath: 'loanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/loans/api'
  }),
  endpoints: (builder) => ({
    getLoans: builder.query<unknown, void>({
      query: () => ({ url: '/' })
    })
  })
});

export const { useGetLoansQuery } = loanApi;
