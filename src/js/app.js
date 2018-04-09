import cloudinary from "cloudinary-core";
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

var cl = cloudinary.Cloudinary.new( { cloud_name: "dzello"});
cl.responsive();
