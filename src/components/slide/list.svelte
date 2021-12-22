<script>
import { slides } from "../../store"

let temp, width = 1
const setWidth = () => width = temp.offsetWidth
$: temp && setTimeout(setWidth, 100);
onresize = setWidth
</script>

<div class="slides" style="--width: {width}">
	<h2>Слайды</h2>
	<ul class="slide__list">
		<li class="slide__item--tmp" bind:this={temp}></li>
		{#each $slides as slideHTML, i (i)}
			<li class="slide__item">{@html slideHTML}</li>
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
h2 {
	margin: 0;
}
.slide__item--tmp {
	height: 1px;
	order: 99999;
}
</style>