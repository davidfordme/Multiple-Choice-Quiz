<script lang="ts">
	export let value : string = "";
	export let name : string;
	export let placeholder : string;
	export let label : string = "";
</script>

<label for="{ name }">
	{#if label }<p>{ label }</p>{/if}
	<input
		placeholder="{ placeholder }"
		name="{ name }"
		type="text"
		autocomplete="off"
		spellcheck="false"
		bind:value />
</label>

<style lang="scss">

	input {
		border-radius: 1rem;
		padding: 1rem;
		background-color: transparent;
		border: 0.2rem solid rgba(255, 255, 255, 0.45);
		width: 100%;
		color: #FFFFFF;

		&:focus {
			outline-color: #249FAF;
		}

		&::placeholder {
			color: rgba(255, 255, 255, 0.45);
		}
	}
</style>