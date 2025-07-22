import React from 'react'
import PropTypes from 'prop-types'
import { getMonth, getYear } from 'date-fns'
import styles from './CalendarStruct.module.sass'
import CurrentStractHeader from './CurrentStractHeader'
import CalendarTable from './CalendarTable'

export default function CalendarStruct({
	currentDate,
	monthNames,
	onPrevMonth,
	onNextMonth,
}) {
	const monthName = monthNames[getMonth(currentDate)]
	const year = getYear(currentDate)

	return (
		<div className={styles.CalendarStructContainer}>
			<CurrentStractHeader
				monthName={monthName}
				year={year}
				onPrevMonth={onPrevMonth}
				onNextMonth={onNextMonth}
			/>
			<CalendarTable currentDate={currentDate} />
		</div>
	)
}

CalendarStruct.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	monthNames: PropTypes.arrayOf(PropTypes.string).isRequired,
	onPrevMonth: PropTypes.func.isRequired,
	onNextMonth: PropTypes.func.isRequired,
}
