import StringQuery from '../StringQuery'

describe('StringQuery class is a client side string query helper', () => {
	it('should have a method isOfIterableTypes that returns true if provided inputs are of a string and string array type', () => {
		var StringQueryInstance1 = new StringQuery(['yup', 'yoo'])
		var StringQueryInstance2 = new StringQuery([1, 2, 3])
		var StringQueryInstance3 = new StringQuery(['yooo', 'nope'])
		var StringQueryInstance4 = new StringQuery(['yooo', 'nope'])

		expect(StringQueryInstance1.isOfIterableTypes('yolo')).toBe(true)
		expect(StringQueryInstance2.isOfIterableTypes('nope')).toBe(false)
		expect(StringQueryInstance3.isOfIterableTypes(1)).toBe(false)
		expect(StringQueryInstance4.isOfIterableTypes({})).toBe(false)
	})

	it('should have a method findIndexOfMax that finds index position of a max value in a Map data structure', () => {
		var StringQueryInstance = new StringQuery()

		// set inner Map instance
		StringQueryInstance._map.set(1, 0)
		StringQueryInstance._map.set(2, 3)
		StringQueryInstance._map.set(3, 2)

		expect(StringQueryInstance.findIndexOfMax()).toBe(2)
	})

	it('should have a method findByDynamic that recommends a closest common subsquence as a string from provided inputs', () => {
		var StringQueryInstance = new StringQuery(['fort', 'fosh'], {
			useRegex: true
		})

		expect(StringQueryInstance.findByDynamic(' fis s')).toBe('fosh')
	})

	it('should have a method findByDynamic that handles string and string array inputs where each string array input at an index can be less than comparing string', () => {
		var StringQueryInstance = new StringQuery(['for', 'foshs'])

		expect(StringQueryInstance.findByDynamic('fish')).toBe('foshs')
	})

	it('should have a method findByDynamic that when called throws an error on incorrect input types', () => {
		var StringQueryInstance = new StringQuery([1, 2])

		try {
			StringQueryInstance.findByDynamic('ohh no')
		} catch (error) {
			expect(error).toBeInstanceOf(Error)
		}
	})
})
