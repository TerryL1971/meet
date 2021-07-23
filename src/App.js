import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentCity: "all",
    showWelcomeScreen: undefined
  }

  updateNumber = (numberOfEvents) => {
    this.setState({
        numberOfEvents: numberOfEvents
    });
  } 

  async componentDidMount() {
    this.mounted = true;
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ events, locations: extractLocations(events) });
        } 
      });
    } 
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const { currentCity, numberDisplayed } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberDisplayed);
        this.setState({
          events: filteredEvents,
          currentCity: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentCity === "all"
            ? events
            : events.filter((event) => event.location === currentCity);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberDisplayed: eventCount,
        });
      });
    }
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map(location => {
      const number = events.filter(event => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    const { locations, numberOfEvents, numberDisplayed, events } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    console.log(this.state.numberOfEvents)
    console.log(events)
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberDisplayed={numberDisplayed} updateEvents={this.updateEvents} /><br />
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          {events.length > 0 &&  <EventGenre events={events}  />}
            <ResponsiveContainer height={300} >
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="number of events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <br />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;