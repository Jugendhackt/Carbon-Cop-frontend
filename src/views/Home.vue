<template>
	<v-container fill-height v-if="$store.state.username">
		<v-content>
			<CarbonChallenges />
			<TopList />
			<UserCharts />
		</v-content>
	</v-container>
	<LandingPage v-else />
</template>

<script>
import CarbonChallenges from '../components/CarbonChallenges';
import TopList from '../components/TopList';
import UserCharts from '../components/UserCharts';
import LandingPage from '../components/LandingPage';

export default {
	components: { CarbonChallenges, TopList, UserCharts, LandingPage }
};
</script>
