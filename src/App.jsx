import React, { Component } from 'react'
import Calendar from './components/Calendar'
import './App.css'
import loaderHolidays from './api/loaderHolidays'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			date: new Date(),
			holidays: [],
			error: null,
			isFetching: false,
		}
	}

	componentDidMount() {
		this.setState({ isFetching: true })

		loaderHolidays()
			.then((data) => {
				const parsedHolidays = data.map((d) => new Date(d))
				this.setState({ holidays: parsedHolidays })
			})
			.catch((error) => this.setState({ error: error.message }))
			.finally(() => this.setState({ isFetching: false }))
	}

	handleChangeDate = (newDate) => {
		this.setState({ date: newDate })
	}

	render() {
		const { date, holidays, error, isFetching } = this.state

		if (isFetching) {
			return <div className='loading'>Loading holidays...</div>
		}

		if (error) {
			return <div className='error'>Error: {error}</div>
		}

		return (
			<div className='app-container'>
				<Calendar
					currentDate={date}
					onChangeDate={this.handleChangeDate}
					holidays={holidays}
					monthNames={[
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec',
					]}
					dayNames={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
				/>
			</div>
		)
	}
}
