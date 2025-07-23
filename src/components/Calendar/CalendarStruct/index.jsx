import React from 'react'
import PropTypes from 'prop-types'
import { getMonth, getYear } from 'date-fns'
import styles from './CalendarStruct.module.sass'
import CurrentStructHeader from './CurrentStructHeader/index.jsx'
import CalendarTable from './CalendarTable/index.jsx'

export default function CalendarStruct({
	currentDate,
	monthNames,
	dayNames,
	onPrevMonth,
	onNextMonth,
	onSelectDate,
	rangeStart,
	rangeEnd,
	holidays,
	videoDates,
}) {
	const monthName = monthNames[getMonth(currentDate)]
	const year = getYear(currentDate)

	return (
		<div className={styles.CalendarStructContainer}>
			<CurrentStructHeader
				monthName={monthName}
				year={year}
				onPrevMonth={onPrevMonth}
				onNextMonth={onNextMonth}
			/>
			<CalendarTable
				currentDate={currentDate}
				dayNames={dayNames}
				onSelectDate={onSelectDate}
				rangeStart={rangeStart}
				rangeEnd={rangeEnd}
				holidays={holidays}
				videoDates={videoDates}
			/>
		</div>
	)
}

CalendarStruct.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	monthNames: PropTypes.arrayOf(PropTypes.string).isRequired,
	dayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
	onPrevMonth: PropTypes.func.isRequired,
	onNextMonth: PropTypes.func.isRequired,
	onSelectDate: PropTypes.func.isRequired,
	rangeStart: PropTypes.instanceOf(Date),
	rangeEnd: PropTypes.instanceOf(Date),
	holidays: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
	videoDates: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.instanceOf(Date).isRequired,
			url: PropTypes.string.isRequired,
		})
	),
}
