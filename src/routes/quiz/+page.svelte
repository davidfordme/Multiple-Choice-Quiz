<script>
</script>

<svelte:head>
	<title>Please select a quiz</title>
</svelte:head>

<section>
	<h1>Please select a quiz</h1>
	<p><a href="/quiz/detail?id=1">Quiz 1</a></p>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
		flex: 1;
		text-align: center;
	}

	h1 {
		flex: 1 1 100%;
		font-size: 2.5rem;
		text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	}

	p {
		flex: 1 1 100%;
	}

	a {
		text-decoration: underline;
	}
</style>
