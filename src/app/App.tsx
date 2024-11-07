import React from 'react';

import BookForm from '../components/bookForm/BookForm';
import BookFilter from '../components/bookFilter/BookFilter';
import BookList from '../components/bookForm/BookForm';

import './app.scss';

const App: React.FC = () => {
	return (
		<div className="app">
			<header className="app-header">
				<h1>App header</h1>
			</header>
			<main className="app-main">
				<div className="app-left-column">
					<BookForm />
				</div>
				<div className="app-right-column">
					<BookFilter />
					<BookList />
				</div>
			</main>
		</div>
	);
};

export default App;
