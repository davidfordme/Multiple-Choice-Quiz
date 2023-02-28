<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer></footer>
</div>

<style>

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		background: var(--color-bg-0);
		background: linear-gradient(15deg, var(--color-bg-0) 0%, var(--color-bg-1) 100%);
		color: #FFF;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
</style>
