import React from 'react'
import { getDay, getDate } from 'date-fns'
import PropTypes from 'prop-types'
import styles from './CurrentData.module.sass'

export default function CurrentData({ currentDate, dayNames }) {
	const weekDay = dayNames[getDay(currentDate)]
	const date = getDate(currentDate)

	return (
		<div className={styles.CurrentDataContainer}>
			<h2 className={styles.CurrentDataDay}>{weekDay}</h2>
			<h3 className={styles.CurrentDataDate}>{date}</h3>
		</div>
	)
}

CurrentData.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	dayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}
