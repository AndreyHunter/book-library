import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { BookInt } from '../../types';

import type { TypeRootState } from '../../app/store';

export const fetchAddBook = createAsyncThunk<
	BookInt,
	{ name: string; author: string },
	{ rejectValue: string }
>('book/fetchAddBook', async (payload, { rejectWithValue }) => {
	try {
		const res = await axios.post<BookInt>('http://localhost:3000/books', {
			...payload,
			favorite: false,
			id: uuidv4(),
		});

		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			return rejectWithValue(err.message);
		}
		return rejectWithValue('Unknown error');
	}
});

export const fetchBooks = createAsyncThunk<BookInt[], undefined, { rejectValue: string }>(
	'books/fetchBooks',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get<BookInt[]>('http://localhost:3000/books');
			return res.data;
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(err.message);
			}
			return rejectWithValue('Unknown error');
		}
	},
);

export const fetchGetRandomBook = createAsyncThunk<BookInt, undefined, { rejectValue: string }>(
	'books/fetchGetRandomBook',
	async (_, { rejectWithValue }) => {
		try {
			const randomBooks = await axios.get<BookInt[]>('http://localhost:3000/randomBooks');
			const randomIndex = Math.floor(Math.random() * randomBooks.data.length);

			const book = randomBooks.data[randomIndex];

			const books = await axios.get<BookInt[]>('http://localhost:3000/books');
			const isIn = books.data.find((item) => item.id === book.id);

			if (isIn) {
				return rejectWithValue('Book is already in list');
			}

			const res = await axios.post<BookInt>('http://localhost:3000/books', {
				...book,
				favorite: false,
			});

			return res.data;
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(err.message);
			}
			return rejectWithValue('Unknown error');
		}
	},
);

export const fetchAddToFavorite = createAsyncThunk<BookInt, string, { rejectValue: string }>(
	'books/fetchAddToFavorite',
	async (id, { rejectWithValue }) => {
		try {
			const book = await axios.get<BookInt>(`http://localhost:3000/books/${id}`);
			const res = await axios.patch<BookInt>(`http://localhost:3000/books/${id}`, {
				favorite: !book.data.favorite,
			});

			return res.data;
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(err.message);
			}
			return rejectWithValue('Unknown error');
		}
	},
);

export const fetchRemoveBook = createAsyncThunk<BookInt, string, { rejectValue: string }>(
	'books/fetchRemoveBook',
	async (id, { rejectWithValue }) => {
		try {
			const res = await axios.delete<BookInt>(`http://localhost:3000/books/${id}`);

			if (!res.data) {
				return rejectWithValue("Book wasn't found");
			}

			return res.data;
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(err.message);
			}
			return rejectWithValue('Unknown error');
		}
	},
);

interface initialStateInt {
	books: BookInt[];
	loading: boolean;
	error: string | null | undefined;
	filters: {
		name: string;
	};
}

const initialState: initialStateInt = {
	books: [],
	loading: false,
	error: null,
	filters: {
		name: '',
	},
};

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setFilterName: (state, action: PayloadAction<string>) => {
			state.filters.name = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// ADD BOOK
			.addCase(fetchAddBook.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAddBook.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.books.push(payload);
			})
			.addCase(fetchAddBook.rejected, (state, { error }) => {
				state.error = error.message;
			})
			// GET BOOKS
			.addCase(fetchBooks.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchBooks.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.books = payload;
			})
			.addCase(fetchBooks.rejected, (state, { error }) => {
				state.error = error.message;
			})
			// GET RANDOM BOOK
			.addCase(fetchGetRandomBook.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchGetRandomBook.fulfilled, (state, { payload }) => {
				state.loading = false;
				const exists = state.books.some((book) => book.id === payload.id);
				if (!exists) {
					state.books.push(payload);
				}
			})
			.addCase(fetchGetRandomBook.rejected, (state, { payload }) => {
				state.error = payload;
			})
			// ADD TO FAVORITE
			.addCase(fetchAddToFavorite.fulfilled, (state, { payload }) => {
				state.books = state.books.map((book) => {
					return book.id === payload.id ? payload : book;
				});
			})
			.addCase(fetchAddToFavorite.rejected, (state, { error }) => {
				state.error = error.message;
			})
			//	REMOVE BOOK
			.addCase(fetchRemoveBook.fulfilled, (state, { payload }) => {
				state.books = state.books.filter((book) => book.id !== payload.id);
			});
	},
});

export const getBooks = (state: TypeRootState) => state.book.books;

export const { setFilterName } = bookSlice.actions;
export default bookSlice.reducer;
