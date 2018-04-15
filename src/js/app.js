import cloudinary from "cloudinary-core/cloudinary-core-shrinkwrap";
import subscribe from "./subscribe";
import discuss from "./discuss";
import ascii from "./ascii";

subscribe();
discuss();
ascii();

var cl = cloudinary.Cloudinary.new( { cloud_name: "dzello"});
cl.responsive();
