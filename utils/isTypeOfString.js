export function isTypeOfString(param) {
	return Object.getPrototypeOf(param) === String.prototype
}

export function isTypeOfStringArray(params) {
	const isArray = Array.isArray(params) && params.length

	if (isArray) {
		return params.some((param) => isTypeOfString(param) !== false)
	}

	return false
}
