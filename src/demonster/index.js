import { Converter } from "showdown"
import { slides } from "../store"
import _save from "./save"

export let save = _save
export async function createSlides(md) {
	const markdown = document.createElement("div")
	markdown.innerHTML = converter.makeHtml(md)
	let slidesHTML = Demonster(markdown, {
		selector: {
			tag: "section",
			"class": "slide"
		}
	})
	slides.set(slidesHTML)
}

function createElement(tag="div", className=false) {
	const element = document.createElement(tag)
	if (className)
		element.className = className
	return element
}

const converter = new Converter()
function Demonster(element, opts) {
	const defaultOpts = {
		selector: {
			tag: "section",
			"class": "page"
		}
	}
	const options = Object.assign({}, defaultOpts, opts)
	const to = createElement()
	document.body.appendChild(to)

	let defaultChildrenLengthOnSlide = 0
	function newPage() {
		const element = document.createElement(options.selector.tag)
		element.className = options.selector.class
		element.setAttribute("style", "transform: none")
		element.innerHTML = `<div class="counter"><span></span></div>`
		defaultChildrenLengthOnSlide = element.children.length
		to.appendChild(element)
		return element
	}

	let debug = newPage()

	function appendElement(to, element) {
		to.innerHTML = ""
		for (const child of element.childNodes) {
			if (child.nodeType == 3) {
				const text = child.nodeValue
				if (text.replace(/\s*/g, "") == "")
					continue

				const textArray = text.split(" ")
				for (let word of textArray) {
					const $text = document.createTextNode(word + " ")
					to.appendChild($text)
					if (debug.offsetHeight > height) {
						to.removeChild($text)
						to = element.cloneNode(false)
						to.innerHTML = word
						toNewPage(to)
					}
				}
			} else {
				const clone = child.cloneNode(true)
				to.appendChild(clone)
				if (debug.offsetHeight > height) {
					to = element.cloneNode(false)
					to.innerHTML = ""
					toNewPage(to)
					to.appendChild(clone)
				}
			}
		}
	}

	function toNewPage(element) {
		if (debug.children.length > defaultChildrenLengthOnSlide)
			debug = newPage()
		debug.appendChild(element)
	}

	let isPlaceToNewPage = false

	const height = Number(debug.offsetHeight)
	for (const child of element.childNodes) {
		if (child.nodeType === 3 && child.nodeValue.replace(/\s*/g, "") == "")
			continue

		let childClone = child.cloneNode(true)
		if (childClone.tagName == "HR") {
			isPlaceToNewPage = true
			continue
		}

		if (isPlaceToNewPage) {
			isPlaceToNewPage = false
			toNewPage(childClone)
		} else {
			debug.appendChild(childClone)
			if (debug.offsetHeight > height)
				appendElement(childClone, child)
		}
	}

	const html = []
	for (const slide of to.children) {
		let clone = slide.cloneNode(true)
		clone.removeAttribute("style")
		clone.style.height = getComputedStyle(slide).minHeight
		html.push(clone.outerHTML)
	}

	document.body.removeChild(to)
	return html
}