export default function loaderHolidays() {
	return fetch('/holidays.json').then((response) => {
		if (!response.ok) {
			throw new Error('Failed to load holidays')
		}
		return response.json()
	})
}
