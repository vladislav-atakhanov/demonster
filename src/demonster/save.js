import JSZip from "jszip"
import html2canvas from "html2canvas"

export default async function() {
	const zip = new JSZip()
	const filenameTemplate = document.querySelector(".filename").value
	const slides = Array.from(document.querySelectorAll(".slide"))

	const slidesAsPng = await slidesToPng(slides)

	let length = `${slidesAsPng.length}`.length
	slidesAsPng.forEach((slide, index) => {
		let i = index + 1
		let l = `${i}`.length
		let filename = filenameTemplate.replace(/\$/g, "0".repeat(length - l) + i)
		if (slide.data) {
			let data = slide.data.split(",")[1]
			zip.file(filename, data, {base64: true})
		} else {
			document.body.prepend(slide.canvas)
		}

	})
	const base64 = await zip.generateAsync({type:"base64"})
	saveBase64asFile("data:application/zip;base64," + base64, "Demonster.zip")
}

function saveBase64asFile(base64, filename) {
	const a = document.createElement("a")
	a.href = base64
	a.download = filename
	a.click()
}

async function slidesToPng(slides) {
	const temp = document.createElement("div")
	temp.style.counterReset = "slide"
	document.body.appendChild(temp)

	let promises = slides.map(slide => {
		return new Promise(resolve => {
			const clone = slide.cloneNode(true)
			temp.appendChild(clone)
			clone.style.transform = "none"
			html2canvas(clone).then(canvas => {
				temp.removeChild(clone)
				resolve({
					canvas,
					data: canvas.toDataURL("image/png")
				})
			})
		})
	})

	const png = await Promise.all(promises)
	document.body.removeChild(temp)
	return png
}