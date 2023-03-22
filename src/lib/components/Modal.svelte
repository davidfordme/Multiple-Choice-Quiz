<script lang="ts">
	export let isVisible: Boolean
	export let title : string = ''
	export let description : string = ''
	export let requiresConfirmation : Boolean = false
	export let confirmation : any = () => {}
	export let autoDismisses : Boolean = false
	let timeout : any = null

	$: isVisible && updateVisibility()

	function updateVisibility() {
		if(autoDismisses && isVisible == true) {
			timeout = setTimeout(() => {
				isVisible = false
			}, 3000)
		}
	}

	function handleClose(event: KeyboardEvent | null) {
		console.log("handleClose")
		if(event && typeof event.key !== 'undefined' && (event.key != 'Enter' && event.key != 'Escape')) return
		if(timeout) clearTimeout(timeout)

		isVisible = false
	}
	
</script>

<div
	class="modal{ isVisible ? ' visible' : '' }">
	<div class="body">
		<button
			class="close"
			title="Close"
			on:click={ () => handleClose(null) }
			>Close</button>
		{#if title }<h2>{ title }</h2>{/if}
		{#if description }<p>{@html description }</p>{/if}
		{#if requiresConfirmation }
			<button
				on:click={ confirmation }
				class="yes"
				>Yes</button>
			<button
				on:click={ () => handleClose(null) }
				class="no"
				>No</button>
		{/if}
	</div>
	<div
		class="background"
		on:keydown={ handleClose }
		on:click={ () => handleClose(null) }
	></div>
</div>

<style lang="scss">
	.modal {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left : 0;
		z-index: 9000;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease-in-out;
		
		.background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.2);
			z-index: 9001;
		}

		&.visible {
			opacity: 1;
			pointer-events: all;

			.body {
				transform: translate(-50%, -50%) scale(1);
			}
		}
		
		.body {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) scale(0.8);
			padding: 2rem;
			background-color: #FFFFFF;
			border-radius: 2rem;
			color: var(--color-bg-1);
			transition: transform 0.2s ease-in-out;
			box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.2);
			z-index: 9002;
			
			h2 {
				margin: 0;
				font-size: 1.8rem;
			}

			p:last-child {
				margin-bottom: 0;
			}

			.close {
				position: absolute;
				top: -1.5rem;
				right: -1.5rem;
				width: 2rem;
				height: 2rem;
				padding: 0;
				background-position: center;
				background-image: url('/src/lib/images/cross-green.svg');
				background-repeat: no-repeat;
				background-color: #FFFFFF;
				background-size: 0.8rem;
				overflow: hidden;
				text-indent: -1000px;
				opacity: 0.75;
				transition: opacity 0.1s;

				&:hover {
					opacity: 1;
				}

				&:after {
					display: none;
				}
			}

			.yes {
				background-color: var(--color-success);
				&:after {
					background-image: url('/src/lib/images/tick.svg');
				}
			}
			
			.no {
				background-color: var(--color-failed);
				&:after {
					background-image: url('/src/lib/images/cross.svg');
				}
			}
		}
	}
</style>
