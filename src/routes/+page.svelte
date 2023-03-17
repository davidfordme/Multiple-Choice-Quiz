<script></script>

<svelte:head>
	<title>Quick Quiz</title>
	<meta name="description" content="Quick classroom quizzes for Primary Schools" />
</svelte:head>

<section>
	<div>
		<h1>Quick Quiz</h1>
		<p>Quick classroom quizzes for Primary Schools.</p>
		<p>View <a href="/quiz">all quizzes</a> or <a href="/create-quiz">click to create</a> your own.</p>
	</div>
</section>

<style>
	section {
		background-image: url("/src/lib/images/home/welcome-blackboard.svg");
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	section div {
		margin-top: -250px;
		max-width: 220px;
		text-align: center;
	}

	section div h1 {
		margin: 0;
	}
</style>
