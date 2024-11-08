import React, { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { addBook } from '../../features/bookSlice/bookSlice';

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
				addBook({
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

	return (
		<BookForm
			formState={formState}
			handleSubmit={handleSubmit}
			handleSetInput={handleSetInput}
		/>
	);
};

export default BookFormContainer;
