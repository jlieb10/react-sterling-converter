/////////////////////////////
// INITIAL STATE & REDUCER
/////////////////////////////

var initialState = {
  denoms: {
    twoer: {quantity: 0, value: 200},
    oner: {quantity: 0, value: 100},
    fiftyP: {quantity: 0, value: 50},
    twentyP: {quantity: 0, value: 20},
    tenP: {quantity: 0, value: 10},
    fiveP: {quantity: 0, value: 5},
    twoP: {quantity: 0, value: 2},
    oneP: {quantity: 0, value: 1},
  },
  inputP: 0,
  displayOutputP: 0,
  nanFlag: false,
  negFlag: false,
  largeNumFlag: false
};


function manageState (state = initialState, action) {
	switch (action.type) {
		case 'INPUT_CHANGE':
			return Object.assign({}, state, {
				inputP: action.input,
				displayOutputP: action.output,
				denoms: action.denoms
			});

		case 'RESET_FLAGS':
			return Object.assign({}, state, {
				nanFlag: false,
				negFlag: false,
				largeNumFlag: false
			});

		case 'RAISE_FLAG':
			return Object.assign({}, state, {
				[action.flagName]: true
			});

		default:
			return state;
	}
}

export default manageState