import cloudinary from "cloudinary-core/cloudinary-core-shrinkwrap";
import search from "./search";
import subscribe from "./subscribe";
import discuss from "./discuss";
import ascii from "./ascii";

// search();
// subscribe();
// discuss();
ascii();

var cl = cloudinary.Cloudinary.new( { cloud_name: "dzello"});
cl.responsive();
