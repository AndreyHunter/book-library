import { configureStore } from '@reduxjs/toolkit';

import bookSlice from '../features/bookSlice/bookSlice';

const store = configureStore({
	reducer: { book: bookSlice },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeAppDispatch = typeof store.dispatch;
export default store;