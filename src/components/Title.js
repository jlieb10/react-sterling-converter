import React, { Component } from 'react';

/////////////////////////////
// STATELESS COMPONENT
// EXPLANATION OF APP
/////////////////////////////
var Title;
export default Title =
  React.createClass ({
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
  });
