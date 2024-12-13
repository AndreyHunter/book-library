import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetchAddBook, fetchGetRandomBook } from '../../features/bookSlice/bookSlice';

import BookForm from './BookForm';

const BookFormContainer: React.FC = () => {
	const dispatch = useAppDispatch();
	const [formState, setFormState] = useState({
		name: '',
		author: '',
	});

	const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formState.name && formState.author) {
			dispatch(
				fetchAddBook({
					name: formState.name,
					author: formState.author,
				}),
			);

			setFormState({
				name: '',
				author: '',
			});
		}
	};

	const handleAddRandomBook = () => {
		dispatch(fetchGetRandomBook());
	};

	return (
		<BookForm
			formState={formState}
			handleSubmit={handleSubmit}
			handleSetInput={handleSetInput}
			handleAddRandomBook={handleAddRandomBook}
		/>
	);
};

export default BookFormContainer;
