<script>
	import { page } from '$app/stores';
	import { pageTree } from '$lib/constants';
</script>

<header>
	<nav>
		<ul>
			{#each pageTree as pageElement}
				<li class="{ pageElement.key }" aria-current={$page.url.pathname === pageElement.url ? 'page' : undefined}>
					<a href="{ pageElement.url }">{ pageElement.title }</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		nav {
			ul {
				display: flex;
				padding: 2rem;
				margin: 0;
				justify-content: flex-end;
				list-style: none;

				li {
					line-height: 60px;
					text-align: center;
					padding: 0 1rem;

					a {
						text-decoration: none;
						font-size: 1.2rem;

						&:hover {
							text-decoration: underline;
						}
					}

					&.home {
						width: 60px;
						height: 60px;
						padding: 0;
						margin-right: auto;
						a  {
							width: 100%;
							height: 100%;
							display: block;
							overflow: hidden;
							text-indent: -2000px;
							background-image: url('/src/lib/images/icon.svg');
							transition: transform 0.5s ease-in-out;

							&:hover {
								transform: rotate(360deg);
							}
						}
					}
				}
			}
		}
	}
</style>
