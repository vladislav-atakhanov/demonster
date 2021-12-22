<script>
import {
	setProperty,
	localStorageGet,
	localStorageSet
} from "../../utils";

let fontSize = localStorageGet("font-size") || 32

$: {
	localStorageSet("font-size", fontSize)
	setProperty(document.body, "--font-size", fontSize + "px")
}
</script>

<label>
	Размер шрифта: <input type="number" bind:value={fontSize}>
</label>