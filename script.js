var birthDateStr = '19960111',
parts = birthDateStr.match(/(\d{4})(\d{2})(\d{2})/),
dateObj = new Date(parts[1], parts[2]-1, parts[3]); // months 0-based!

$(document).ready(function() {
  $('#rotate').rotaterator({fadeSpeed:500, pauseSpeed:1500});
  document.getElementById("age").innerHTML = getAge(dateObj);
});

(function($){
    $.fn.extend({
        rotaterator: function(options) {

            var defaults = {
                fadeSpeed: 500,
                pauseSpeed: 100,
				child:null
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                  var o =options;
                  var obj = $(this);
                  var items = $(obj.children(), obj);
				  items.each(function() {$(this).hide();})
				  if(!o.child){var next = $(obj).children(':first');
				  }else{var next = o.child;
				  }
				  $(next).fadeIn(o.fadeSpeed, function() {
						$(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
							var next = $(this).next();
							if (next.length == 0){
									next = $(obj).children(':first');
							}
							$(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
						})
					});
            });
        }
    });
})(jQuery);

function getAge(birthDate) {
  var now = new Date();

  function isLeap(year) {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
  }

  var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);
  var age = 0;
  for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){
    var daysInYear = isLeap(y) ? 366 : 365;
    if (days >= daysInYear){
      days -= daysInYear;
      age++;
    }
  }
  return age;
}
