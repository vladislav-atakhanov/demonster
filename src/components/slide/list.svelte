<script>
import { slides } from "../../store"
import { show } from "../../demonster"

let temp, width = 1
const setWidth = () => width = temp.offsetWidth
$: temp && setTimeout(setWidth, 100);
onresize = setWidth

function click(e) {
	show(this, e)
}

</script>

<div class="slides" style="--width: {width}">
	<h2>Слайды</h2>
	<ul class="slide__list">
		<li class="slide__item--tmp" bind:this={temp}></li>
		{#each $slides as slideHTML, i (i)}
			<li on:click={click} class="slide__item">{@html slideHTML}</li>
		{/each}
	</ul>
</div>

<style>
.slides {
	padding: 1em;
	background-color: #ccc;
	max-width: 100vw;
}

.slide__list {
	display: grid;
	grid-template-columns: repeat(var(--column, 1), 1fr);
	gap: 1em;
	align-items: start;
	margin: 0;
	padding: 0;
	list-style: none;
}
.slide__item {
	--scale: calc(var(--width, 1) / var(--slide-width));
	width: 1px;
	height: calc(var(--slide-height) * 1px * var(--scale, 1));
}

:global(li.slide__item.slide__item--active) {
	position: fixed;
	z-index: 1;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background-color: #000d;
	width: auto;
	height: auto;
	--scale: 1;
}
:global(.slide__item--active .slide) {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: scale(var(--scale)) translate(-50%, -50%);
}

h2 {
	margin: 0;
}
.slide__item--tmp {
	height: 1px;
	order: 99999;
}
</style>