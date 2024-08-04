import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loansSlice from './slices/loans';
import { loanApi } from '../services';

const persistConfig = {
  key: 'loans',
  storage,
  whitelist: ['activeLoans']
};

const persistedReducer = persistReducer(persistConfig, loansSlice);

const reducers = combineReducers({
  loans: persistedReducer,
  [loanApi.reducerPath]: loanApi.reducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loanApi.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
