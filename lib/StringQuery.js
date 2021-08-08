import { isTypeOfString, isTypeOfStringArray } from './utils/isTypeOfString'
import { composeTypesOf } from './utils/composeTypesOf'

class StringQuery {
	constructor(recommendations, option = {}) {
		// configure StringQuery options with contructor parameters
		this.option = {
			_recommendations: recommendations,
			...this.setOption(option)
		}

		this._reg = new RegExp(/\s/g)
		this._map = new Map()
		this._key
	}

	get map() {
		return this._map
	}

	setOption(option) {
		if (option.hasOwnProperty('useTrim') || option.hasOwnProperty('useRegex')) {
			const { useTrim = false, useRegex = false } = option

			return {
				...this.option,
				_useTrim: useTrim,
				_useRegex: useRegex
			}
		}
	}

	scrubByTrim(string) {
		return string.trim()
	}

	scrubByRegex(string) {
		return string.replace(this._reg, '')
	}

	scrubString(string) {
		if (this.option._useTrim) {
			return this.scrubByTrim(string)
		}

		if (this.option._useTrim || this.option._useRegex) {
			return this.scrubByRegex(string)
		}

		return string
	}

	isOfIterableTypes(string) {
		if (!string || !this.option._recommendations) {
			return false
		}

		return composeTypesOf(isTypeOfString, isTypeOfStringArray)(
			string,
			this.option._recommendations
		)
	}

	findIndexOfMax() {
		var max = Number.NEGATIVE_INFINITY

		console.log(this._map)

		this._map.forEach((number, key) =>
			number > max ? ((max = number), (this._key = key)) : this._map.delete(key)
		)

		// keep previous index reference
		const prevIdx = this._key

		// empty out Map
		this._map.delete(this._key)

		// empty out key ~ might change to null reference
		delete this._key

		return prevIdx
	}

	findByDynamic(string) {
		if (this.isOfIterableTypes(string) === false) {
			throw Error(
				`paramaters must be a string, and array of strings instead received ${typeof string} and ${typeof this
					.option._recommendations}`
			)
		}

		const { _recommendations } = this.option

		// scrub string to ensure it can be searched
		const _string = this.scrubString(string)

		/**
		 * Dynamic approach on finding matching string characters from a provided source
		 * to get a string most related based upon a first single string input
		 */

		for (let i = 0; i < _string.length; i++) {
			for (let j = 0; j < _recommendations.length; j++) {
				// attempt to find match on iteractions with a chars charCode
				if (_string.charCodeAt(i) === _recommendations[j].charCodeAt(i)) {
					if (this._map.has(j)) {
						this._map.set(j, this._map.get(j) + 1)
					} else {
						this._map.set(j, 1)
					}
				}
			}
		}

		return _recommendations[this.findIndexOfMax()] || ''
	}
}

export default StringQuery
