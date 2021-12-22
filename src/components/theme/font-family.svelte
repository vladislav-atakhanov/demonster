<script>
import {
	setProperty,
	localStorageGet,
	localStorageSet
} from "../../utils";

let fontKeywords = ["sans-serif", "serif", "monospace"]
const fontFamilies = [
	...fontKeywords,
	"Times New Roman", "Calibri", "Arial", "Consolas", "Comic Sans MS", "Segoe UI", "Bahnschrift", "Century Gothic"
]
let fontFamily = localStorageGet("font-family") || fontFamilies[0]

$: {
	localStorageSet("font-family", fontFamily)
	let family = fontFamilies.includes(fontFamily) ? fontFamily : `"${fontFamily}"`
	setProperty(document.body, "--font-family", family)
}
</script>

<label>
	Шрифт: <input list="font-family" bind:value={fontFamily}>
	<datalist id="font-family">
		{#each fontFamilies as value}
			<option {value}>
		{/each}
	</datalist>
</label>