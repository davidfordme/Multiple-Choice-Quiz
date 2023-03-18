<script lang="ts">
	  import { fetchUrlForKey } from "$lib/constants";
</script>

<svelte:head>
	<title>My quizzes</title>
</svelte:head>

<section>
	<div>
		<h1>My Quizzes</h1>
		<p>A list of all the quizzes saved to your machine.</p>
		<p>No quizzes? <a href={ fetchUrlForKey('create') } title="Create a quiz">Click here</a> to create your first.</p>
	</div>
</section>

<style lang="scss">
</style>
