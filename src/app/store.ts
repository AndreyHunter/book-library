import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {},
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeAppDispatch = typeof store.dispatch;
export default store;