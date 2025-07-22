import React from 'react'
import PropTypes from 'prop-types'
import { addMonths, subMonths } from 'date-fns'
import CurrentData from './CurrentData'
import CalendarStruct from './CalendarStruct'
import styles from './Calendar.module.sass'

export default function Calendar({
	currentDate,
	onChangeDate,
	monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
	dayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	],
}) {
	const handlePrevMonth = () => onChangeDate(subMonths(currentDate, 1))
	const handleNextMonth = () => onChangeDate(addMonths(currentDate, 1))

	return (
		<div className={styles.CalendarContainer}>
			<CurrentData currentDate={currentDate} dayNames={dayNames} />
			<CalendarStruct
				currentDate={currentDate}
				monthNames={monthNames}
				onPrevMonth={handlePrevMonth}
				onNextMonth={handleNextMonth}
			/>
		</div>
	)
}

Calendar.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	onChangeDate: PropTypes.func.isRequired,
	monthNames: PropTypes.arrayOf(PropTypes.string),
	dayNames: PropTypes.arrayOf(PropTypes.string),
}
