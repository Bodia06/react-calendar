import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isSameDay, startOfMonth, addMonths, subMonths } from 'date-fns'
import CurrentData from './CurrentData'
import CalendarStruct from './CalendarStruct'
import styles from './Calendar.module.sass'

export default function Calendar({
	currentDate,
	onChangeDate,
	holidays = [],
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
	const [rangeStart, setRangeStart] = useState(null)
	const [rangeEnd, setRangeEnd] = useState(null)
	const [theme, setTheme] = useState('day')

	const [displayMonth, setDisplayMonth] = useState(startOfMonth(currentDate))

	useEffect(() => {
		setDisplayMonth(startOfMonth(currentDate))
	}, [currentDate])

	const handlePrevMonth = () => {
		setDisplayMonth(subMonths(displayMonth, 1))
	}

	const handleNextMonth = () => {
		setDisplayMonth(addMonths(displayMonth, 1))
	}

	const handleSelectDate = (date) => {
		if (rangeStart && !rangeEnd && isSameDay(date, rangeStart)) {
			setRangeStart(null)
			return
		}
		if (rangeStart && rangeEnd) {
			if (isSameDay(date, rangeStart)) {
				setRangeStart(null)
				return
			}
			if (isSameDay(date, rangeEnd)) {
				setRangeEnd(null)
				return
			}
			setRangeStart(date)
			setRangeEnd(null)
			return
		}
		if (rangeStart && !rangeEnd) {
			if (date < rangeStart) {
				setRangeEnd(rangeStart)
				setRangeStart(date)
			} else if (isSameDay(date, rangeStart)) {
				setRangeStart(null)
			} else {
				setRangeEnd(date)
			}
			return
		}
		setRangeStart(date)
	}

	const toggleTheme = () => {
		setTheme(theme === 'day' ? 'night' : 'day')
	}

	return (
		<div className={`${styles.CalendarContainer} ${styles[theme]}`}>
			<button className={styles.ThemeToggleBtn} onClick={toggleTheme}>
				{theme === 'day' ? 'Switch to Night' : 'Switch to Day'}
			</button>
			<CurrentData currentDate={currentDate} dayNames={dayNames} />
			<CalendarStruct
				currentDate={displayMonth}
				monthNames={monthNames}
				dayNames={dayNames}
				onPrevMonth={handlePrevMonth}
				onNextMonth={handleNextMonth}
				onSelectDate={handleSelectDate}
				rangeStart={rangeStart}
				rangeEnd={rangeEnd}
				holidays={holidays}
				selectedDate={currentDate}
			/>
		</div>
	)
}

Calendar.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	onChangeDate: PropTypes.func.isRequired,
	holidays: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
	monthNames: PropTypes.arrayOf(PropTypes.string),
	dayNames: PropTypes.arrayOf(PropTypes.string),
}
