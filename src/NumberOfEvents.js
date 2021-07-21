import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberDisplayed: 32,
		event: [],
		errorText: '',
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    

    if (value < 1) {
      return this.setState({
        numberDisplayed: '',
				errorText: 'Please select a number between 1 and 32',
      });
    } else if (value > 32) {
      return this.setState({
        numberDisplayed: '',
				errorText: 'Please select a number between 1 and 32',
      });
    } else {
      this.setState({
        numberDisplayed: value,
				errorText: '',
      });
    }
		this.props.updateEvents(null, value);
  };


  render() {
    const numberDisplayed = this.state.numberDisplayed;
		
    return (

      <div className="NumberOfEvents ">

        <div className="py-3 d-flex flex-row-reverse align-items-center">
					<span>Number of Events: </span>
          <input
            type="number"
            className="event-number-input rounded text-align-center"
            value={numberDisplayed}
            onChange={this.handleInputChanged} />
        </div>
			
				<div>
          <ErrorAlert text={this.state.errorText} />
        </div>
        
      </div>

    );
  }
}

export default NumberOfEvents;