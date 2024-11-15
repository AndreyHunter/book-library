import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeRootState } from '../../app/store';

interface initialStateInt {
	name: string;
	author: string;
	favorite: boolean;
}

const initialState: initialStateInt = {
	name: '',
	author: '',
	favorite: false,
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
		setfilterFavorite: (state) => {
			state.favorite = !state.favorite;
		},
		resetFilters: () => {
			return initialState;
		},
	},
});

export const { setFilterName, setFilterAuthor, setfilterFavorite, resetFilters } =
	bookFilterSlice.actions;
export default bookFilterSlice.reducer;

export const selectNameFilter = (state: TypeRootState) => state.bookFilters.name;
export const selectAuthorFilter = (state: TypeRootState) => state.bookFilters.author;
export const selectFavoriteFilter = (state: TypeRootState) => state.bookFilters.favorite;