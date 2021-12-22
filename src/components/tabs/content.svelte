<script>
export let title
export let active = false
export let id
</script>

<div class="tab {active ? 'tab--active' : ''}" {id} data-title={title}>
	<slot></slot>
</div>

<style>
.tab {
	opacity: 0;
	pointer-events: none;
	grid-area: 1 / 1 / -1 / -1;
}
:global(.tab.tab--active) {
	opacity: 1;
	pointer-events: all;
}
</style>