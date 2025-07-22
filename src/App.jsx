import React, { useState } from 'react'
import Calendar from './components/Calendar'
import './App.css'

export default function App() {
	const [date, setDate] = useState(new Date())

	return (
		<div>
			<Calendar
				currentDate={date}
				onChangeDate={setDate}
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
