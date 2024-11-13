import React, { useState } from 'react';

import debounce from '../../utils/debounce';
import { useAppDispatch } from '../../app/hooks';
import {
	setFilterName,
	setFilterAuthor,
	resetFilters,
} from '../../features/bookFilterSlice/bookFilterSlice';

import './bookFilter.scss';

const BookFilter: React.FC = () => {
	const dispatch = useAppDispatch();
	const [nameValue, setNameValue] = useState('');
	const [authorValue, setAuthorValue] = useState('');

	const debounceSetName = debounce((value: string) => {
		dispatch(setFilterName(value));
	}, 200);

	const debounceSetAuthor = debounce((value: string) => {
		dispatch(setFilterAuthor(value));
	}, 200);

	const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNameValue(e.target.value);
		debounceSetName(e.target.value);
	};

	const handleSetAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuthorValue(e.target.value);
		debounceSetAuthor(e.target.value);
	};

	const handleResetFilters = () => {
		dispatch(resetFilters());
		setNameValue('');
		setAuthorValue('');
	};

	return (
		<div className="app-block filter">
			<div className="filter-row">
				<div className="filter-group">
					<input
						type="text"
						placeholder="Filter by title..."
						value={nameValue}
						onChange={handleSetName}
					/>
				</div>
				<div className="filter-group">
					<input
						type="text"
						placeholder="Filter by author..."
						value={authorValue}
						onChange={handleSetAuthor}
					/>
				</div>
				<button onClick={handleResetFilters}>Reset filters</button>
			</div>
		</div>
	);
};

export default BookFilter;
