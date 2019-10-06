/* eslint-disable */

/**
 * CSS conic-gradient() polyfill
 * By Lea Verou — http://lea.verou.me
 * MIT license
 */

let exp

(function() {
	const π = Math.PI;
	const τ = 2 * π;
	const ε = 0.00001;
	const deg = π / 180;

	const dummy = document.createElement('div');
	document.head.append(dummy);

	var _ = exp = (self.ConicGradient = function(o) {
		const me = this;
		_.all.push(this);

		o = o || {};

		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		this.repeating = Boolean(o.repeating);

		this.size = o.size || Math.max(innerWidth, innerHeight);

		this.canvas.width = this.canvas.height = this.size;

		var { stops } = o;

		this.stops = (stops || '').split(/\s*,(?![^(]*\))\s*/); // Commas that are not followed by a ) without a ( first

		this.from = o.from || 0;

		for (var i = 0; i < this.stops.length; i++) {
			if (this.stops[i]) {
				const stop = (this.stops[i] = new _.ColorStop(this, this.stops[i]));

				if (stop.next) {
					this.stops.splice(i + 1, 0, stop.next);
					i++;
				}
			} else {
				this.stops.splice(i, 1);
				i--;
			}
		}

		if (this.stops[0].color.indexOf('from') == 0) {
			this.from = this.stops[0].pos * 360;
			this.stops.shift();
		}
		// Normalize stops

		// Add dummy first stop or set first stop’s position to 0 if it doesn’t have one
		if (this.stops[0].pos === undefined) {
			this.stops[0].pos = 0;
		} else if (this.stops[0].pos > 0) {
			const first = this.stops[0].clone();
			first.pos = 0;
			this.stops.unshift(first);
		}

		// Add dummy last stop or set last stop’s position to 100% if it doesn’t have one
		if (this.stops[this.stops.length - 1].pos === undefined) {
			this.stops[this.stops.length - 1].pos = 1;
		} else if (!this.repeating && this.stops[this.stops.length - 1].pos < 1) {
			const last = this.stops[this.stops.length - 1].clone();
			last.pos = 1;
			this.stops.push(last);
		}

		this.stops.forEach(function(stop, i) {
			if (stop.pos === undefined) {
				// Evenly space color stops with no position
				for (let j = i + 1; this[j]; j++) {
					if (this[j].pos !== undefined) {
						stop.pos =
							this[i - 1].pos + (this[j].pos - this[i - 1].pos) / (j - i + 1);
						break;
					}
				}
			} else if (i > 0) {
				// Normalize color stops whose position is smaller than the position of the stop before them
				stop.pos = Math.max(stop.pos, this[i - 1].pos);
			}
		}, this.stops);

		if (this.repeating) {
			// Repeat color stops until >= 1
			var stops = this.stops.slice();
			const lastStop = stops[stops.length - 1];
			const difference = lastStop.pos - stops[0].pos;

			for (
				var i = 0;
				this.stops[this.stops.length - 1].pos < 1 && i < 10000;
				i++
			) {
				for (let j = 0; j < stops.length; j++) {
					const s = stops[j].clone();
					s.pos += (i + 1) * difference;

					this.stops.push(s);
				}
			}
		}

		this.paint();
	});

	_.all = [];

	_.prototype = {
		toString() {
			return "url('" + this.dataURL + "')";
		},

		get dataURL() {
			// IE/Edge only render data-URI based background-image when the image data
			// is escaped.
			// Ref: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/#comment-3
			return 'data:image/svg+xml,' + encodeURIComponent(this.svg);
		},

		get blobURL() {
			// Warning: Flicker when updating due to slow blob: URL resolution :(
			// TODO cache this and only update it when color stops change
			return URL.createObjectURL(
				new Blob([this.svg], { type: 'image/svg+xml' })
			);
		},

		get svg() {
			return (
				'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">' +
				'<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">' +
				'<image width="100" height="100%" xlink:href="' +
				this.png +
				'" /></svg></svg>'
			);
		},

		get png() {
			return this.canvas.toDataURL();
		},

		get r() {
			return (Math.sqrt(2) * this.size) / 2;
		},

		// Paint the conical gradient on the canvas
		// Algorithm inspired from http://jsdo.it/akm2/yr9B
		paint() {
			const c = this.context;

			const radius = this.r;
			const x = this.size / 2;

			let stopIndex = 0; // The index of the current color
			let stop = this.stops[stopIndex];
			let prevStop;

			let diff;
			let t;

			// Transform coordinate system so that angles start from the top left, like in CSS
			c.translate(this.size / 2, this.size / 2);
			c.rotate(-90 * deg);
			c.rotate(this.from * deg);
			c.translate(-this.size / 2, -this.size / 2);

			for (let i = 0; i < 360; ) {
				if (i / 360 + ε >= stop.pos) {
					// Switch color stop
					do {
						prevStop = stop;

						stopIndex++;
						stop = this.stops[stopIndex];
						// Continue while point is behind current position (i)
					} while (stop && stop != prevStop && i / 360 + ε >= stop.pos);

					if (!stop) {
						break;
					}

					var sameColor =
						String(prevStop.color) === String(stop.color) && prevStop != stop;

					diff = prevStop.color.map((c, i) => {
						return stop.color[i] - c;
					});
				}

				t = (i / 360 - prevStop.pos) / (stop.pos - prevStop.pos);

				const interpolated = sameColor
					? stop.color
					: diff.map((d, i) => {
							const ret = d * t + prevStop.color[i];

							return i < 3 ? ret & 255 : ret;
					  });

				// Draw a series of arcs, 1deg each
				c.fillStyle = 'rgba(' + interpolated.join(',') + ')';
				c.beginPath();
				c.moveTo(x, x);

				if (sameColor) {
					var θ = 360 * (stop.pos - prevStop.pos);
				} else {
					var θ = 0.5;
				}

				let beginArg = i * deg;
				beginArg = Math.min(360 * deg, beginArg);

				// .02: To prevent empty blank line and corresponding moire
				// only non-alpha colors are cared now
				let endArg = beginArg + θ * deg;
				endArg = Math.min(360 * deg, endArg + 0.02);

				c.arc(x, x, radius, beginArg, endArg);

				c.closePath();
				c.fill();

				i += θ;
			}
		}
	};

	_.ColorStop = function(gradient, stop) {
		this.gradient = gradient;

		if (stop) {
			const parts = stop.match(
				/^(.+?)(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?\s*$/
			);

			this.color = _.ColorStop.colorToRGBA(parts[1]);

			if (parts[2]) {
				const unit = parts[3];

				if (unit == '%' || (parts[2] === '0' && !unit)) {
					this.pos = parts[2] / 100;
				} else if (unit == 'turn') {
					this.pos = Number(parts[2]);
				} else if (unit == 'deg') {
					this.pos = parts[2] / 360;
				} else if (unit == 'grad') {
					this.pos = parts[2] / 400;
				} else if (unit == 'rad') {
					this.pos = parts[2] / τ;
				}
			}

			if (parts[4]) {
				this.next = new _.ColorStop(
					gradient,
					parts[1] + ' ' + parts[4] + parts[5]
				);
			}
		}
	};

	_.ColorStop.prototype = {
		clone() {
			const ret = new _.ColorStop(this.gradient);
			ret.color = this.color;
			ret.pos = this.pos;

			return ret;
		},

		toString() {
			return 'rgba(' + this.color.join(', ') + ') ' + this.pos * 100 + '%';
		}
	};

	_.ColorStop.colorToRGBA = function(color) {
		if (!Array.isArray(color) && color.indexOf('from') == -1) {
			dummy.style.color = color;

			let rgba = getComputedStyle(dummy).color.match(
				/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/
			);

			if (rgba) {
				rgba.shift();
				rgba = rgba.map(a => {
					return Number(a);
				});
				rgba[3] = isNaN(rgba[3]) ? 1 : rgba[3];
			}

			return rgba || [0, 0, 0, 0];
		}

		return color;
	};
})();

if (self.StyleFix) {
	(function() {
		function supportedBackgroundImage(checkStyle) {
			const dummy = document.createElement('p');
			dummy.style.backgroundImage = checkStyle;
			dummy.style.backgroundImage = PrefixFree.prefix + checkStyle;
			return Boolean(dummy.style.backgroundImage);
		}

		function installGradientFix(gradientExp, fix) {
			const match = new RegExp(
				'(?:repeating-)?' +
					gradientExp +
					'\\(\\s*((?:\\([^()]+\\)|[^;()}])+?)\\)',
				'g'
			);
			StyleFix.register((css, raw) => {
				return css.indexOf('-gradient') > -1 ? css.replace(match, fix) : css;
			});
		}

		// Emulates conic-gradient in the absence of a native implementation.
		function conicGradientFix(gradient, stops) {
			return new ConicGradient({
				stops,
				repeating: gradient.indexOf('repeating-') > -1
			});
		}

		// Converts dual-position color stops (CSS Images Module Level 4) if not supported.
		function dualPositionFix(gradient, stops) {
			let adjustedStops = '';
			(stops || '').split(/\s*,(?![^(]*\))\s*/).forEach((stop, i) => {
				if (!stop) return;

				adjustedStops += adjustedStops != '' ? ', ' : '';

				const parts = stop.split(/ /);
				if (parts.length === 3) {
					// When the color stop has 3 components, assume it uses dual-positioning and convert:
					//     "color pos0 pos1" -> "color pos0, color pos1"
					adjustedStops +=
						parts[0] + ' ' + parts[1] + ', ' + parts[0] + ' ' + parts[2];
				} else {
					adjustedStops += stop;
				}
			});

			return gradient.replace(stops, adjustedStops);
		}

		// First see if we need need a polyfill for dual-position color stops.
		if (
			!supportedBackgroundImage('linear-gradient(white 0% 50%, black 50% 100%)')
		)
			installGradientFix('(?:linear|radial|conic)-gradient', dualPositionFix);

		// Then check whether we need to polyfill conic-gradient.
		if (!supportedBackgroundImage('conic-gradient(white, black)'))
			installGradientFix('conic-gradient', conicGradientFix);
	})();
}

export default exp;