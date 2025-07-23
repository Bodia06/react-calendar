export default function loaderHolidays() {
	return fetch('/data/holidays.json').then((response) => {
		if (!response.ok) {
			throw new Error('Failed to load holidays')
		}
		return response.json()
	})
}
