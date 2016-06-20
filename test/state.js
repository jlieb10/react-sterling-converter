// import expect from 'expect'
// import State from '../src/Reducer'

// describe('actions', function () {
// 	it('should update currencies'), function() {
// 		var initialState = {
// 		  denoms: {
// 		    twoer: {quantity: 0, value: 200},
// 		    oner: {quantity: 0, value: 100},
// 		    fiftyP: {quantity: 0, value: 50},
// 		    twentyP: {quantity: 0, value: 20},
// 		    tenP: {quantity: 0, value: 10},
// 		    fiveP: {quantity: 0, value: 5},
// 		    twoP: {quantity: 0, value: 2},
// 		    oneP: {quantity: 0, value: 1},
// 		  },
// 		  inputP: 0,
// 		  displayOutputP: 0,
// 		  nanFlag: false,
// 		  negFlag: false,
// 		  largeNumFlag: false
// 		};

// 		var newDenoms = {
// 		  denoms: {
// 		    twoer: {quantity: 1, value: 200},
// 		    oner: {quantity: 2, value: 100},
// 		    fiftyP: {quantity: 3, value: 50},
// 		    twentyP: {quantity: 4, value: 20},
// 		    tenP: {quantity: 5, value: 10},
// 		    fiveP: {quantity: 6, value: 5},
// 		    twoP: {quantity: 7, value: 2},
// 		    oneP: {quantity: 8, value: 1},
// 		  }
// 		};

// 		expect(
// 			State(initialState, {
// 		      type: 'INPUT_CHANGE',
// 		      denoms: newDenoms
// 		    })
// 		).toEqual({
// 		  denoms: {
// 		    twoer: {quantity: 1, value: 200},
// 		    oner: {quantity: 2, value: 100},
// 		    fiftyP: {quantity: 3, value: 50},
// 		    twentyP: {quantity: 4, value: 20},
// 		    tenP: {quantity: 5, value: 10},
// 		    fiveP: {quantity: 6, value: 5},
// 		    twoP: {quantity: 7, value: 2},
// 		    oneP: {quantity: 8, value: 1},
// 		  },
// 		  inputP: 0,
// 		  displayOutputP: 0,
// 		  nanFlag: false,
// 		  negFlag: false,
// 		  largeNumFlag: false
// 		})
// 	}
// });