<script>
import FontFamily from "./font-family.svelte"
import FontSize from "./font-size.svelte"
import AccentColor from "./accent-color.svelte"
import SlideColor from "./slide-color.svelte"
</script>

<div class="theme">
	<FontFamily />
	<FontSize />
	<AccentColor />
	<SlideColor />
</div>

<style>
.theme {
	padding: 1em;
	display: flex;
	flex-direction: column;
	gap: 1em
}
</style>