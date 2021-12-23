export function debounce(callback, ms) {
	let timer
	return function() {
		clearTimeout(timer)
		timer = setTimeout(callback.bind(this, arguments), ms)
	}
}
export function getElementFromArray(element, array) {
	for (let value of array)
		if (JSON.stringify(value) == JSON.stringify(element))
			return value
}

export let localStorageSet = (key, value) => localStorage.setItem(key, JSON.stringify(value))
export let localStorageGet = key => JSON.parse(localStorage.getItem(key) || "null")

function updateStyles($element, updater) {
	let style = $element.getAttribute("style") || ""
	let parsedStyles = style.split(";").reduce((styles, rule) => {
		let [prop, value] = rule.split(":")
		if (!value)
			return styles
			styles[prop] = value.slice(0, value.length)
		return styles
	}, {})

	parsedStyles = updater(parsedStyles, $element)

	style = Object.entries(parsedStyles).reduce((style, [key, value]) => {
		return style + `${key.trim()}:${value.trim()};`
	}, "")
	$element.setAttribute("style", style)
}

export function setProperty($element, property, value) {
	updateStyles($element, styles => {
		styles[property] = value
		return styles
	})
}
export function deleteProperty($element, property) {
	updateStyles($element, styles => {
		delete styles[property]
		return styles
	})
}

export function getCSSWidthAndHeight(element) {
	const computedStyles = getComputedStyle(element)
	let width = parseInt(computedStyles.width)
	let height = parseInt(computedStyles.height)
	return [width, height]
}

export function fixElement(element, direction, minHeight=650) {
	if (innerWidth < minHeight || !element)
		return

	let scrollTop = window.pageYOffset || document.documentElement.scrollTop
	const style = element.style
	let top = parseInt(style.top) || 0

	let deltaHeight = element.offsetHeight - innerHeight

	if (deltaHeight < 0) {
		style.top = scrollTop + "px"
	} else if (direction && scrollTop - top > deltaHeight) {
		style.top = scrollTop - deltaHeight + "px"
	} else if (!direction && top > scrollTop) {
		style.top = scrollTop + "px"
	}
}