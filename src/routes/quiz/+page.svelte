<script lang="ts">
	import type { QuestionRow, Question } from '$lib/types/types'
	import { page } from '$app/stores'
	import { Shuffle } from "$lib/quiz"
  	import { fetchUrlForKey } from '$lib/constants'
	import { fetchQuizFromStorage } from "$lib/storable"

	var title = ''
	var target = ''
	var description = ''
	var questions : Question[]
	var question : Question = null
	var questionRow : QuestionRow[] = []
	var questionIndex = 0
	var showNextButton = false
	var showEnd = false
	var editLink = ''
    
    async function fetchQuiz() {
		if($page.url.searchParams.get('id')) {
			//pre made quiz, load from json
			const quizFilePath : string = '/src/lib/data/' + $page.url.searchParams.get('id') + '.json'
			const selectedQuiz = await import(/* @vite-ignore */ quizFilePath)

			title = selectedQuiz.title
			target = selectedQuiz.target
			description = selectedQuiz.description
			questions = selectedQuiz.questions
		}

		if($page.url.searchParams.get('key')) {
			//quiz from local storage
			const key = $page.url.searchParams.get('key')
			const selectedQuiz = fetchQuizFromStorage(key ?? null)
			editLink = fetchUrlForKey("create") + '?key=' + key

			if(selectedQuiz) {
				title = selectedQuiz.title
				target = selectedQuiz.target
				description = selectedQuiz.description
				questions = selectedQuiz.questions
			}
		}

		return
	}

	let quiz = fetchQuiz()

	function startQuiz () {
		setQuestion(0);
	}

	function setQuestion(index : number) {
		question = questions[index]
		if(question) {
			showNextButton = false
			var shuffledArray = [...Shuffle(question?.answers)]
			questionRow = []

			shuffledArray.map((answer, index) => {
				questionRow.push({
					index : index,
					answer : answer,
					selected : false,
					correct : null
				})
			})
		}
	}

	function handleAnswerClick (event: any) {
		if(question) {
			let selectedAnswer = questionRow[event.target.getAttribute('data-index')]
			selectedAnswer.selected = true
			
			if(event.target.innerText.toLowerCase() == question.answer.toLowerCase()) {
				revealAllAnswers()
				selectedAnswer.correct = true
			} else {
				selectedAnswer.correct = false
			}

			questionRow[event.target.getAttribute('data-index')] = selectedAnswer
		}
	}

	function handleNextClick () {
		questionIndex++
		setQuestion(questionIndex);
	}

	function revealAllAnswers () {
        if(question) {
			questionRow.map((thisQuestion, index) => {
				thisQuestion.selected = true
				thisQuestion.correct = (thisQuestion.answer.toLowerCase() == (question && question.answer.toLowerCase()))
				
				questionRow[index] = thisQuestion
			})

			if(questionIndex + 1 == questions.length) {
				setTimeout(() => {
					showEnd = true
					title = 'Well done!'
				}, 1000)
			} else {
				showNextButton = true
			}
		}
    }
</script>

<svelte:head>
	<title>Quiz</title>
</svelte:head>

<section>
	<div>
		{#await quiz }
			<p>fetching quiz</p>
		{:then quiz}
			{#if question != null && !showEnd }
				<p>Question { questionIndex + 1 } of { questions.length }</p>
				{#if question.question }<h1>{ question.question }</h1>{/if}
				<div class="questions">
					{ #each questionRow as answer }
						<button
							on:click|preventDefault={handleAnswerClick}
							data-index="{ answer.index }"
							class="answer{ answer.selected === false ? " deselected" : "" }{ answer.correct === false ? " failed" : "" }{ answer.correct === true ? " success" : "" }">
							{ answer.answer }
						</button>
					{ /each }
					{#if showNextButton }
						<button
							class="next"
							on:click|preventDefault={handleNextClick}
							>
							Next Question
						</button>
					{/if}
				</div>
			{:else}
				{#if showEnd }
					<h3>{ target }</h3>
					<h1>{ title }</h1>
					<div>
						<img src="/src/lib/images/success.svg" alt="Well done!" />
						<p><a class="button" href="{ (editLink) ? fetchUrlForKey("mine") : fetchUrlForKey("all") }">Back to Quizzes</a></p>
					</div>
				{:else}
					<img src="/src/lib/images/quiz-start.svg" alt="Click to get started!" />
					<h3>{ target }</h3>
					<h1>{ title }</h1>
					<p class="description">{ description }</p>
					<button
						on:click|preventDefault={startQuiz}>
						Click to get started
					</button>
					{#if editLink }
						<p>(<a href="{ editLink }">Edit</a>)</p>
					{/if }
				{/if}
			{/if}
		{/await}
	</div>
</section>

<style lang="scss">
	section {
		h1 {
			margin: 0;
			font-size: 2.5rem;
			text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
		}

		h2 {
			margin: 2rem 0;
			font-size: 2rem;
			&:before {
				content: '';
				display: block;
				width: 4rem;
				height: 0.25rem;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 0.5rem;
				margin: 3rem auto;
			}
		}

		h3 {
			font-size: 1.4rem;
			margin: 0;
		}


		.description {
			&:after {
				content: '';
				display: block;
				width: 4rem;
				height: 0.25rem;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 0.5rem;
				margin: 3rem auto;
			}
		}

		.questions {
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.next {
				position: absolute;
				top: calc(100% + 2rem);
				left: 50%;
				transform: translateX(-50%);
			}

			button.answer {
				padding: 3rem;
				flex: 0 0 calc(50% - 2rem);
				border: none;
				border-bottom: 2px solid var(--color-border);
				background: none;
				background-color: rgba(0, 0, 0, 0);
				border-radius: 0;
				margin: 1rem;
				color: #FFF;
				text-align: center;
				font-size: 2rem;
				transition: all 0.2s ease-in-out;
				box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0);
				&:after {
					display: none;
				}

				&.deselected:hover {
					cursor: pointer;
					background-color: rgba(0, 0, 0, 0.1);
					transform: scale(1.05);
					box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
				}

				&.success,
				&.failed {
					&:after {
						content: "";
						background-size: contain;
						background-position: bottom right;
						display: block;
						position: absolute;
						bottom: 1rem;
						right: 1rem;
						height: 4rem;
						width: 4rem;
						opacity: 0.5;
					}
				}

				&.success {
					background: var(--color-success);
					&:after {
						background-image: url('/src/lib/images/tick.svg');
					}
				}

				&.failed {
					background: var(--color-failed);
					text-decoration: line-through;

					&:after {
						background-image: url('/src/lib/images/cross.svg');
						opacity: 0.15;
					}
				}

			}
		}
	}

	
</style>
