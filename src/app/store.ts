import { configureStore } from '@reduxjs/toolkit';

import bookSlice from '../features/bookSlice/bookSlice';
import bookFilterSlice from '../features/bookFilterSlice/bookFilterSlice';

const store = configureStore({
	reducer: {
		book: bookSlice,
		bookFilters: bookFilterSlice,
	},
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeAppDispatch = typeof store.dispatch;
export default store;
