/**
 * composeTypesOf is a curried function that composes and iteratively
 * calls each function passed into composeTypesOf with provided params
 * @param functions <Function> any amount of functions
 * @return curriedFunction <Function> a function to be called sometime in the future
 */

export function composeTypesOf(...functions) {
	return function (...params) {
		if (functions.length === params.length) {
			return functions.reduce((a, b, i) => a && b(params[i]), true)
		}
		return false
	}
}
