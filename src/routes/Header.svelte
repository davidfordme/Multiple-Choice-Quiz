<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/quiz' ? 'page' : undefined}>
				<a href="/quiz">Quiz</a>
			</li>
			<li aria-current={$page.url.pathname === '/create-quiz' ? 'page' : undefined}>
				<a href="/create-quiz">Create Quiz</a>
			</li>
		</ul>
	</nav>
</header>

<style>
</style>
