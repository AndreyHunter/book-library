import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getBooks, removeBook } from '../../features/bookSlice/bookSlice';

import './bookList.scss';

const BookList: React.FC = () => {
	const dispatch = useAppDispatch();
	const books = useAppSelector(getBooks);

	const handleRemoveBook = (id: string) => {
		dispatch(removeBook(id));
	};

	return (
		<div className="app-block book-list">
			<h2>Book List</h2>
			{books.length ? (
				<ul>
					{books.map((book) => {
						return (
							<li key={book.id}>
								<div className="book-info">
									{book.name} by <strong>{book.author}</strong>
								</div>
								<div className="book-actions">
									<button
										onClick={() => {
											handleRemoveBook(book.id);
											console.log('hello');
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
