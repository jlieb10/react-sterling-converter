import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Machine from './State'
import { createStore } from 'redux';
import ImageUtil from './ImageUtil'

var store = createStore(Machine);

var Flags = React.createClass({
  render: function() {
    return (
      <div className="flags">
        { store.getState().nanFlag ? "True" : "False" }
        { store.getState().negFlag ? "True" : "False" }
        { store.getState().largeNumFlag ? "True" : "False" }
      </div>
    );
  }
})

var Currencies = React.createClass({
  getImageString: function() {
    var images = '';
    var currencies = store.getState().currencies;
    for (var currency in currencies) {
      if (currencies[currency].quantity > 0) {
        images += ImageUtil(currency, store.getState().currencies[currency].quantity);
      }   
    }
    return {__html: images};
  },

  render: function() {
    var imageString = this.getImageString();

    return (
      <div>
          <div dangerouslySetInnerHTML={imageString}/>
          twoer: {store.getState().currencies.twoer.quantity}<br />
          oner: {store.getState().currencies.oner.quantity}<br />
          fiftyP: {store.getState().currencies.fiftyP.quantity}<br />
          twentyP: {store.getState().currencies.twentyP.quantity}<br />
          tenP: {store.getState().currencies.tenP.quantity}<br />
          fiveP: {store.getState().currencies.fiveP.quantity}<br />
          twoP: {store.getState().currencies.twoP.quantity}<br />
          oneP: {store.getState().currencies.oneP.quantity}
           <br /><br />
      </div>
    );
  }
})

var MainFields = React.createClass({
  // Would call pretend JSON store
  // Returns data that app will modify (state, not props)
  getInitialState: function() {
    return store.getState();
  },

  // Regex function to validate and sanitize input
  sanitizeInput: function(input) {
  	var sanitizedInput;
  	var validInputRgx = /(^£\d|\.\d|^\d)(\d*?\.?\d*?)(\d?$|\.$|p$)/;
  	var usingPoundsRgx = /(£|\.)/;

  	store.dispatch({type: 'RESET_FLAGS'});

    // Does input match one of the following formats:
    // 1000, 10.00, 10., £10, £10.00, 1000p, .10p, .10
  	if (input.match(validInputRgx)) {
  		if (input.match(usingPoundsRgx)) {
        // Is input in pounds or pence? Change to pence if pounds (£ or .)
        sanitizedInput = input.replace(/£/, '');
  			sanitizedInput = parseInt(sanitizedInput) * 100;
  		} else {
  			sanitizedInput = parseInt(input)
  		}

      // Is input small enough to calculate?
  		if (sanitizedInput > 9007199254740991) {
        // Raise flag and return maximum calculatable amount if not
  			//this.setState({largeNumFlag: true});
        store.dispatch({
          type: 'RAISE_FLAG', 
          flagName: 'largeNumFlag'
        });

  			sanitizedInput = 9007199254740991;
  		}

  		return sanitizedInput;
  	}

    // Tell user input is invalid
  	// this.setState({nanFlag: true});
    store.dispatch({
      type: 'RAISE_FLAG',
      flagName: 'nanFlag'
    });

  	return 0;
  },

  handleInputChange: function(e) {
  	var inputP = e.target.value || '0'; // User input, defaults to 0 for validation and sanitization purposes
  	var outputP = this.sanitizeInput(inputP); // Validated and sanitized user input
  	var remainingP = outputP; // Var used to calculate remaining money in loop
  	var updateCurrencies = Object.assign({}, store.getState().currencies); // Object used to duplicate and then update state

    // Loop through currencies (from largest to smallest)
  	for (var currency in store.getState().currencies) {
      var currentValue = store.getState().currencies[currency].value
      var newQuantity = Math.floor(remainingP/currentValue);
      updateCurrencies[currency].quantity = newQuantity;
      remainingP = remainingP - (newQuantity * currentValue);
  	}

    store.dispatch({
      type: 'INPUT_CHANGE',
      input: e.target.value,
      output: (outputP / 100).toFixed(2),
      currencies: updateCurrencies
    });
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
            value={store.getState().inputP}
            onChange={this.handleInputChange}
          />
        </form>
        <div className="currencyOutput">
          <h2>£{store.getState().displayOutputP}</h2>
        </div>
        
        <Currencies />
        <Flags />
      </div>
    );
  }
});

var render = function() {
  ReactDOM.render(
    <MainFields />, 
    document.getElementById('root')
  )
};

render();
store.subscribe(render);

