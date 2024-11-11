import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	getBooks,
	fetchBooks,
	fetchAddToFavorite,
	fetchRemoveBook,
} from '../../features/bookSlice/bookSlice';

import BookMark from '../../components/bookMark/BookMark';

import './bookList.scss';

const BookList: React.FC = () => {
	const dispatch = useAppDispatch();
	const books = useAppSelector(getBooks);
	const name = useAppSelector((state) => state.book.filters.name);

	useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);

	const handleRemoveBook = (id: string) => {
		dispatch(fetchRemoveBook(id));
	};

	const handleFavoriteBook = (id: string) => {
		dispatch(fetchAddToFavorite(id));
	};

	const filteredBooks = books.filter((book) =>
		`${book.name || book.title}`.toLowerCase().includes(name.toLowerCase()),
	);

	return (
		<div className="app-block book-list">
			<h2>Book List</h2>
			{filteredBooks.length ? (
				<ul>
					{filteredBooks.map((book, index) => {
						return (
							<li key={book.id}>
								<div className="book-info">
									{++index}. {book.name || book.title} by{' '}
									<strong>{book.author}</strong>
								</div>
								<div className="book-actions">
									<BookMark
										isCompleted={book.favorite}
										className="star-icon"
										onClick={() => handleFavoriteBook(book.id)}
									/>
									<button
										onClick={() => {
											handleRemoveBook(book.id);
										}}>
										remove
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<p>No books available</p>
			)}
		</div>
	);
};

export default BookList;
