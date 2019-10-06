<template>
	<v-app>
		<v-content>
			<CarbonChallenges />
			<TopList />
			<UserCharts />
		</v-content>
	</v-app>
</template>

<script>
import CarbonChallenges from '../components/CarbonChallenges';
import TopList from '../components/TopList';
import UserCharts from '../components/UserCharts';

export default {
	components: { CarbonChallenges, TopList, UserCharts },
	beforeMount() {
		if (!this.$store.state.username) {
			this.$router.push('login');
		}
	}
};
</script>
