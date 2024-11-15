type TypeHighlightString = {
	text: string;
	filter: string;
	className?: string;
};

const highlightString = ({
	text,
	filter,
	className = 'highlight',
}: TypeHighlightString): string | (string | JSX.Element)[] => {
	if (!filter) return text;
	const regex = new RegExp(`(${filter})`, 'gi');

	return text.split(regex).map((substr, index) => {
		if (substr.toLowerCase() === filter.toLowerCase()) {
			return (
				<span key={index} className={className}>
					{substr}
				</span>
			);
		}
		return substr;
	});
};

export default highlightString;
