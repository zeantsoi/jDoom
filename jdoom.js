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

/*
Example Usage
*/
/*var e = document.getElementById('test');
alert(e.innerHTML);
e.innerHTML = 'dunno';*/

function detectTZ() {
	var now = new Date().toString();
	var timezone = now.indexOf('(') > -1 ?
	now.match(/\([^\)]+\)/)[0].match(/[A-Z]/g).join('') :
	now.match(/[A-Z]{3,4}/)[0];
	if (timezone == "GMT" && /(GMT\W*\d{4})/.test(now)) timezone = RegExp.$1;

	return timezone;
}

function getTZ(timezone) {
	return (timezone == 'detect' ? detectTZ() : timezone);
}

var id;
var addZero;
var formattedEndDate;
var diff;

var days;
var hours;
var mins;
var secs;

function init(options) {
	var endDate = options.endDate || null;
	var time = options.time || '00:00:00';
	var timezone = getTZ(options.timezone) || 'GMT';

	days = options.days || 'days';
	hours = options.hours || 'hours';
	mins = options.mins || 'mins';
	secs = options.secs || 'secs';

	id = options.id || 'doom';
  addZero = (options.addZero == false) ? false : true;

	formattedEndDate = new Date(Date.parse([endDate, time, timezone].join(' ')));

}

function count() {
		var diff = formattedEndDate - (new Date());
		refresh(timeParts(diff));
		return;
}

function refresh(parts) {
	var partsArray = ['days', 'hours', 'mins', 'secs'];
	for (var i = 0; i < partsArray.length; i++) {
		var element = document.getElementById(partsArray[i]);
		if (element != null) {
			 element.innerHTML = parts[partsArray[i]+'Part'];
		}
	}
}
	

var Doom = (function(options) {
	
	init(options);
	
  function begin() {
  	setInterval(count, 1000);
  }

  return {
    begin: begin
  };
});

function timeParts(diff) {
    return isNaN( diff ) ? NaN : {
        secsPart  : formatZero(Math.floor( diff /     1000 %   60 )),
        minsPart  : formatZero(Math.floor( diff /    60000 %   60 )),
        hoursPart  : formatZero(Math.floor( diff /  3600000 %   24 )),
        daysPart  : formatZero(Math.floor( diff / 86400000        ))
    };
}

function dateDiff( str1, str2 ) {
    var diff = Date.parse( str2 ) - Date.parse( str1 ); 
    return isNaN( diff ) ? NaN : {
        diff : diff,
        ms : Math.floor( diff            % 1000 ),
        s  : formatZero(Math.floor( diff /     1000 %   60 )),
        m  : formatZero(Math.floor( diff /    60000 %   60 )),
        h  : formatZero(Math.floor( diff /  3600000 %   24 )),
        d  : formatZero(Math.floor( diff / 86400000        ))
    };
}



function formatZero(number) {
	if (addZero) {
  	return (number.toString().length == 1) ? ('0' + number) : number;
  } else {
  	return number;
  }
}

function counter(diff) {
  return diff['d'] + ' ' + diff['h'] + ':' + diff['m'] + ':' + diff['s']
}
//var diff = dateDiff(new Date(), new Date(1347861600*1000));
