import React, { Component } from 'react'
import Calendar from './components/Calendar'
import './App.css'
import loaderHolidays from './api/loaderHolidays'

const videoDates = [
	{
		date: new Date(2025, 6, 23),
		url: 'https://www.youtube.com/watch?v=MCCJn90gplQ&list=RDMCCJn90gplQ&start_radio=1',
	},
	{
		date: new Date(2025, 6, 25),
		url: 'https://www.youtube.com/watch?v=tqUUNMq71vk',
	},
]

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
					videoDates={videoDates}
				/>
			</div>
		)
	}
}
