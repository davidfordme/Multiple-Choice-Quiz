<script lang="ts">
	import type { QuestionRow, Question, QuizFile } from '$lib/types/types'
	import { Shuffle, Convert } from "./quiz"

	import quizData from '$lib/data/quiz-1.json'
  	import { prevent_default } from 'svelte/internal';

	var quiz = Convert.toQuizFile(JSON.stringify(quizData))
	var title = quiz.title

	var question : Question = null
	var questionRow : QuestionRow[] = []
	var questionIndex = 0
	var showNextButton = false
	var showEnd = false

	function startQuiz (event : MouseEvent) {
		setQuestion(0);
	}

	function setQuestion(index : number) {
		question = quiz.questions[index]
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
			
			if(event.target.innerText.toLowerCase() == question.answer) {
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
			
			questionRow.map((question, index) => {
				question.selected = true
				question.correct = false
				
				questionRow[index] = question
			})

			if(questionIndex + 1 == quiz.questions.length) {
				showEnd = true
				title = 'Well done!'
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
	<h2>{ title }</h2>
	{#if question != null && !showEnd }
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
				on:click|preventDefault={handleNextClick}
				>Next Question</button>
		{/if}
	{:else}
		{#if showEnd }
			<div>
				<p>Now get on with another quiz:</p>
				<p><a href="/quiz">Quiz</a></p>
			</div>
		{:else }
			<button
				on:click|preventDefault={startQuiz}>
				Click to get started
			</button>
		{/if}
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
		flex: 1;
	}

	h2 {
		flex: 1 1 100%;
		text-align: center;
		font-size: 2.5rem;
		text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	}
	
	.answer {
		padding: 3rem;
		flex: 0 0 calc(50% - 2rem);
		border: none;
		border-bottom: 2px solid var(--color-border);
		background: none;
		background-color: rgba(0, 0, 0, 0);
		/* border-radius: 1rem; */
		margin: 1rem;
		color: #FFF;
		text-align: center;
		font-size: 2rem;
		transition: all 0.2s ease-in-out;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0);
		text-transform: capitalize;
	}

	.deselected:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.1);
		transform: scale(1.05);
		box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
	}

	.success {
		background: var(--color-success);
	}

	.failed {
		background: var(--color-failed);
		text-decoration: line-through;
	}
</style>
