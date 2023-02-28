<script>
	
</script>

<svelte:head>
	<title>Quiz</title>
</svelte:head>

<section>
	<h2>Question Title</h2>
	<span class="answer deselected">Answer 1</span>
	<span class="answer deselected">Answer 2</span>
	<span class="answer deselected">Answer 3</span>
	<span class="answer deselected">Answer 4</span>
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
	}
	
	.answer {
		padding: 3rem;
		flex: 0 0 calc(50% - 2rem);
		border: 2px solid var(--color-border);
		background-color: var(--color-bg-0);
		border-radius: 1rem;
		margin: 1rem;
		text-align: center;
		font-size: 2rem;
		transition: all 0.2s ease-in-out;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	}

	.deselected:hover {
		cursor: pointer;
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
