import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	fetchBooks,
	fetchAddToFavorite,
	fetchRemoveBook,
	selectBooks,
} from '../../features/bookSlice/bookSlice';

import {
	selectAuthorFilter,
	selectFavoriteFilter,
	selectNameFilter,
} from '../../features/bookFilterSlice/bookFilterSlice';

import highlightString from '../../utils/highlightStringString';

import BookMark from '../../components/bookMark/BookMark';

import './bookList.scss';

const BookList: React.FC = () => {
	const dispatch = useAppDispatch();
	const books = useAppSelector(selectBooks);
	const nameFilter = useAppSelector(selectNameFilter);
	const authorFilter = useAppSelector(selectAuthorFilter);
	const favoriteFilter = useAppSelector(selectFavoriteFilter);

	useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);

	const handleRemoveBook = (id: string) => {
		dispatch(fetchRemoveBook(id));
	};

	const handleFavoriteBook = (id: string) => {
		dispatch(fetchAddToFavorite(id));
	};

	const filteredBooks = books.filter((book) => {
		const matchByName = `${book.name || book.title}`
			.toLowerCase()
			.includes(nameFilter.toLowerCase());
		const matchByAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase());
		const matchByFavorite = favoriteFilter ? book.favorite : true;

		return matchByName && matchByAuthor && matchByFavorite;
	});

	return (
		<div className="app-block book-list">
			<h2>Book List</h2>
			{filteredBooks.length ? (
				<ul>
					{filteredBooks.map((book, index) => {
						return (
							<li key={book.id}>
								<div className="book-info">
									{++index}.{' '}
									{highlightString({
										text: `${book.name || book.title}`,
										filter: nameFilter,
									})}{' '}
									by{' '}
									<strong>
										{highlightString({
											text: book.author,
											filter: authorFilter,
										})}
									</strong>
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
