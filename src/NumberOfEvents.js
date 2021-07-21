import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberDisplayed: 32,
		event: [],
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    

    if (value < 1) {
      return this.setState({
        numberDisplayed: '',
      });
    } else if (value > 32) {
      return this.setState({
        numberDisplayed: '',
      });
    } else {
      this.setState({
        numberDisplayed: value,
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

        
      </div>

    );
  }
}

export default NumberOfEvents;