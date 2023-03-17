<script lang="ts">
	import type { QuizListItem } from '$lib/types/types'

	const quizFiles = import.meta.glob('$data/*.json')
	let quizes : QuizListItem[] = [];

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
		<h1>Quizzes</h1>
		{#if quizes.length }
			<p>Select from one of our pre-made quizzes below:</p>
			{#each quizes as quiz}
				<p><a href="/quiz/detail?id={ quiz.path }">{ quiz.title }</a></p>
			{/each}
		{:else }
			<p>There are currently no quizes. Please check back again soon, or <a href="/create-quiz" title="Create your quiz">click here</a> to create your own.</p>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	h1 {
		text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	}
</style>
