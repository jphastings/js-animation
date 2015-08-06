$(document).ready(function() {
  $('[data-sprite]').each(function(i, el) {
    el = $(el);
    var img = new Image();
    img.frames = el.data('frames');
    img.onload = function() { startAnimation(el, img) };
    img.src = el.data('sprite');
  });

  function startAnimation(el, img) {
    el.css({
      'height': img.height,
      'width': img.width / parseInt(el.data('frames')),
      'background': "url('" + img.src + "')",
    });
    setInterval(function() { forwardAnimation(el) }, 1000 / parseInt(el.data('fps')));
    el.trigger('load');
  }

  function forwardAnimation(el) {
    el.data('frame', ((el.data('frame') || 0) + 1) % el.data('frames'));
    el.css('background-position', '' + (1 - el.data('frame')) * el.width() + 'px 0');
  }

  $('[data-scroll-pps]').each(function(i, el) {
    el = $(el);
    setInterval(function() { forwardScroll(el) }, 1000 / parseInt(el.data('scroll-pps')));
  });

  function forwardScroll(el) {
    var tileWidth = parseInt(el.css('background-size').split('px')[0]);
    el.pxOffset = ((el.pxOffset || 0) + 1) % tileWidth; // TODO: grab width of tile
    el.css({ 'background-position': '-' + el.pxOffset + 'px 0' });
  }
})