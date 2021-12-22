<script>
import {
	setProperty,
	deleteProperty,
	getElementFromArray,
	localStorageSet,
	localStorageGet
} from "../../utils";
const colors = [
	["#9fbf40"],
	["#54b0e4"],
	["#352e2e", "#fff"],
	["#8a417e"],
	["#457d69"],
	["#25273d", "#fff"],
	["#e4f86d", "#000"],
	["#2a483d", "#fff"],
	["#c0254a"],
	["#f53232"],
	["#7c7abb"],
	["#5e4335", "#fff"],
	["#c68440"],
	["#59ea5e"],
	["#319a58"]
]

let color = getElementFromArray(localStorageGet("accent-color"), colors) || colors[0]
$: {
	localStorageSet("accent-color", color)

	setProperty(document.body, "--accent-color", color[0])
	if (color.length > 1)
		setProperty(document.body, "--accent-text", color[1])
	else
		deleteProperty(document.body, "--accent-text")
}

</script>

<div>
	Основной цвет
	<div class="colors__list">
		{#each colors as value}
			<label class="colors__item" style="color: {value[0]}">
				<input type="radio" {value} bind:group={color}>
				<svg><use xlink:href="#check" /></svg>
			</label>
		{/each}
	</div>
</div>

<style>
.colors__item {
	font-size: 2em;
	border-radius: 0.2em;
	background-color: currentColor;
	width: 1.5em;
	height: 1em;
}
.colors__item svg {
	color: var(--accent-text, var(--background-color, black));
	top: 50%;
	left: 0;
	width: inherit;
	height: inherit;
	transform: translateY(-50%) scale(0.7);
	transition: .5s all;
}
.colors__item input:checked + svg {
	opacity: 1;
}
</style>