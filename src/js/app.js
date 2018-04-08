import search from "./search";
import subscribe from "./subscribe";
import discuss from "./discuss";
import ascii from "./ascii";
import twitter from "./twitter";

// search();
// subscribe();
// discuss();
// ascii();
twitter();

$(window).load(function() {
  setTimeout(function() {
    $(".h-title").removeClass("glitch-effect");
  }, 5000);
});
