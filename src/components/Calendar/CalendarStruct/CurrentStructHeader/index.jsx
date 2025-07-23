import React from 'react'
import styles from './CurrentStractHeader.module.sass'
import PropTypes from 'prop-types'

function CurrentStructHeader({ monthName, year, onPrevMonth, onNextMonth }) {
	return (
		<div className={styles.CalendarStructHeader}>
			<button className={styles.CalendarStructHeaderBtn} onClick={onPrevMonth}>
				{'<'}
			</button>
			<p className={styles.CalendarStructHeaderTitle}>
				{monthName} {year}
			</p>
			<button className={styles.CalendarStructHeaderBtn} onClick={onNextMonth}>
				{'>'}
			</button>
		</div>
	)
}

CurrentStructHeader.propTypes = {
	monthName: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
	onPrevMonth: PropTypes.func.isRequired,
	onNextMonth: PropTypes.func.isRequired,
}

export default CurrentStructHeader
