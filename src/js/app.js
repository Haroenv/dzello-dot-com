import cloudinary from "cloudinary-core";
import search from "./search";
import subscribe from "./subscribe";
import discuss from "./discuss";
import ascii from "./ascii";

// search();
// subscribe();
// discuss();
ascii();

$(window).load(function() {
  setTimeout(function() {
    $(".h-title").removeClass("glitch-effect");
  }, 2500);
});

var cl = cloudinary.Cloudinary.new( { cloud_name: "dzello"});
cl.responsive();
