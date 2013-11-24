# jDoom

jDoom is a __pure Javascript__ countdown timer.

jDoom is many things – here are a few things it is:

1. It is lightweight (1kB minified)
2. It is framework and library agnostic
3. It is configurable and fully-featured
4. It is focused on human readability/usability
5. It is built for speed, simplicity, and extendability

jDoom is the Javascript timer you deserve, __and__ the one you need right now.

jDoom is __pure destruction__.

## Getting Started

### Installation

jDoom is written in __pure Javascript__. Therefore, it does not require any libraries, frameworks, or other dependencies in order to function. Conversely, jDoom doesn't care what other dependencies are installed. It is completely unobtrusive, self-encapsulated, and deliberately designed to bear zero-to-minimal impact on other libraries.

Simply add a `<script>` tag referencing `jdoom.js` or `jdoom.min.js` to your markup, and you're ready to go.

### Basic implementation

jDoom requires minimal configuration to get a basic implementation running – it requires only that a date (formatted as `mm/dd/yyyy`) is specified. Simply pass a date string to an instance of the `Doom` function, assign it to a variable, and run the `doom` method on the variable:

    var counter = Doom({
      targetDate: '04/05/2063' // Counts down to midnight on April 5th, 2063
    });
    
    counter.doom();

Then, to display the countdown timer, ensure that the following DOM elements are present in your HTML markup:

	<span id="days"></span> : <span id="hours"></span> : <span id="mins"></span> : <span id="secs"></span>

The resulting Javascript injected markup will display the current time remaining to midnight on the `targetDate` in `dd : hh : mm : ss` format, updated once per second.

## Configuration

jDoom accepts the following key-value pairs as configuration options upon initialization. While most are optional, one is required.

### Required configuration values

__targetDate__: Date to count down to

    targetDate: '04/05/2063' // String, formatted as 'mm/dd/yyyy'; defaults to `null`

When passed as the sole configuration value, jDoom will default to midnight as the target time.

### Optional configuration values

The following values can be _optionally_ passed in the initialization of the `Doom` function.

__targetTime__: Time in [24-hour standard](http://en.wikipedia.org/wiki/24-hour_clock) on `targetDate` to count down to

    targetTime: '23:59:59' // String, formatted as 'hh:mm:ss'; defaults to `null`

__callback__: Callback to execute when countdown is complete

    callback: function() {} // Javascript function; defaults to `null`

__addZero__: Maintains or strips preceding zeroes on days, hours, minutes, and seconds

    addZero: false // Boolean; defaults to `true`

__biDirectional__: Stops countdown or proceeds to count up once countdown is reached

    biDirectional: true // Boolean; defaults to `false`

__utcOffset__: [UTC offset](http://en.wikipedia.org/wiki/Time_zone#List_of_UTC_offsets) of target time zone

    utcOffset: '-08:00' // String, formatted as '+hh:mm' or '-hh:mm'; defaults to null

__ids__: Specifies DOM elements to target

	ids: {
		days:  'dd', // String; defaults to 'days'
		hours: 'hh', // String; defaults to 'hours'
		mins:  'mm', // String; defaults to 'mins'
		secs:  'ss', // String; defaults to 'secs'
	}


## Examples

### Minimal configuration

Initialize jDoom with only a date; counts down to midnight of April 5th, 2063:

	var noOptions = Doom({
		targetDate: '04/05/2063'
	});
	noOptions.doom();

### Zeroes removed and custom DOM identifiers

Counts down to 11:59:59 PM on April 5th, 2063, then stops; preceding zeroes are removed:

	var callbackNoZeroes = Doom({
		targetDate: '04/05/2063',
		targetTime: '23:59:59',
		addZero: false,
		ids: {
			days: 'days_callback_no_zero',
			hours: 'hours_callback_no_zero',
			mins: 'mins_callback_no_zero',
			secs: 'secs_callback_no_zero',
		},
	});
	callbackNoZeroes.doom();

The corresponding DOM elements are as follows:

	<span id="days_callback_no_zero"></span>
	<span id="hours_callback_no_zero"></span>
	<span id="mins_callback_no_zero"></span>
	<span id="secs_callback_no_zero"></span>

### Bi-directional with time and callback

Counts down to 11:59:59 PM on April 5th, 2063, executes callback, then counts up:

	var biDirectionalCallback = Doom({
		targetDate: '04/05/2063',
		targetTime: '23:59:59',
		biDirectional: true,
		callback: function() {
			console.log('Doomed!');
		}
	});
	biDirectionalCallback.doom();

### Time zone offset

__By default__, jDoom's countdown timer is based on the system time of the user's browser. However, this may result in undesirable behavior in instances for which the target expiration time/date are specific to a particular time zone (which may not be the same as the user's system time). This issue can be circumvented by passing in a [UTC offset](http://en.wikipedia.org/wiki/Time_zone#List_of_UTC_offsets) for the target timezone:

	/* PST time zone offset */
	var pst = Doom({
		targetDate: '04/05/2063',
		targetTime: '23:59:59',
		utcOffset: '-8:00',
	});
	pst.doom();

	/* GMT time zone offset */
	var gmt = Doom({
		targetDate: '04/05/2063',
		targetTime: '23:59:59',
		utcOffset: '+00:00', // '+00:00' and '-00:00' are valid; '00:00' is not
	});
	gmt.doom();

## Error Handling

As of the current version, jDoom has no error handling capabilities. Invalid values passed to the `Doom` object, or values that result in Javascript errors, will likely result in jDoom returning `undefined` _or_ a blank string where it would normally return a number.

## Demo

[Implementations of the above examples can be found here.](http://zeantsoi.com/jdoom)

## Etcetera

Please contact the developer with any questions or suggestions. Forking and merge/pull requests are encouraged for those who would like to take part in improving this library.

jDoom is licensed under the MIT License.

&copy; 2013 by [Zean Tsoi](http://www.zeantsoi.com/)