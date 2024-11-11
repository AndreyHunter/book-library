import React, { useState } from 'react';

import debounce from '../../utils/debounce';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setFilterName } from '../../features/bookSlice/bookSlice';

import './bookFilter.scss';

const BookFilter: React.FC = () => {
	const dispatch = useAppDispatch();
	const name = useAppSelector((state) => state.book.filters.name);
	const [inputValue, setInputValue] = useState(name);

	const debounceSetName = debounce((value: string) => {
		dispatch(setFilterName(value));
	}, 200);

	const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		debounceSetName(e.target.value);
	};

	return (
		<div className="app-block filter">
			<div className="filter-group">
				<input
					type="text"
					placeholder="Filter by title..."
					value={inputValue}
					onChange={handleSetName}
				/>
			</div>
		</div>
	);
};

export default BookFilter;
