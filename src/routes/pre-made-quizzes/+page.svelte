<script lang="ts">
	import type { QuizListItem } from '$lib/types/types'
	import { fetchUrlForKey } from "$lib/constants"

	const quizFiles = import.meta.glob('/src/lib/data/*.json')
	let quizzes : QuizListItem[] = []

	function pathToId(path : string){
		return path.replace('.json', '').replace('/src/lib/data/', '')
	}

	for (const path in quizFiles) {
		quizFiles[path]().then((quizData : any) => {
			quizzes.push({
				title: quizData.title,
				path : pathToId(path)
			})

			quizzes = quizzes
		})
	}
</script>

<svelte:head>
	<title>Please select a quiz</title>
</svelte:head>

<section>
	<div>
		<img src="/images/questions.svg" alt="Quizzes" />
		<h1>Pre Made Quizzes</h1>
		{#if quizzes.length }
			<p>Select from one of our pre-made quizzes below:</p>
			{#each quizzes as quiz}
				<p><a class="button" href="/quiz?id={ quiz.path }">{ quiz.title }</a></p>
			{/each}
		{:else }
			<p>There are currently no quizzes. Please check back again soon, or <a href="{ fetchUrlForKey("create") }" title="Create your quiz">click here</a> to create your own.</p>
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		a.button {
			text-decoration: none;
		}
	}
</style>