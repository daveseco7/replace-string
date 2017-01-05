'use strict';
module.exports = (input, needle, replacement, fromIndex) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected input to be a string, got ${typeof input}`);
	}

	if (!(typeof needle === 'string' && needle.length > 0) ||
		!(typeof replacement === 'string' || typeof replacement === 'function')) {
		return input;
	}

	let ret = '';
	let matchCount = 0;
	let prevIndex = 0;
	const startIndex = (typeof fromIndex === 'number' && fromIndex > 0) ? fromIndex : 0;

	while (true) { // eslint-disable-line no-constant-condition
		const index = input.indexOf(needle, prevIndex);

		if (index === -1) {
			break;
		}

		if (index >= startIndex) {
			matchCount++;
			const replaceStr = typeof replacement === 'string' ? replacement : replacement(needle, matchCount, input);
			ret += input.slice(prevIndex, index) + replaceStr;
		} else {
			ret += input.slice(prevIndex, index + needle.length);
		}
		prevIndex = index + needle.length;
	}

	return ret + input.slice(prevIndex);
};
