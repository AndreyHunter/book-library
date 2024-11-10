import React from 'react';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';

import styles from './bookMark.module.scss';

interface BookMarkInt extends React.HTMLAttributes<SVGAElement> {
	isCompleted: boolean;
	className?: string;
}

const BookMark: React.FC<BookMarkInt> = ({ isCompleted, className, ...props }) => {
	const rootClass = `${styles.root} ${className}`.trim();
	if (isCompleted) {
		return <BsBookmarkStarFill className={rootClass} {...props} />;
	} else {
		return <BsBookmarkStar className={rootClass} {...props} />;
	}
};

export default BookMark;
