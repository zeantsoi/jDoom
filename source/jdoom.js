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

var Doom = (function (options) {  
  "use strict";

  /********************************************
  * Local vars – configuration
  ********************************************/
  var addZero;
  var callback;
  var biDirectional;
  var targetDateStr;
  var targetTimezone;
  var adjustedOffset;

  /********************************************
  * Local vars – DOM identifiers
  ********************************************/
  var days;
  var hours;
  var mins;
  var secs;

  /********************************************
  * Local vars – interval
  ********************************************/
  var interval;
  var calledBack;

  /********************************************
  * Initialize local vars
  ********************************************/
  function init() {

    var targetDate = options.targetDate || null;
    var targetTime = options.targetTime || '00:00:00';

    // targetTimezone = getTimezone(options.targetTimezone) || 'GMT';
    adjustedOffset = adjustOffset(options.utcOffset || null);

    days = (options.ids) ? (options.ids.days || 'days') : 'days';
    hours = (options.ids) ? (options.ids.hours || 'hours') : 'hours';
    mins = (options.ids) ? (options.ids.mins || 'mins') : 'mins';
    secs = (options.ids) ? (options.ids.secs || 'secs') : 'secs';

    addZero = (options.addZero === false) ? false : true;
    callback = options.callback || (function(){});
    biDirectional = options.biDirectional || false;
    targetDateStr = strToDate([targetDate, targetTime, adjustedOffset].join(' '));

    calledBack = false;
  }
  
  /********************************************
  * Interface function
  ********************************************/
  function doom() {
    /* Don't wait for a second to pass before running currentCount */
    currentCount();
    interval = setInterval(currentCount, 1000);
  }

  /********************************************
  * Interval functions
  ********************************************/
  function currentCount() {
    var diff;
    var currentTime = strToDate(formatDateToStr(new Date()));
    /* If current time less than target time, the count down; otherwise, count up */
    diff = (currentTime < targetDateStr) ? targetDateStr - currentTime : currentTime - targetDateStr;
    refresh(diff);
    return;
  }

  /********************************************
  * Change events
  ********************************************/

  function refresh(diff) {
    var timeParts = getTimeParts(diff);
    var timeVars = [days, hours, mins, secs];
    var timeStrings = ['days', 'hours', 'mins', 'secs'];

    /* If difference between current time and target time is less that one second, zero has been reached */
    if (diff < 1000) { reachedZero(); }

    for (var i = 0; i < timeVars.length; i++) {
      var element = document.getElementById(timeVars[i]);
      if (element !== null) {
         element.innerHTML = timeParts[timeStrings[i]+'Part'];
      }
    }
  }
  function reachedZero() {
    if (!biDirectional) { clearInterval(interval); }
    if (!calledBack) {
      callback();
      calledBack = true;
    }
  }

  /********************************************
  * Date parsing functions
  ********************************************/
  function getTimeParts(diff) {
    return isNaN( diff ) ? NaN : {
      secsPart: formatZero(Math.floor(diff / 1000 % 60)),
      minsPart: formatZero(Math.floor(diff / 60000 % 60)),
      hoursPart: formatZero(Math.floor(diff / 3600000 % 24)),
      daysPart: formatZero(Math.floor(diff / 86400000))
    };
  }
  function formatZero(number) {
    if (!addZero) { return number; }
    return (number.toString().length === 1) ? ('0' + number) : number;
  }
  function formatDateToStr(date) {
    var secsToNow = date.getTime() / 1000;
    var hours = parseInt(secsToNow / 3600) % 24;
    var mins = parseInt(secsToNow / 60) % 60;
    var secs = Math.floor(secsToNow % 60);
    var dateStr = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
    var timeStr = [hours, mins, secs].join(':');
    return [dateStr, timeStr].join(' ');
  }
  function strToDate(dateStr) {
    return (new Date(Date.parse(dateStr)));
  }

  /********************************************
  * Timezone functions
  ********************************************/
  function adjustOffset(utcOffset) {
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

  /********************************************
  * Initialize
  ********************************************/
  init();

  /********************************************
  * Return interfacing function
  ********************************************/
  return {
    doom: doom
  };
});