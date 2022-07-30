import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AccountReducer from '../components/accounts/accountsSlice';
import MealReducer from '../components/meal/mealSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: AccountReducer,
    meal: MealReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
