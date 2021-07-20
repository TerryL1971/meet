Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given user hasn’t searched for any city
When user opens the app
Then user should see upcoming events each with a button with the text “show details”

Scenario: User can expand an event to see its details
Given user sees as list of upcoming events
When user clicks button with text “show details”
Then user sees details for that particular event

Scenario: User can collapse an event to hide its details
Given user has expanded the details of an event
When user clicks button with text “hide details”
Then user sees doesn’t see details for the particular event