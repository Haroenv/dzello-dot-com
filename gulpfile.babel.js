import gulp from "gulp";
import path from "path";
import {spawn} from "child_process";
import hugoBin from "hugo-bin";
import gutil from "gulp-util";
import flatten from "gulp-flatten";
import cleanCSS from "gulp-clean-css";
import less from "gulp-less";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import autoprefixer from "gulp-autoprefixer";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

import dotenv from 'dotenv';
import algolia from "./scripts/algolia";

dotenv.load();
const browserSync = BrowserSync.create();

// Hugo arguments
const hugoArgsDefault = ["-d", "./dist", "-s", "./site"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

// Development tasks
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, hugoArgsPreview));

// Use hugo for watching instead of gulp/browsersync
gulp.task("hugo-server", (cb) => {
  const args = ["server"].concat(hugoArgsDefault).concat(["-w", "-p", "3000", "--disableFastRender"]);
  if (process.env.HUGO_PREVIEW) {
    args.push(...hugoArgsPreview);
  }
  process.env.NODE_ENV = "development";
  return spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      cb();
    } else {
      cb("Hugo build failed");
    }
  });
});

// Build/production tasks
gulp.task("build", ["css", "js"], (cb) => buildSite(cb, [], "production"));
gulp.task("build-preview", ["css", "js"], (cb) => buildSite(cb, hugoArgsPreview, "production"));

// Build/production with algolia
gulp.task("deploy", ['build'], () => { gulp.start("algolia"); });
gulp.task("deploy-preview", ['build-preview'], () => { gulp.start("algolia"); });

// Compile CSS with Less
gulp.task("css", () => (
  gulp.src("./src/css/*.less")
    .pipe(less())
    .pipe(autoprefixer({browsers: [ 'ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10' ]}))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./site/dist/css"))
    .pipe(browserSync.stream())
));


// Watch all assets
gulp.task("watch-assets", () => {
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/css/**/*.{css,less}", ["css"]);
});

// Compile Javascript
gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

// Development server with browsersync
gulp.task("server-browsersync", ["hugo", "css", "js", "watch-assets"], () => {
  browserSync.init({
    server: {
      baseDir: "./site/dist"
    },
    open: false,
    notify: false
  });
  gulp.watch("./site/**/*", ["hugo"]);
});

// Development server with hugo server
gulp.task("server-hugo", ["hugo-server", "css", "js", "watch-assets"]);

// Task to create algolia index and push data
gulp.task("algolia", [], (cb) => {
  const appId = process.env.ALGOLIA_APP_ID;
  const adminApiKey = process.env.ALGOLIA_ADMIN_KEY;
  const indexName = `${process.env.ALGOLIA_INDEX_BASE_NAME}-${process.env.CONTEXT}-${process.env.COMMIT_REF}`;
  const indexFile = process.env.ALGOLIA_INDEX_FILE;
  algolia.setSettings(appId, adminApiKey, indexName).then((result) => {
    return algolia.pushData(indexName, indexFile);
  }).then((results) => {
    console.log("Algolia: data and settings have been sync'd");
    cb();
  }).catch((e) => {
    console.error("Algolia task failed!", e)
    console.trace(e);
    cb(e);
  });
});

/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment = "development") {
  var args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  // for netlify deployment
  if (process.env.BRANCH === "master") {
    args.push(...["--baseURL", process.env.URL + "/"]);
  } else if (process.env.DEPLOY_PRIME_URL) {
    args.push(...["--baseURL", process.env.DEPLOY_PRIME_URL + "/"]);
  }

  // for viewing previews with the default development task
  if (process.env.HUGO_PREVIEW) {
    args.push(...hugoArgsPreview);
  }

  process.env.NODE_ENV = environment;

  return spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
