export function debounce(callback, ms) {
	let timer
	return function() {
		clearTimeout(timer)
		timer = setTimeout(callback.bind(this, arguments), ms)
	}
}