import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { TypeRootState } from '../../app/store';

interface BookInt {
	id: string;
	name: string;
	author: string;
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
		addBook(state, action: PayloadAction<{ name: string; author: string }>) {
			state.books.push({
				id: uuidv4(),
				name: action.payload.name,
				author: action.payload.author,
			});
		},
		removeBook(state, action: PayloadAction<string>) {
			state.books = state.books.filter((book) => book.id !== action.payload);
		},
	},
});

export const getBooks = (state: TypeRootState) => state.book.books;

export const { addBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
