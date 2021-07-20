import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents/> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents eventsNumber={'8'} />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.event-number-input')).toHaveLength(1);
  });

  test('render text correctly', () => {
    const number = NumberOfEventsWrapper.state('numberDisplayed');
    expect(NumberOfEventsWrapper.find('.event-number-input').prop('value')).toBe(number);
  });

  test('change state when input changes', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 8
		});
	});
    
});