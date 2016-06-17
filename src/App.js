import React, { Component } from 'react';

//Pretend JSON store somewhere
var appData = {
  currencies: {
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

var Calculator = React.createClass({
  // Would call pretend JSON store
  // Returns data that app will modify (state, not props)
  getInitialState: function() {
    return appData;
  },

  // Simple function to reset flags when input is being changed
  resetFlags: function() {
  	this.setState({
  		nanFlag: false,
			negFlag: false,
			largeNumFlag: false
  	})
  },

  // Regex function to validate and sanitize input
  sanitizeInput: function(input) {
  	var sanitizedInput;
  	var validInputRgx = /(^£\d|^\d)(\d*?\.?\d*?)(\d?$|\.$|p$)/;
  	var usingPoundsRgx = /(£|\.)/;

  	this.resetFlags();

    // Does input match one of the following formats:
    // 1000, 10.00, 10., £10, £10.00
  	if (input.match(validInputRgx)) {
  		if (input.match(usingPoundsRgx)) {
        // Is input in pounds or pence? Change to pence if pounds (£ or .)
        sanitizedInput = input.replace(usingPoundsRgx, '');
        console.log(sanitizedInput);
  			sanitizedInput = parseInt(sanitizedInput) * 100;
        console.log(sanitizedInput);
  		} else {
  			sanitizedInput = parseInt(input)
  		}

      // Is input small enough to calculate?
  		if (sanitizedInput > 9007199254740991) {
        // Raise flag and return maximum calculatable amount if not
  			this.setState({largeNumFlag: true});
  			sanitizedInput = 9007199254740991;
  		}

  		return sanitizedInput;
  	}

    // Tell user input is invalid
  	this.setState({nanFlag: true});
  	return 0;
  },

  handleInputChange: function(e) {
  	var currency; // To be used in loop
  	var inputP = e.target.value || '0'; // User input, defaults to 0 for validation and sanitization purposes
  	var outputP = this.sanitizeInput(inputP); // Validated and sanitized user input
  	var remainingP = outputP; // Var used to calculate remaining money in loop
  	var updateCurrencies = {}; // Object used to duplicate and then update state

    // Loop through currencies (from largest to smallest)
  	for (currency in this.state.currencies) {
      // Duplicate currency in new object
  		updateCurrencies[currency] = this.state.currencies[currency] || {};
      // Find max quantity of given currency that remaining amount of money can be turned into
  		updateCurrencies[currency].quantity = Math.floor(remainingP/updateCurrencies[currency].value);
      // Update remaining amount of money by subtracting the value of the above currency
  		remainingP = remainingP - (updateCurrencies[currency].quantity * updateCurrencies[currency].value)	
  	}

    // Update currencies
  	this.setState({
  		currencies: updateCurrencies,
  		inputP: e.target.value,
      displayOutputP: outputP / 100
  	})
  },

  render: function() {
    return (
      <div className="calculator">
      <h1>Change Minimizer</h1>
      <h2>Simple implementation of an algorithm that should be used at checkout points at groceries to give the minimum amount of coins back to a customer for a given value</h2>
      <form className="currencyInput">
        <input
          type="text"
          placeholder="Feed Me"
          value={this.state.inputP}
          onChange={this.handleInputChange}
        />
      </form>
      <div className="currencyOutput">
      <h2>£{this.state.displayOutputP}</h2>
      </div>
        <div>
		      twoer: {this.state.currencies.twoer.quantity}<br />
		      oner: {this.state.currencies.oner.quantity}<br />
		      fiftyP: {this.state.currencies.fiftyP.quantity}<br />
		      twentyP: {this.state.currencies.twentyP.quantity}<br />
		      tenP: {this.state.currencies.tenP.quantity}<br />
		      fiveP: {this.state.currencies.fiveP.quantity}<br />
		      twoP: {this.state.currencies.twoP.quantity}<br />
		      oneP: {this.state.currencies.oneP.quantity}
		       <br /><br />

		       <div className={this.state.largeNumFlag ? "show" : "hide"}>
		       	LargeNumFlag
		       </div>

		       <div className={this.state.nanFlag ? "show" : "hide"}>
		       	nanNumFlag
		       </div>

		       <div className={this.state.negFlag ? "show" : "hide"}>
		       	negNumFlag
		       </div>
        </div>
        </div>

      
    );
  }
});

export default class App extends Component {
	render() {
		return (
			<div className="main">
				<Calculator app-data={appData}/>
			</div>
		);
	}
}

