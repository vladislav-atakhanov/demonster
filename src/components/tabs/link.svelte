<script>
export let title
export let content

let active = content.classList.contains("tab--active")

let className = ""
export { className as class }
let id = content.id


let link
let click = () => {
	document.querySelectorAll(".tab--active").forEach(active => active.classList.remove("tab--active"))
	content.classList.add("tab--active")
	link.classList.add("tab--active")
}

$: {
	if (link && content.classList.contains("tab--active"))
		link.classList.add("tab--active")
}


</script>

<button bind:this={link} on:click={click} class={className}>{title}</button>