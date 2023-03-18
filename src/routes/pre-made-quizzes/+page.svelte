<script lang="ts">
	import type { QuizListItem } from '$lib/types/types'
	import { fetchUrlForKey } from "$lib/constants"

	const quizFiles = import.meta.glob('$data/*.json')
	let quizes : QuizListItem[] = []

	function pathToId(path : string){
		return path.replace('.json', '').replace('/src/lib/data/', '')
	}

	for (const path in quizFiles) {
		quizFiles[path]().then((quizData : any) => {
			quizes.push({
				title: quizData.title,
				path : pathToId(path)
			})

			quizes = quizes
		})
	}
</script>

<svelte:head>
	<title>Please select a quiz</title>
</svelte:head>

<section>
	<div>
		<h1>Pre Made Quizzes</h1>
		<img src="/src/lib/images/questions.svg" alt="Quizzes" />
		{#if quizes.length }
			<p>Select from one of our pre-made quizzes below:</p>
			{#each quizes as quiz}
				<p><a class="button" href="/quiz?id={ quiz.path }">{ quiz.title }</a></p>
			{/each}
		{:else }
			<p>There are currently no quizes. Please check back again soon, or <a href="{ fetchUrlForKey("create") }" title="Create your quiz">click here</a> to create your own.</p>
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		a.button {
			text-decoration: none;
		}
	}

	h1 {
		text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	}
</style>
