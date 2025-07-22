import React, { useMemo } from 'react'
import {
	getDaysInMonth,
	startOfMonth,
	getDay,
	isToday,
	setDate,
} from 'date-fns'
import styles from './CalendarTable.module.sass'

const CalendarTable = ({ currentDate }) => {
	const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

	const calendarCells = useMemo(() => {
		const daysInMonth = getDaysInMonth(currentDate)
		const startDay = getDay(startOfMonth(currentDate))

		const cells = Array(startDay).fill(null)

		for (let day = 1; day <= daysInMonth; day++) {
			cells.push(day)
		}

		while (cells.length % 7 !== 0) {
			cells.push(null)
		}

		return cells
	}, [currentDate])

	return (
		<div className={styles.CalendarWrapper}>
			<div className={styles.WeekDays}>
				{daysOfWeek.map((day, i) => (
					<div key={i} className={styles.WeekDay}>
						{day}
					</div>
				))}
			</div>
			<div className={styles.DaysGrid}>
				{calendarCells.map((day, index) => {
					if (day === null) {
						return <div key={index} className={styles.EmptyCell}></div>
					}

					const dateObj = setDate(currentDate, day)
					const isTodayCell = isToday(dateObj)

					return (
						<div
							key={index}
							className={`${styles.DayCell} ${isTodayCell ? styles.Today : ''}`}
						>
							{day}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default CalendarTable
