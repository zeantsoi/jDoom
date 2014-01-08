/**
*
* @author Zean Tsoi http://www.zeantsoi.com/
*
* jDoom — A pure Javascript countdown timer
*
* The MIT License (MIT)
*
* Copyright (c) 2013 Zean Tsoi
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
*/

"use strict";

function bind(func, context)
{
	var slice=Array.prototype.slice;
	var args=slice.call(arguments, 2);
	return function()
	{
		return func.apply(context, args.concat(slice.call(arguments)));
	};
}

function Doom(options)
{  
	/********************************************
	* Local vars – configuration
	********************************************/
	this.addZero=null;
	this.callback=null;
	this.biDirectional=null;
	this.targetDateStr=null;
	var adjustedOffset;

	/********************************************
	* Local vars – DOM identifiers
	********************************************/
	this.days=null;
	this.hours=null;
	this.mins=null;
	this.secs=null;

	/********************************************
	* Local vars – interval
	********************************************/
	this.interval=null;
	this.calledBack=null;

	/********************************************
	* Initialize local vars
	********************************************/
	var targetDate = options.targetDate || null;
	var targetTime = options.targetTime || '00:00:00';

	adjustedOffset = Doom.adjustOffset(options.utcOffset || null);

	this.days = (options.ids) ? (options.ids.days || 'days') : 'days';
	this.hours = (options.ids) ? (options.ids.hours || 'hours') : 'hours';
	this.mins = (options.ids) ? (options.ids.mins || 'mins') : 'mins';
	this.secs = (options.ids) ? (options.ids.secs || 'secs') : 'secs';

	this.addZero = (options.addZero === false) ? false : true;
	this.callback = options.callback || (function(){});
	this.biDirectional = options.biDirectional || false;
	this.targetDateStr = Doom.strToDate([targetDate, targetTime, adjustedOffset].join(' '));

	this.calledBack = false;

	/* Don't wait for a second to pass before running currentCount */
	this.currentCount();
	this.interval = setInterval(bind(this.currentCount,this), 1000);
}

/********************************************
* Interval functions
********************************************/

Doom.prototype.currentCount=function() {
	var diff;
	var currentTime = Doom.strToDate(Doom.formatDateToStr(new Date()));
	/* If current time less than target time, the count down; otherwise, count up */
	diff = (currentTime < this.targetDateStr) ? this.targetDateStr - currentTime : currentTime - this.targetDateStr;
	this.refresh(diff);
}

/********************************************
* Change events
********************************************/

Doom.prototype.refresh=function(diff) {
	var timeParts = this.getTimeParts(diff);
	var timeVars = [this.days, this.hours, this.mins, this.secs];
	var timeStrings = ['days', 'hours', 'mins', 'secs'];

	/* If difference between current time and target time is less that one second, zero has been reached */
	if (diff < 1000) { this.reachedZero(); }

	for (var i = 0; i < timeVars.length; i++) {
		var element = document.getElementById(timeVars[i]);
		if (element !== null) {
			 element.innerHTML = timeParts[timeStrings[i]+'Part'];
		}
	}
}

Doom.prototype.reachedZero=function() {
	if (!this.biDirectional) { clearInterval(this.interval); }
	if (!this.calledBack) {
		this.callback();
		this.calledBack = true;
	}
}

/********************************************
* Date parsing functions
********************************************/

Doom.prototype.getTimeParts=function(diff) {
	return isNaN( diff ) ? NaN : {
		secsPart: this.formatZero(Math.floor(diff / 1000 % 60)),
		minsPart: this.formatZero(Math.floor(diff / 60000 % 60)),
		hoursPart: this.formatZero(Math.floor(diff / 3600000 % 24)),
		daysPart: this.formatZero(Math.floor(diff / 86400000))
	};
}

Doom.prototype.formatZero=function(number) {
	if (!this.addZero) { return number; }
	return (number.toString().length === 1) ? ('0' + number) : number;
}

Doom.formatDateToStr=function(date) {
	var secsToNow = date.getTime() / 1000;
	var hours = parseInt(secsToNow / 3600) % 24;
	var mins = parseInt(secsToNow / 60) % 60;
	var secs = Math.floor(secsToNow % 60);
	var dateStr = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
	var timeStr = [hours, mins, secs].join(':');
	return [dateStr, timeStr].join(' ');
}

Doom.strToDate=function(dateStr) {
	return (new Date(Date.parse(dateStr)));
}

/********************************************
* Timezone functions
********************************************/

Doom.adjustOffset=function(utcOffset) {
	var adjustedOffset;
	if (utcOffset) {
		var offsetDirection = utcOffset.charAt(0);
		var offsetTime = utcOffset.substring(1).split(':');
		var offsetSecsAbs = (+offsetTime[0]) * 60 * 60 + (+offsetTime[1]) * 60;

		var localOffset = -Math.abs(date.getTimezoneOffset() * 60);

		var adjustedSecs = (localOffset + eval(offsetDirection + offsetSecsAbs));

		var hours = adjustedSecs / (60 * 60);
		var mins = Math.abs(adjustedSecs / 60 % 60);

		adjustedOffset = [hours, mins].join(':');

	} else {
		adjustedOffset = null;
	}
	return adjustedOffset;
}