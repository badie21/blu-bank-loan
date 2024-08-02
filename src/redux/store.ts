import { configureStore } from '@reduxjs/toolkit';

import { loanApi } from 'services';

export const store = configureStore({
  reducer: {
    [loanApi.reducerPath]: loanApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loanApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
