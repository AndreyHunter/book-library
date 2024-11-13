import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeRootState } from '../../app/store';

interface initialStateInt {
	name: string;
	author: string;
}

const initialState: initialStateInt = {
	name: '',
	author: '',
};

const bookFilterSlice = createSlice({
	name: 'bookFilter',
	initialState,
	reducers: {
		setFilterName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setFilterAuthor: (state, action: PayloadAction<string>) => {
			state.author = action.payload;
		},
		resetFilters: () => {
			return initialState;
		},
	},
});

export const getNameFilter = (state: TypeRootState) => state.bookFilters.name;
export const getAuthorFilter = (state: TypeRootState) => state.bookFilters.author;

export const { setFilterName, resetFilters, setFilterAuthor } = bookFilterSlice.actions;
export default bookFilterSlice.reducer;