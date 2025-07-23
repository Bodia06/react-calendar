import React, { Component } from 'react'
import Calendar from './components/Calendar'
import './App.css'
import loaderHolidays from './api/loaderHolidays'
import CONSTANS from './constans'

const { videoDates, monthNames, dayNames } = CONSTANS

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

	render() {
		const { date, holidays, error, isFetching } = this.state

		return (
			<>
				{isFetching && <div className='loading'>Loading holidays...</div>}
				{error && <div className='error'>Error: {error}</div>}
				{!isFetching && !error && (
					<Calendar
						currentDate={date}
						onChangeDate={this.handleChangeDate}
						holidays={holidays}
						monthNames={monthNames}
						dayNames={dayNames}
						videoDates={videoDates}
					/>
				)}
			</>
		)
	}
}
