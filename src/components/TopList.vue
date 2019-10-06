<template>
	<v-container>
		<h2>Leaderboard</h2>
		<v-list>
			<v-list-item v-for="(item, i) in leaderboard" :key="item.name">
				<v-list-item-avatar color="grey lighten-1">
					{{ i + 1 }}
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>
						{{ item.name }}
						<v-chip v-if="item.name === $store.state.username">
							<v-icon>mdi-account</v-icon>
							{{
								i > 2
									? 'Tackle some challenges to climb the leaderboard.'
									: 'You rock!'
							}}
						</v-chip>
					</v-list-item-title>
				</v-list-item-content>

				<v-list-item-avatar color="grey lighten-2">
					{{ item.score }}
				</v-list-item-avatar>
			</v-list-item>
		</v-list>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			leaderboard: []
		};
	},
	async mounted() {
		console.log(`${process.env.VUE_APP_HOST}/top`);
		const response = await fetch(`${process.env.VUE_APP_HOST}/top`);
		if (response.status === 200) {
			this.leaderboard = (await response.json()).top;
		}
	}
};
</script>
