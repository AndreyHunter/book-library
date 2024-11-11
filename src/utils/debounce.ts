const debounce = (func: Function, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...rest: any[]) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			func(...rest);
		}, delay);
	};
};

export default debounce;