import React, { Component } from 'react';
import Event from './Event';


class EventList extends Component {
  render() {
    return (
      <ul className="EventList">
        <li key={event.id}>
          <Event event={event} />
        </li>
      </ul>
    );
  }
}


export default Event;