<script lang="ts">
	import type { QuizFile } from "$lib/types/types"
	import { page } from '$app/stores'
	import { writeToStorage, fetchQuizFromStorage } from "$lib/storable"
	import Input from "$components/Input.svelte"
	import Select from "$components/Select.svelte"
  
	let quizId = 'quiz-' + Math.random().toString(16).slice(2)
	let key : string | null = null

	let quiz : QuizFile = {
		id : quizId,
		title : '',
		description : '',
		target : '0',
		questions : []
	}

	if($page.url.searchParams.get('key')) {
		//we have a key in URL, load quiz from storage
		key = $page.url.searchParams.get('key')
		if(key) {
			quizId = key
			const loadedQuiz = fetchQuizFromStorage(key)
			if(loadedQuiz) quiz = loadedQuiz
		}
	}

	let canSendForm = true

	function handleFormSubmit() {
		writeToStorage(quizId, quiz)
	}
</script>
  
<svelte:head>
	<title>Create your own quiz</title>
</svelte:head>
  
<section>
	<div>
		<h1>{#if key }Edit your Quiz{:else}Create a Quiz{/if}</h1>
		<p>Remember, all quizzes are stored in local storage on your machine (so don't clear your cache...).</p>

		<form
			on:submit|preventDefault={ handleFormSubmit } >
			<Input
				name="title"
				label="Give your quiz a title:"
				placeholder="Title"
				bind:value={ quiz.title } />

			<Input
				name="description"
				label="Describe your quiz:"
				placeholder="Description"
				bind:value={ quiz.description } />

			<Select
				name="target"
				label="Which year group is the quiz targeted at?"
				bind:value={ quiz.target }>
				<option value="0">Please select a year group</option>
				<option value="Reception">Reception</option>
				<option>Year 1</option>
				<option>Year 2</option>
				<option>Year 3</option>
				<option>Year 4</option>
				<option>Year 5</option>
				<option>Year 6</option>
			</Select>

			<button
				type="submit"
				disabled="{ !canSendForm }">
				Save Quiz
			</button>
		</form>
	</div>
</section>

<style lang="scss">
	form {
		button {
			width: 100%;
			text-align: left;
			font-size: 1rem;
			margin-top: 2rem;
			background-color: var(--color-success);

			&:disabled {
				opacity: 0.5;
				cursor: default;
			}
		}
	}
</style>
