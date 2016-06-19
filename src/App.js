import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Machine from './State'
import { createStore } from 'redux';
import ImageUtil from './ImageUtil'

var store = createStore(Machine);

// Logicless text at the top of the file
var Title = React.createClass ({
  render: function() {
    return (
      <div className="title">
      <h1>Coin Minimizer</h1>
      <h2>A simple calculator used to show the fewest number of coins needed to represent a given amount</h2>
      <div className="key">
        <span>'92', '.92', and '£0.92' will be understood as '.92p'</span>
        <span>'92.00' and '£92.00' will be understood as '£92.00'</span>
      </div>
    </div>
    )
  }
})

// Warning messages for bad input
var Flags = React.createClass({
  render: function() {
    return (
      <div className="flags">
        <span className={ store.getState().nanFlag ? 'show' : 'hide' }>
          Please ensure your input is valid
        </span>
        <span className={ store.getState().largeNumFlag ? 'show' : 'hide' }>
          The largest allowed value is £90071992547409.91.
        </span>
      </div>
    );
  }
})

// Component to render a sanitized string describe the right number of coins needed
var Denoms = React.createClass({
  createDescription: function() {
    var description = '';
    var denoms = store.getState().denoms;
    for (var denom in denoms) {
      if (denoms[denom].quantity > 1) {
        description += denoms[denom].quantity + ' ' + denom + ' coins, '
      }
      if (denoms[denom].quantity === 1) {
        description += denoms[denom].quantity + ' ' + denom + ' coin, '
      }
    }
    return description.replace('twoer', 'two pound') // upgrade sentence quality
      .replace('oner', 'one pound') // upgrade sentence quality
      .replace(/P/g, ' pence') // upgrade sentence quality
      .replace(/, $/, '') // remove trailing comma
      .replace(/,([^,]*)$/, ', and ' + '$1'); // replace last comma with 'and'
  },

  render: function() {
    return (
      <span>
      { store.getState().displayOutputP > 0 ? '£' + store.getState().displayOutputP + ' can be represented using ' + this.createDescription() : ''}
      </span>
    );
  }
})

// Main logic component to validate and sanitize user input and update state
var MainFields = React.createClass({
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
  	var updatedenoms = Object.assign({}, store.getState().denoms); // Object used to duplicate and then update state

    // Loop through denoms (from largest to smallest)
  	for (var currency in store.getState().denoms) {
      var currentValue = store.getState().denoms[currency].value
      var newQuantity = Math.floor(remainingP/currentValue);
      updatedenoms[currency].quantity = newQuantity;
      remainingP = remainingP - (newQuantity * currentValue);
  	}

    store.dispatch({
      type: 'INPUT_CHANGE',
      input: e.target.value,
      output: (outputP / 100).toFixed(2),
      denoms: updatedenoms
    });
  },

  render: function() {
    return (
      <div className="calculator">
        <Title />
        <form className="currency-input">
          <input className="currency-input-field"
            type="text"
            value={store.getState().inputP}
            onChange={this.handleInputChange}
          />
        </form>
        <div className="currency-output">
          <h2>£{store.getState().displayOutputP}</h2>
        </div>        
        <Denoms />
        <Flags />
      </div>
    );
  }
});

var renderApp = function() {
  ReactDOM.render(
    <MainFields />, 
    document.getElementById('root')
  )
};
// Initial render
renderApp();
// Re-render on state change
store.subscribe(renderApp);