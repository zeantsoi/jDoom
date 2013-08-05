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


function myTimer() {
	var d=new Date();
	var t=d.toLocaleTimeString();
	document.getElementById("demo").innerHTML=t;
}



var Doom = (function(options) {
	var id = options.id || 'doom',
		test = options.test || 'test';

	function countdown() {
		setInterval(function(){myTimer()},1000); // why does this need to be within the function, but myTimer() does not?
	}		


  function begin() {
  	// setInterval(function(){myTimer()},1000); // why doesn't this work?
		countdown(); // called here
		var e = document.getElementById(id);
		e.innerHTML = test;
  }
  return {
    begin: begin
  };
});




function silly() {
  document.title = 'The Future Home of Haggis Rugby Football Club - Launching in ' + counter(dateDiff(new Date(), new Date(1347861600*1000)));
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
  return (number.toString().length == 1) ? ('0' + number) : number;
}

function counter(diff) {
  return diff['d'] + ':' + diff['h'] + ':' + diff['m'] + ':' + diff['s']
}
var diff = dateDiff(new Date(), new Date(1347861600*1000));
