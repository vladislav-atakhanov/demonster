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
	display: none;
}
:global(.tab.tab--active) {
	display: block;
}
</style>