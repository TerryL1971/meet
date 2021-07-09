import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
	beforeAll(() => {
		NumberOfEventsWrapper = shallow(<NumberOfEvents eventsNumber={'10'} />);
	});

	test('renders input field for number of events', () => {
		expect(NumberOfEventsWrapper.find('#event-number')).toHaveLength(1);
	});

	test('has a default input value', () => {
		const number = NumberOfEventsWrapper.instance().props.numberOfEvents;
		expect(NumberOfEventsWrapper.find('#event-number').props().value).toBe(
			number
		);
	});

});