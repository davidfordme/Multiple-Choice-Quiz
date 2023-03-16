<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li class="home" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/quiz' ? 'page' : undefined}>
				<a href="/quiz">All Quizzes</a>
			</li>
			<li aria-current={$page.url.pathname === '/create-quiz' ? 'page' : undefined}>
				<a href="/create-quiz">Create Quiz</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header nav ul {
		display: flex;
		padding: 2rem;
		margin: 0;
		justify-content: flex-end;
		list-style: none;
	}

	header nav ul li {
		line-height: 60px;
		text-align: center;
		padding: 0 1rem;
	}

	header nav ul li a {
		text-decoration: none;
		font-size: 1.2rem;
	}

	header nav ul li a:hover {
		text-decoration: underline;
	}

	.home {
		width: 60px;
		height: 60px;
		padding: 0;
		margin-right: auto;
	}

	.home a {
		width: 100%;
		height: 100%;
		display: block;
		overflow: hidden;
		text-indent: -2000px;
		background-image: url('/src/lib/images/icon.svg');
	}
</style>
