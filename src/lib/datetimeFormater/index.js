const months = [
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
	'December'
];

const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/**
 * @param {string} s
 * @param {boolean} detail
 */
export const formatDatetime = (s, detail = true, withSecond = false) => {
	const date = new Date(s);
	const hari = days[date.getDay()];
	const bulan = months[date.getMonth()];
	const tanggal = date.getDate();
	const tahun = date.getFullYear();

	date.toLocaleDateString;

	let result = `${hari}, ${tanggal} ${bulan} ${tahun}`;
	if (detail) {
		result += ` ${(date.getHours() + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}`;
	}
	if (withSecond) {
		result += `${(date.getSeconds() + '').padStart(2, '0')}`;
	}

	return result;
};
