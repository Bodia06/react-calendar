import React from 'react'
import PropTypes from 'prop-types'
import styles from './CurrentStractHeader.module.sass'

export default function CurrentStractHeader({
	monthName,
	year,
	onPrevMonth,
	onNextMonth,
}) {
	return (
		<div className={styles.CalendarStructHeader}>
			<button className={styles.CalendarStructHeaderBtn} onClick={onPrevMonth}>
				{`<`}
			</button>
			<p className={styles.CalendarStructHeaderTitle}>
				{monthName} {year}
			</p>
			<button className={styles.CalendarStructHeaderBtn} onClick={onNextMonth}>
				{`>`}
			</button>
		</div>
	)
}

CurrentStractHeader.propTypes = {
	monthName: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
	onPrevMonth: PropTypes.func.isRequired,
	onNextMonth: PropTypes.func.isRequired,
}
