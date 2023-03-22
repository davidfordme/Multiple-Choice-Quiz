<script>
  import { fetchUrlForKey } from "$lib/constants";

</script>

<svelte:head>
	<title>Quick Quiz</title>
	<meta name="description" content="Quick classroom quizzes for Primary Schools" />
</svelte:head>

<section>
	<div>
		<h1>Quick Quiz</h1>
		<p>Quick classroom quizzes for Primary Schools.</p>
		<p>View <a href="{ fetchUrlForKey("all") }">all quizzes</a> or <a href="{ fetchUrlForKey("create") }">click to create</a> your own.</p>
	</div>
</section>

<style>
	section {
		background-image: url("/images/welcome.svg");
		background-position: center;
		background-repeat: no-repeat;
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
