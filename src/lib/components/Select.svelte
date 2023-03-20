<script lang="ts">
	export let value : string;
	export let name : string;
	export let label : string;
</script>

<label for="{ name }">
	<p>{ label }</p>
	<select name="target" bind:value>
		<slot></slot>
	</select>
</label>

<style lang="scss">
	select {
		border-radius: 1rem;
		padding: 1rem;
		background-color: transparent;
		border: 0.2rem solid rgba(255, 255, 255, 0.45);
		width: 100%;
		color: #FFFFFF;
		font-size: 18px;
		font-family: 'Quicksand', sans-serif;
		background-image: url('/src/lib/images/chevron-down.svg');
		background-repeat: no-repeat;
		background-size: 1rem;
		background-position: right 1rem center;
		appearance: none;

		&:focus {
			outline-color: #249FAF;
		}
	}
</style>