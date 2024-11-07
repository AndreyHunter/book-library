import React, { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';

import { addBook } from '../../features/bookSlice/bookSlice';

import './bookForm.scss';

const BookForm: React.FC = () => {
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
		}

		setFormState({
			name: '',
			author: '',
		});
	};

	return (
		<div className="app-block book-form">
			<h2>Add a new book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						id="name"
						name="name"
						value={formState.name}
						onChange={handleSetInput}
					/>
				</div>
				<div>
					<label htmlFor="author">Author: </label>
					<input
						type="text"
						id="author"
						name="author"
						value={formState.author}
						onChange={handleSetInput}
					/>
				</div>
				<button>Add Book</button>
			</form>
		</div>
	);
};

export default BookForm;
