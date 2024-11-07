import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { getBooks } from '../../features/bookSlice/bookSlice';

const BookList: React.FC = () => {
	const books = useAppSelector(getBooks);

	return (
		<div className="app-block book-list">
			<h2>Book List</h2>
			<ul>
				{books.map((book) => {
					return (
						<li key={book.id}>
							<div>{book.name}</div>
							<div>{book.author}</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default BookList;
