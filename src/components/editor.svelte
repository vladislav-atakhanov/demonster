<script>
import { createSlides, save } from "../demonster"
import { debounce, localStorageGet, localStorageSet, fixElement } from "../utils"

import TabLink from "./tabs/link.svelte";
import TabContent from "./tabs/content.svelte"
import Theme from "./theme/settings.svelte"


let md = localStorageGet("markdown") || "# Demonster\n\nЭто конвентор markdown в слайды"
onload = () => setTimeout(() => createSlides(md), 100)
const slides = debounce(() => createSlides(md), 100)
let textarea

$: {
	localStorageSet("markdown", md)
	slides()

	if (textarea) {
		textarea.style.minHeight = ""
		textarea.style.minHeight = textarea.scrollHeight + "px"
	}
}
let lastScrollTop = 0
function scroll() {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop
	let direction = scrollTop > lastScrollTop
	fixElement(editor, direction)
	fixElement(document.querySelector(".slides"), direction)
	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
}
onscroll = scroll

let tabs = []
function getTabsList(parent) {
	if (!parent)
		return []
	let tabsList = []
	const tabs = parent.querySelectorAll(".tab")
	for (let tab of tabs) {
		tabsList.push({
			title: tab.dataset.title,
			content: tab
		})
	}
	return tabsList
}

let editor
$: tabs = getTabsList(editor)
</script>

<div class="editor" bind:this={editor}>
	<header class="tab__list">
		{#each tabs as tab}
			<TabLink {...tab} class="tab__link"/>
		{/each}
	</header>
	<div class="tab__contents">
		<TabContent title="Редактор" id="editor" active>
			<textarea
				bind:this={textarea}
				bind:value={md}
			></textarea>
		</TabContent>
		<TabContent title="Тема" id="theme">
			<Theme />
		</TabContent>
	</div>
	<footer class="actions">
		<button on:click={save}>Сохранить</button>
	</footer>
</div>

<style>
.editor {
	display: grid;
	grid-template-rows: max-content auto max-content;
	overflow: hidden;
	background-color: #fff;
}
.tab__contents {
	display: grid;
}
.tab__list {
	display: flex;
}
:global(.tab__link) {
	flex: 1;
	text-align: center;
	display: block;
	text-decoration: none;
	color: inherit;
	font: inherit;
	padding: 0;
	margin: 0;
	line-height: 1.5;
	background-color: #ccc;
	border: none;
	cursor: pointer;
}
:global(.tab__link.tab--active) {
	background-color: #fff;
	font-weight: bold;
}
.actions {
	padding: 0 1em;
}
textarea {
	margin: 0;
	padding: 1em;
	width: 100%;
	height: 100%;
	border: none;
	line-height: 1;
	display: block;
}
</style>