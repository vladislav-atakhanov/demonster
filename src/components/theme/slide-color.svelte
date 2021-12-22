<script>
import {
	setProperty,
	getElementFromArray,
	localStorageSet,
	localStorageGet
} from "../../utils";
const colors = [
	["#fff", "#000"],
	["#000", "#fff"],
	["wheat", "black"]
]
let color = getElementFromArray(localStorageGet("slide-color"), colors) || colors[0]
$: {
	setProperty(document.body, "--background-color", color[0])
	setProperty(document.body, "--color", color[1])
	localStorageSet("slide-color", color)
}

</script>

<div>
	Цвет слайда
	<div class="colors__list">
		{#each colors as value, i}
			<label class="colors__item" style="color: {value[1]}; background: {value[0]}">
				<span>{"Ангелина"[i%8]}</span>
				<input type="radio" {value} bind:group={color}>
				<svg><use xlink:href="#check" /></svg>
			</label>
		{/each}
	</div>
</div>

<style>
.colors__item {
	text-align: center;
	line-height: 1;
	padding: 0 0.5em;
	font-size: 1.5em;
	aspect-ratio: 1 / 1;
	border-radius: 0.2em;
	box-shadow: 0 5px 5px 0 rgb(0 0 0 / .3);
	display: flex;
	align-items: center;
	font-family: var(--font-family, inherit);
}
.colors__item span {
	margin-top: 0.1em;
	text-transform: uppercase;
}
.colors__item svg {
	bottom: 0;
	font-size: 16px;
	width: 1em;
	height: 1em;
	border-radius: inherit;
	right: .1em;
	color: hsl(75deg, 50%, 50%);
}
.colors__item input:checked + svg {
	opacity: 1;
}
</style>