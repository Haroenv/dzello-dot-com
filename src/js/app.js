import jQuery from "jquery";
import cloudinary from "cloudinary-core/cloudinary-core-shrinkwrap";
import ascii from "./ascii";
import discuss from "./discuss";
import consulting from "./consulting";
import initialize from "./initialize";
import subscribe from "./subscribe";
import search from "./search";

(function() {
  window.$ = window.jQuery = jQuery;
  var typed = require('./plugins/typed.js');
  var imagesloaded = require("./plugins/imagesloaded.pkgd.js");
  var magnific = require("./plugins/magnific-popup.js");
  var masonry = require("./plugins/masonry.pkgd.js");
  var masonryFilter = require("./plugins/masonry-filter.js");
  var glitchScripts = require("./plugins/glitche-scripts.js");
})();

ascii();
consulting();
discuss();
initialize();
subscribe();

window._search = search;

var cl = cloudinary.Cloudinary.new( { cloud_name: "dzello"});
cl.responsive();
