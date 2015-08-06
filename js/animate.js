$(document).ready(function() {
  var intervals = {};

  function every(milliseconds, fn) {
    intervals[milliseconds] = intervals[milliseconds] || [];
    intervals[milliseconds].push(fn);

    if (intervals[milliseconds].length == 1) {
      setInterval(function () {
        for(var i = 0; i < intervals[milliseconds].length; ++i) {
          intervals[milliseconds][i]();
        }
      }, milliseconds);
    }
  }

  $('[data-sprite]').each(function(i, el) {
    el = $(el);
    var img = new Image();
    img.onload = function() { startAnimation(el, img) };
    img.src = el.data('sprite');
  });

  function startAnimation(el, img) {
    el.css({
      'height': img.height,
      'width': img.width / parseInt(el.data('frames')),
      'background': "url('" + img.src + "')",
    });
    every(1000 / parseInt(el.data('fps')), function() { forwardAnimation(el) });
    el.trigger('load');
  }

  function forwardAnimation(el) {
    el.data('frame', ((el.data('frame') || 0) + 1) % el.data('frames'));
    el.css('background-position', '' + (1 - el.data('frame')) * el.width() + 'px 0');
  }

  $('[data-pan]').each(function(i, el) {
    el = $(el);
    var img = new Image();
    img.onload = function() { startScroll(el, img) };
    img.src = el.data('pan');
  });

  function startScroll(el, img) {
    el.css({
      'height': img.height,
      'background': "url('" + img.src + "')",
    });
    el.imgWidth = img.width;
    every(1000 / parseInt(el.data('fps')), function() { forwardScroll(el) });
  };

  function forwardScroll(el) {
    el.pxOffset = ((el.pxOffset || 0) + parseInt(el.data('speed'))) % el.imgWidth;
    el.css({ 'background-position': '' + (-1 * el.pxOffset) + 'px 0' });
  };
})