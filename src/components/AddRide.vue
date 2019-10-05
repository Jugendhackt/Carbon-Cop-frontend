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
						<v-col cols="12" sm="12" md="5">
							<LocationInput
								@coords="coords => setCoords('from', coords)"
								placeholder="From..."
							/>
						</v-col>
						<v-col cols="12" sm="12" md="5">
							<LocationInput
								@coords="coords => setCoords('to', coords)"
								placeholder="To..."
							/>
						</v-col>
						<v-col cols="12" sm="12" md="2">
							<v-text-field
								type="number"
								v-model="distance"
								placeholder="Distance
							(in km)"
							/>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<div class="flex-grow-1"></div>
				<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
				<v-btn color="blue darken-1" text @click="addRide()">Add ride...</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import LocationInput from './LocationInput';

const HOST = 'http://laptop';

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
			},
			distance: 0
		};
	},
	methods: {
		async setCoords(from, coords) {
			this[from] = coords;
			if (this.to.lon && this.from.lon) {
				const coords = `${this.from.lon},${this.from.lat};${this.to.lon},${this.to.lat}`;

				const url = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${coords}`;

				const data = await fetch(url).then(r => r.json());
				this.distance = (data.routes[0].distance / 1000).toFixed(2);
			}
		},
		setMeans(means) {
			this.means = means;
			this.dialog = true;
		},
		async addRide() {
			const { username, password } = this.$store.state;
			const { distance, means: vehicle } = this;

			try {
				const response = await fetch(`${HOST}/tracks`, {
					method: 'POST',
					body: JSON.stringify({
						username,
						password,
						distance,
						vehicle
					})
				});

				if (response.status === 200) {
					this.dialog = false;
				} else {
					console.error(response);
				}
			} catch (e) {
				console.error(e);
			}
		}
	}
};
</script>
