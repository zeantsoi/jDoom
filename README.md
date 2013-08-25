# jDoom

jDoom is a pure Javascript countdown timer.

jDoom is many things – here are a few things it is:

1. It is lightweight (1kB minified)
2. It is framework and library agnostic
3. It is not reliant on any dependencies
4. It is configurable and fully-featured
5. It is focused on human readability/usability
6. It is built for speed, simplicity, and extendability

jDoom is the Javascript timer you've always wanted.

jDoom is pure destruction.

## Getting Started

### Installation

jDoom is written _purely in Javascript_. Therefore, it does not require any libraries, frameworks, or other dependencies in order to function. Conversely, jDoom doesn't care what other dependencies are installed. It is completely unobtrusive, self-encapsulated, and deliberately designed to bear zero-to-minimal impact on other libraries.

Simply add a `<script>` tag referencing `jdoom.js` or `jdoom.min.js` to your markup, and you're ready to go.

### Basic implementation

jDoom requires minimal configuration to get a basic implementation running – it requires only that a date (formatted as `mm/dd/yyyy`) is specified. Simply pass a date to an instance of the `Doom` function, assign it to a variable, and run the `doom` method on the variable:

    var counter = Doom({
      targetDate: '04/05/2063'
    });
    
    counter.doom();

Then, to display the countdown timer, ensure that the following DOM elements are present in your HTML markup:

	<span id="days"></span> : <span id="hours"></span> : <span id="mins"></span> : <span id="secs"></span>

The resulting Javascript injected markup will display the current time remaining to the `targetDate` in `dd : hh : mm : ss` format, updated once per second.

Because jDoom uniquely targets DOM elements by `id` attribute, _multiple instances of jDoom can be instantiated on a single page_.