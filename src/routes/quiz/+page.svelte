<script>
	import quiz from '$lib/data/quiz-1.json';

	const questions = quiz.questions;
	var questionData = [];

	function* shuffle(arr) {
		arr = [...arr];
		while(arr.length) yield arr.splice(Math.random()*arr.length|0, 1)[0]
	}

	function setupQuestion(answersArray) {

		var shuffledArray = [...shuffle(answersArray)];

		shuffledArray.map((answer, index) => {
			questionData.push({
				index : index,
				answer : answer,
				selected : false,
				correct : null
			})
		})
	}
	
	function handleAnswerClick (event) {
		let selectedAnswer = questionData[event.target.getAttribute('data-index')]
		selectedAnswer.selected = true;
		
		if(event.target.innerText.toLowerCase() == selectedQuestion.answer) {
			revealAllAnswers()
			selectedAnswer.correct = true;
		} else {
			selectedAnswer.correct = false;
		}

		questionData[event.target.getAttribute('data-index')] = selectedAnswer
	}

	function revealAllAnswers () {
		questionData.map((question, index) => {
			question.selected = true;
			question.correct = false;
			
			questionData[index] = question
		})
	}

	var selectedQuestion = questions[0];
	console.log(selectedQuestion);

	setupQuestion(selectedQuestion.answers);


</script>

<svelte:head>
	<title>Quiz</title>
</svelte:head>

<section>
	<h2>{ selectedQuestion.type == 'spelling' ? "Splat the spelling..." : "" }</h2>
	{ #each questionData as answer }
		<button
			on:click|preventDefault={handleAnswerClick}
			data-index="{ answer.index }"
			class="answer{ answer.selected === false ? " deselected" : "" }{ answer.correct === false ? " failed" : "" }{ answer.correct === true ? " success" : "" }">
			{ answer.answer }
		</button>
	{ /each }
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
