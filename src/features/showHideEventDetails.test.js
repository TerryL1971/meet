import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from "../Event";
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, (test) => {
	test('An event element is collapsed by default', ({ given, when, then }) => {
		given('user hasn’t searched for any city', () => {});
		let AppWrapper;
		when('user opens the app', () => {
			AppWrapper = mount(<App />);
		});

		then(
			'user should see upcoming events each with a button with the text “show details”',
			() => {
				AppWrapper.update();
				expect(AppWrapper.find('.details-btn').at(0).text()).toBe(
					'Show Details'
				);
			}
		);
	});

	test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    given('user sees as list of upcoming events', () => {
      AppWrapper = mount(<App />);
    });

		when('user clicks button with text “show details”', () => {
			AppWrapper.update();
			AppWrapper.find('.details-btn').at(0).simulate('click');
		});

		then('user sees details for that particular event', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.event__Details')).toBeTruthy();
		});
	});

	test('User can collapse an event to hide its details', ({ given, when, then }) => {
		let AppWrapper;
		given('user has expanded the details of an event', () => {
			AppWrapper = mount(<App />);
		});

		when('user clicks button with text “hide details”', () => {
			AppWrapper.update();
			AppWrapper.find('.details-btn').at(0).simulate('click');
			AppWrapper.update();
			AppWrapper.find('.details-btn').at(0).simulate('click');
		});

		then('user sees doesn’t see details for the particular event', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.details-btn').at(0).text()).toBe('Show Details');
			expect(AppWrapper.find('.event__Details')).toHaveLength(0);
		});
	});
});