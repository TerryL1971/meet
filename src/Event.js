import React, { Component } from "react";

class Event extends Component {
	state = {
			buttonLabel: 'Show Details',
			datetime: '',
			date: '',
			time: '',
		};
	

	componentDidMount() {
		const optionsDate = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		const optionsTime = {
			hour: '2-digit',
			minute: '2-digit',
		};
		const time = new Date(this.props.event.start.dateTime).toLocaleTimeString(
			'en-US',
			optionsTime
		);
		const date = new Date(this.props.event.start.dateTime).toLocaleDateString(
			'en-US',
			optionsDate
		);
		this.setState({ date, time });
	}

	handleClick = () => {
		this.state.buttonLabel === 'Show Details'
			? this.setState({ buttonLabel: 'Hide Details' })
			: this.setState({ buttonLabel: 'Show Details' });
	};

	render() {
		const { buttonLabel, time, date } = this.state;
		return (
			<div className='event'>
				<label className='location'>
					<i style={{ marginRight: '5px' }} className='bi bi-geo-alt-fill'></i>
					{this.props.event.location}
				</label>
				<h2>{this.props.event.summary}</h2>

				<label className='date-time'>
					<i style={{ marginRight: '5px' }} className='bi bi-calendar3'></i>
					{date} - Starting at:  {time}
				</label>

				{buttonLabel === 'Hide Details' ? (
					<div className='event__Details'>
						<h3 className='about-event'>About Event</h3>
						<label className='description'>{this.props.event.description}</label>
					</div>
				) : null}

				<button
					className='details-btn'
					onClick={() => {
						this.handleClick();
					}}>
					{buttonLabel}
				</button>
			</div>
		);
	}
}
export default Event;