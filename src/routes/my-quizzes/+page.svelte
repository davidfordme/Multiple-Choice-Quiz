<script lang="ts">
	import { page } from '$app/stores'
	import { fetchUrlForKey } from "$lib/constants"
	import { fetchAllQuizzesFromStorage } from "$lib/storable"
	import Modal from "$components/Modal.svelte"

	const quizzes = fetchAllQuizzesFromStorage()

	let isDeletedVisible = false
	if($page.url.searchParams.get('deleted')) isDeletedVisible = true
</script>

<svelte:head>
	<title>My quizzes</title>
</svelte:head>

<section>
	<div>
		<img src="/src/lib/images/my-quizzes.svg" alt="My Quizzes" />
		<h1>My Quizzes</h1>
		<p>A list of all the quizzes saved to your computer:</p>
		{#if quizzes.length }
			{#each quizzes as quiz}
				<p><a class="button" href="/quiz?key={ quiz.id }">{ quiz.title }</a></p>
			{/each}
		{:else }
			<p>Not created any quizzes yet? <a href={ fetchUrlForKey('create') } title="Create a quiz">Click here</a> to create your first.</p>
		{/if}
	</div>
	
	<Modal
		title="Quiz Deleted!"
		description="Your quiz has been deleted from your machine"
		bind:isVisible={ isDeletedVisible }
		autoDismisses={ false }
		/>
</section>

<style lang="scss">
	section {
		a.button {
			text-decoration: none;
		}
	}
</style>
