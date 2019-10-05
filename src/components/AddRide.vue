<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-speed-dial
				fixed
				bottom
				right
				direction="top"
				open-on-hover
				transition="slide-y-reverse-transition"
			>
				<template v-slot:activator>
					<v-btn fab>
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</template>

				<v-btn fab dark small color="green" @click="setMeans('bike')">
					<v-icon>mdi-bike</v-icon>
				</v-btn>
				<v-btn fab dark small color="indigo" @click="setMeans('car')">
					<v-icon>mdi-car</v-icon>
				</v-btn>
				<v-btn fab dark small color="red" @click="setMeans('airplane')">
					<v-icon>mdi-airplane</v-icon>
				</v-btn>
			</v-speed-dial>
		</template>
		<v-card>
			<v-card-title>
				<span class="headline">User Profile</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="12">
							<v-radio-group v-model="means" row>
								<v-radio label="Bike" value="bike"></v-radio>
								<v-radio label="Car" value="car"></v-radio>
								<v-radio label="Airplane" value="airplane"></v-radio>
							</v-radio-group>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<LocationInput
								@coords="
									coords => {
										from = coords;
									}
								"
								placeholder="From..."
							/>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<LocationInput
								@coords="
									coords => {
										to = coords;
									}
								"
								placeholder="To..."
							/>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<div class="flex-grow-1"></div>
				<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
				<v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import LocationInput from './LocationInput';

export default {
	components: { LocationInput },
	data() {
		return {
			means: 'bike',
			dialog: false,
			to: {
				lon: undefined,
				lat: undefined
			},
			from: {
				lon: undefined,
				lat: undefined
			}
		};
	},
	methods: {
		setMeans(means) {
			this.means = means;
			this.dialog = true;
		}
	}
};
</script>
