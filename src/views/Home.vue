<template>
	<v-app>
		<v-content>
			<CarbonChallenges />
			<TopList />
		</v-content>
	</v-app>
</template>

<script>
import CarbonChallenges from '../components/CarbonChallenges';
import TopList from '../components/TopList';

export default {
	components: { CarbonChallenges, TopList }
};
</script>
