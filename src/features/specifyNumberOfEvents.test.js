import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('when user has not specified a number of thirty-two  is the default number', ({ given, when, then }) => {
    given('user has not specified a number of events', () => {
      //no code here nothing has happened
    });

    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    let NumberOfEventsWrapper;
    then('user will see a list of thirty-two events', () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents eventsNumber={'32'} />);
      expect(NumberOfEventsWrapper.state('numberDisplayed')).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('user wants to see a specific number of Events', () => {
      AppWrapper = mount(<App />);
    });

    let NumberOfEventsWrapper;
    when('user change the number of events', () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents eventsNumber={() => { }} />);

      AppWrapper.setState({ numberDisplayed: "32", locations: "all" });
      const eventObject = { target: { value: 2 } };
      NumberOfEventsWrapper.find(".event-number-input").simulate('change', eventObject);
    });

    then('user will see the chosen number of events', () => {
      expect(NumberOfEventsWrapper.state('numberDisplayed')).toBe(2);
    });
  });
});