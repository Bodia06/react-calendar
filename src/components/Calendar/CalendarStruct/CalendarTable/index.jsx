import React, { useMemo } from 'react'
import {
	getDaysInMonth,
	startOfMonth,
	getDay,
	isToday,
	isAfter,
	isBefore,
	isSameDay,
} from 'date-fns'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './CalendarTable.module.sass'

export default function CalendarTable({
	currentDate,
	dayNames,
	onSelectDate,
	rangeStart,
	rangeEnd,
	holidays,
	videoDates,
}) {
	const daysOfWeek = dayNames.map((d) => d[0])

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

	const isInRange = (date) => {
		if (rangeStart && rangeEnd) {
			return (
				(isAfter(date, rangeStart) || isSameDay(date, rangeStart)) &&
				(isBefore(date, rangeEnd) || isSameDay(date, rangeEnd))
			)
		}
		return false
	}

	const isHoliday = (date) =>
		holidays.some((holiday) => isSameDay(new Date(holiday), date))

	const isVideoDate = (date) =>
		videoDates.some((v) => isSameDay(new Date(v.date), date))

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
						return <div key={index} className={styles.EmptyCell} />
					}
					const dateObj = new Date(
						currentDate.getFullYear(),
						currentDate.getMonth(),
						day
					)

					const isTodayCell = isToday(dateObj)
					const isRangeStart = rangeStart && isSameDay(dateObj, rangeStart)
					const isRangeEnd = rangeEnd && isSameDay(dateObj, rangeEnd)
					const isInRangeCell = isInRange(dateObj)
					const isHolidayCell = isHoliday(dateObj)
					const isVideoCell = isVideoDate(dateObj)

					const classNameDateStyles = classNames(styles.DayCell, {
						[styles.Today]: isTodayCell,
						[styles.Selected]: isInRangeCell || isRangeStart || isRangeEnd,
						[styles.RangeStart]: isRangeStart,
						[styles.RangeEnd]: isRangeEnd,
						[styles.Holiday]: isHolidayCell,
						[styles.VideoDate]: isVideoCell,
					})

					return (
						<div
							key={index}
							className={classNameDateStyles}
							onClick={() => onSelectDate(dateObj)}
							title={
								isHolidayCell ? 'Holiday' : isVideoCell ? 'Video Available' : ''
							}
							role='button'
							tabIndex={0}
							onKeyDown={(e) =>
								(e.key === 'Enter' || e.key === ' ') && onSelectDate(dateObj)
							}
						>
							<div>{day}</div>
							{isHolidayCell && <div className={styles.HolidayDot} />}
						</div>
					)
				})}
			</div>
		</div>
	)
}

CalendarTable.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	dayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelectDate: PropTypes.func.isRequired,
	rangeStart: PropTypes.instanceOf(Date),
	rangeEnd: PropTypes.instanceOf(Date),
	holidays: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
	),
	videoDates: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.instanceOf(Date).isRequired,
			url: PropTypes.string.isRequired,
		})
	),
}
