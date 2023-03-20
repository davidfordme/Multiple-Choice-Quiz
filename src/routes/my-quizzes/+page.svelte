<script lang="ts">
	  import { fetchUrlForKey } from "$lib/constants"
	  import { fetchAllQuizzesFromStorage } from "$lib/storable"

	  const quizzes = fetchAllQuizzesFromStorage()
</script>

<svelte:head>
	<title>My quizzes</title>
</svelte:head>

<section>
	<div>
		<h1>My Quizzes</h1>
		<p>A list of all the quizzes saved to your machine.</p>
		{#if quizzes.length }
			<p>Select from one of our pre-made quizzes below:</p>
			{#each quizzes as quiz}
				<p><a class="button" href="/quiz?key={ quiz.id }">{ quiz.title }</a></p>
			{/each}
		{:else }
			<p>Not created any quizzes yet? <a href={ fetchUrlForKey('create') } title="Create a quiz">Click here</a> to create your first.</p>
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
