// JavaScript Document
// JavaScript Document

$(document).ready(function() {
  $('img.crest').delay(1000).fadeIn(2000);
  $('#counter').delay(2000).fadeIn(3000);
  
  $('#counter').countdown({
    image: 'img/digits.png',
    //startTime: '01:12:12:00'
    startTime: counter(diff)
  });
  
  
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
    
window.setInterval(silly, 1000);

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
