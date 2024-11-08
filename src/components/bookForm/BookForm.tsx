import React from 'react';

import './bookForm.scss';

interface BookFormInt {
	handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	handleSetInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formState: { name: string; author: string };
}

const BookForm: React.FC<BookFormInt> = ({ handleSubmit, handleSetInput, formState }) => {
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
