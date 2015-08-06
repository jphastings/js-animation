$(document).ready(function() {
  $('.player').load(loadComplete);

  function loadComplete() {
    $(document).keypress(function(e) {
      if (e.charCode == 32) {
        
        $('.player').animate({
          'bottom': '+=5'
        });
      }
    });
  }
});