<template>
	<v-container>
		<h2>Challenges</h2>
		<v-row class="scrolling-row">
			<v-col
				cols="12"
				sm="6"
				md="3"
				lg="3"
				v-for="(challenge, i) in challenges"
				:key="challenge.name"
			>
				<v-card outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="overline mb-4">Challenge #{{ i + 1 }}</div>
							<v-list-item-title class="headline mb-1">
								{{ challenge.name.toUpperCase() }}
								{{ challenge.unlocked ? '✅' : '' }}
							</v-list-item-title>
							<v-list-item-subtitle>
								{{ challenge.description }}
							</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-avatar tile size="80" color="grey">
							<img :src="`${HOST}/${challenge.icon}`" />
						</v-list-item-avatar>
					</v-list-item>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			challenges: [],
			HOST: process.env.VUE_APP_HOST
		};
	},
	async mounted() {
		const response = await fetch(
			`${process.env.VUE_APP_HOST}/challenges?name=${this.$store.state.username}`
		);

		if (response.status === 200) {
			this.challenges = (await response.json()).challenges
				.sort(a => (a.unlocked ? 1 : -1))
				.slice(2);
		}
	}
};
</script>

<style lang="scss" scoped>
.scrolling-row {
	overflow-y: auto;
	flex-wrap: nowrap;
	margin: 12px 0;

	> *:first-of-type,
	> *:last-of-type {
		padding: 12px 0;
	}
}
</style>
