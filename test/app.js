import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { Flags, Calculator, Denoms } from '../src/App';

describe('Flags', function() {
	var mountedComponent = render(<Flags />)

	it('contains the correct class', function() {
		expect(mountedComponent.find('.flags').length).toEqual(1);
	});

	it('has children that are initially hidden', function() {
		expect(mountedComponent.find('.hide').length).toEqual(2);
	});

	it('has children that can be shown', function() {
		console.log(mountedComponent.children().length)
		expect((mountedComponent.children().removeClass('hide').addClass('show')).find('.show').length).toEqual(2);
	});
});