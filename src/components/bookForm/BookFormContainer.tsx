import React, { useState } from 'react';
import axios from 'axios';

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

	const handleAddRandomBook = async () => {
		try {
			const res = await axios.get('http://localhost:3000/books');
			const randomIndex = Math.floor(Math.random() * (res.data.length - 5));

			const randomBook = res.data[randomIndex];
			dispatch(addBook(randomBook));
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
			} else {
				console.log('Unknown error:', err);
			}
		}
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
