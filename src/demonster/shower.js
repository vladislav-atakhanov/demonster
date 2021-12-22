import { getCSSWidthAndHeight } from "../utils"

function showerCloser(shower, active) {
	return function() {
		shower.classList.remove(active)
		shower.removeAttribute("style")
	}
}

export function showSlide(shower, e, isChanging=false) {
	if (!shower)
		return

	let active = "slide__item--active"
	let close = showerCloser(shower, active)

	if (shower.classList.contains(active)) {
		let x = e.clientX / shower.offsetWidth
		let y = e.clientY / shower.offsetHeight
		if (shower == e.target || y < .1)
			return close()

		if (isChanging)
			return

		let slide
		if (x < .25)
			slide = shower.previousElementSibling
		else if (x > .75)
			slide = shower.nextElementSibling

		if (slide && slide.classList.contains("slide__item")) {
			close()
			showSlide(slide, e, true)
		}
	}
	else {
		shower.classList.add(active)

		let [slideWidth, slideHeight] = getCSSWidthAndHeight(shower.firstChild)

		let showerWidth = shower.offsetWidth
		let showerHeight = shower.offsetHeight

		let scale = showerHeight / slideHeight
		if (showerWidth < slideWidth * scale)
			scale = showerWidth / slideWidth

		shower.setAttribute("style", `--scale: ${scale}`)
	}
}