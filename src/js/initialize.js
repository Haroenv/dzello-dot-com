export default function() {
  var width = $(window).width();
  var height = $(window).height();
  if(width < 840) {
    $('.section.started').css({'height': height-30});
  } else {
    $('.section.started').css({'height': height-60});
  }

  $('.preloader').hide();
  $('body').addClass('loaded');

  $('.typed-subtitle').typed({
    stringsElement: $('.typing-subtitle'),
    loop: true
  });
  $('.typed-bread').typed({
    stringsElement: $('.typing-bread'),
    showCursor: false
  });

  setTimeout(function() {
    $(".h-title").removeClass("glitch-effect");
  }, 1500);
}
