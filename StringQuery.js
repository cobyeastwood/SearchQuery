import {
	isTypeOfString,
	isTypeOfStringArray
} from ('./utils/isTypeOfString')
import { composeTypesOf } from ('./utils/composeTypesOf')

class StringQuery {
	constructor(string, recommendations) {
		// configure StringQuery options with contructor parameters
		this.option = {
			_string: string,
			_recommendations: recommendations
		}

		this._map = new Map()
		this._key
	}

	isOfIterableTypes() {
		if (!this.option._string || !this.option._recommendations) {
			return false
		}

		return composeTypesOf(isTypeOfString, isTypeOfStringArray)(
			this.option._string,
			this.option._recommendations
		)
	}

	findIndexOfMax() {
		var max = Number.NEGATIVE_INFINITY

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

	findByDynamic() {
		if (this.isOfIterableTypes() === false) {
			return new Error(
				`paramaters must be a string, and array of strings instead received ${typeof this
					.option._string} and ${typeof this.option._recommendations}`
			)
		}

		const { _string, _recommendations } = this.option

		/** 
		 * Dynamic approach on finding matching string characters from a provided source 
		 * to get a string most related based upon a first single string input 
		 */

		for (let i = 0; i < _string.length; i++) {
			for (let j = 0; j < _recommendations.length; j++) {
				// test support for isNaN case
				// test support for recommendations[j] shorter than string in length
				if (_string.charCodeAt(i) === _recommendations[j].charCodeAt(i)) {
					if (this._map.has(j)) {
						this._map.set(j, this._map.get(j) + 1)
					} else {
						this._map.set(j, 1)
					}
				}
			}
		}

		return _recommendations[this.findIndexOfMax()]
	}
}

export default StringQuery
