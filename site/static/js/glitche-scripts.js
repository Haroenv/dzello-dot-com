/**
*   Glitche (HTML)
*   Copyright © Glitche by beshleyua. All Rights Reserved.
**/

$(function () {
  'use strict';

  $(window).unload(function() {});

  /* Set full height in blocks */
  var width = $(window).width();
  var height = $(window).height();
  $('.section.started').css({'height': height-60});

  /*Menu mobile*/
  $('header').on('click', '.menu-btn', function(){
    if($('header').hasClass('active')){
      $('header').removeClass('active');
      $('body').addClass('loaded');
    } else {
      $('header').addClass('active');
      $('body').removeClass('loaded');
    }

    return false;
  });

  /* Hide mouse button on scroll */
  $(window).scroll(function(){
    if ($(this).scrollTop() >= 1 /*$('#blue_bor').offset().top*/) {
      $('.mouse_btn').fadeOut();
    }
    else {
      $('.mouse_btn').fadeIn();
    }
  });

  /* On click mouse button, page scroll down */
  $('.section').on('click', '.mouse_btn', function(){
    $('body,html').animate({
      scrollTop: height - 150
    }, 800);
  });

  $('body').on({
    mouseenter: function () {
      $(this).addClass('glitch-effect-white');
    },
    mouseleave: function () {
      $(this).removeClass('glitch-effect-white');
      $('.top-menu ul li.active a.btn').addClass('glitch-effect-white');
    }
  }, 'a.btn, .btn');

  /* Initialize masonry items */
  var $container = $('.box-items');

  $container.imagesLoaded(function(){
    $container.multipleFilterMasonry({
      itemSelector: '.box-item',
      filtersGroupSelector: '.filters',
      percentPosition: true,
      gutter: 0
    });
  });

  /* Initialize masonry filter */
  $('.filters label').on('change', 'input[type="checkbox"]', function() {
    if ($(this).is(':checked')) {
      $(this).parent().addClass('glitch-effect');
    }
    else {
      $(this).parent().removeClass('glitch-effect');
    }
    /* Refresh Portfolio magnific popup */
    $('.has-popup').magnificPopup({
      type: 'inline',
      overflowY: 'auto',
      closeBtnInside: true,
      mainClass: 'mfp-fade'
    });
  });

  /* Portfolio magnific popup */
  $('.has-popup').magnificPopup({
    type: 'inline',
      overflowY: 'auto',
      closeBtnInside: true,
      mainClass: 'mfp-fade'
  });

  /* Resize function */
  $(window).resize(function() {
    var width = $(window).width();
    var height = $(window).height();

    $('.section.started').css({'height': height-60});
  });

  if(width < 840) {
    $('.section.started').css({'height': height-30});
  }
});