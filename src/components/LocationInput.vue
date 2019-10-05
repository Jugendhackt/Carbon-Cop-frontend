<template>
	<v-autocomplete
		hide-details
		single-line
		no-data-text=""
		:no-filter="true"
		v-model="model"
		:search-input.sync="searchTerm"
		:items="searchResults"
		:loading="searchLoading"
		:placeholder="placeholder"
		@change="selectItem"
		@keyup.enter="searchPosition"
	/>
</template>

<script>
export default {
	props: {
		placeholder: String
	},
	data() {
		return {
			model: null,
			searchTerm: null,
			searchResults: [],
			searchLoading: false
		};
	},
	methods: {
		selectItem(item) {
			this.$emit('coords', {
				lat: item.coords[0],
				lon: item.coords[1]
			});
		},
		async searchPosition() {
			if (this.searchLoading) return;

			this.searchLoading = true;
			const url = new URL('https://photon.komoot.de/api');
			url.search = new URLSearchParams({
				q: this.searchTerm,
				lang: 'de'
			});
			const data = await fetch(url).then(r => r.json());
			const results = data.features.map(feature => ({
				text: feature.properties.name,
				value: { coords: feature.geometry.coordinates.reverse() }
			}));

			this.searchLoading = false;
			this.searchResults = results;
		}
	}
};
</script>
