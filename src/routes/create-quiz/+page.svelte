<script lang="ts">
	import type { Question, QuizFile } from "$lib/types/types"
	import { page } from '$app/stores'
	import { writeToStorage, fetchQuizFromStorage } from "$lib/storable"
	import Input from "$components/Input.svelte"
	import Select from "$components/Select.svelte"
  
	let quizId = 'quiz-' + Math.random().toString(16).slice(2)
	let key : string | null = null
	let questions : Question[] = []

	let quiz : QuizFile = {
		id : quizId,
		title : '',
		description : '',
		target : '0',
		questions : questions
	}

	if($page.url.searchParams.get('key')) {
		//we have a key in URL, load quiz from storage
		key = $page.url.searchParams.get('key')
		if(key) {
			quizId = key
			const loadedQuiz = fetchQuizFromStorage(key)
			if(loadedQuiz) {
				quiz = loadedQuiz
				questions = quiz.questions
			}
		}
	}

	let canSendForm = false
	
	function validateQuiz() {
		if (quiz.title !== '' &&
			quiz.description !== '' &&
			quiz.target !== '0' &&
			quiz.questions.length > 0) canSendForm = true
	}

	function handleFormSubmit() {
		updateAnswers()
		writeToStorage(quizId, quiz)
	}

	function updateAnswers() {
		if(quiz.questions.length) {
			quiz.questions.forEach(question => {
				if(question) question.answer = question.answers[0]
			});
		}
	}

	function handleAddQuestion() {
		let newQuestion : Question = {
			type : 'spelling',
			answer : '',
			answers : []
		}

		questions.push(newQuestion)
		questions = questions
	}

	function handleDeleteQuestion(index : number) {
		questions.splice(index, 1)
		questions = questions
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
			on:submit|preventDefault={ handleFormSubmit }
			on:change={ validateQuiz }>
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
				<option value="0">Please select a target group</option>
				<option value="Reception">Reception</option>
				<option value="Year 1">Year 1</option>
				<option value="Year 2">Year 2</option>
				<option value="Year 3">Year 3</option>
				<option value="Year 4">Year 4</option>
				<option value="Year 5">Year 5</option>
				<option value="Year 6">Year 6</option>
			</Select>

			{#if questions.length > 0 }
				{#each questions as question, index}
					<div class="question">
						<h2>Question { index + 1 }</h2>
						{#if question }
							<Input
								name="question"
								placeholder="Answer 1 (Correct answer)"
								bind:value={ question.answers[0] }
								/>
							<Input
								name="question"
								placeholder="Answer 2"
								bind:value={ question.answers[1] }
								/>
							<Input
								name="question"
								placeholder="Answer 3"
								bind:value={ question.answers[2] }
								/>
							<Input
								name="question"
								placeholder="Answer 4"
								bind:value={ question.answers[3] }
								/>
						{/if}
						<button 
							on:click|preventDefault={ () => handleDeleteQuestion(index) }
							class="delete"
							title="Delete Question"
							>Delete</button>
					</div>
				{/each}
			{/if}

			<button
				on:click|preventDefault={ handleAddQuestion }
				class="add">
				Add Question
			</button>

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
		.question {
			position: relative;
			margin-top: 1rem;
			padding: 1rem;
			border-radius: 1rem;
			background-color: transparent;
			border: 0.2rem solid rgba(255, 255, 255, 0.45);

			h2 {
				margin: 0;
				font-size: 1.4rem;
			}

			&:hover {
				button.delete {
					background-position: center;
				}
			}

			button.delete {
				position: absolute;
				left: calc(100% + 0.2rem);
				top: 50%;
				transform: translateY(-50%);
				text-indent: -2000px;
				border-radius: 0;
				overflow: hidden;
				width: 30px;
				height: 30px;
				background-image: url('/src/lib/images/trash.svg');
				background-position: left -100% center;
				background-repeat: no-repeat;
				transition: background-position 0.2s ease-in-out;
				&:after {
					display: none;
				}
			}
		}

		button {
			&.add {
				margin-top: 2rem;
				padding: 1rem;
				width: 100%;
				text-align: center;

				&:after {
					display: none;
				}

				&:before {
					content: ' ';
					display: inline-block;
					margin-right: 1rem;
					background-image: url('/src/lib/images/add.svg');
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					width: 1.4rem;
					height: 1.4rem;
					right: 1rem;
					transition: right 0.2s ease-in-out;
				}
			}

			&[type="submit"] {
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
	}
</style>
