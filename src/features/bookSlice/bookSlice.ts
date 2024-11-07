import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TypeRootState } from '../../app/store';

interface BookInt {
	id: number;
	name: string;
	author?: string;
}

interface initialStateInt {
	books: BookInt[];
}

const initialState: initialStateInt = {
	books: [],
};

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		addBook(state, action: PayloadAction<{ name: string; author?: string }>) {
			state.books.push({
				id: performance.now(),
				name: action.payload.name,
				author: action.payload.author,
			});
		},
	},
});

export const getBooks = (state: TypeRootState) => state.book.books;

export const { addBook } = bookSlice.actions;
export default bookSlice.reducer;
