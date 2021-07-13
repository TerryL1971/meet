import React, { Component } from 'react';

class NumberOfEvents extends Component {
	render() {
		return (
			<div className='NumberOfEvents'>
				<input
					id='event-number'
					type='number'
					defaultValue={this.props.number}
					onChange={(e) => this.props.updateNumber(e.target.value)}></input>
			</div>
		);
	}
}

export default NumberOfEvents;
