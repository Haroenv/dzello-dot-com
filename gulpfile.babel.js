import gulp from "gulp";
import {spawn} from "child_process";
import hugoBin from "hugo-bin";
import gutil from "gulp-util";
import flatten from "gulp-flatten";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

import dotenv from 'dotenv';
import algolia from "./scripts/algolia";

dotenv.load();

const browserSync = BrowserSync.create();

// Hugo arguments
const hugoArgsDefault = ["-d", "../dist", "-s", "site"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

// Development tasks
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, hugoArgsPreview));

// Build/production tasks
gulp.task("build", ["css", "js", "fonts"], (cb) => buildSite(cb, [], "production"));
gulp.task("build-preview", ["css", "js", "fonts"], (cb) => buildSite(cb, hugoArgsPreview, "production"));

// Build/production with algolia
gulp.task("deploy", ['build'], () => { gulp.start("algolia"); });
gulp.task("deploy-preview", ['build-preview'], () => { gulp.start("algolia"); });

// Compile CSS with PostCSS
gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe(postcss([cssImport({from: "./src/css/main.css"}), cssnext(), cssnano({ autoprefixer: false })]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

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

// Move all fonts in a flattened directory
gulp.task('fonts', () => (
  gulp.src("./src/fonts/**/*")
    .pipe(flatten())
    .pipe(gulp.dest("./dist/fonts"))
    .pipe(browserSync.stream())
));

// Development server with browsersync
gulp.task("server", ["hugo", "css", "js", "fonts"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false,
    notify: false
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./src/fonts/**/*", ["fonts"]);
  gulp.watch("./site/**/*", ["hugo"]);
});

gulp.task("algolia", [], (cb) => {
  const appId = process.env.ALGOLIA_APP_ID;
  const adminApiKey = process.env.ALGOLIA_ADMIN_KEY;
  const indexName = `${process.env.ALGOLIA_INDEX_BASE_NAME}-${process.env.COMMIT_REF}`;
  const indexFile = process.env.ALGOLIA_INDEX_FILE;
  Promise.all([
    algolia.pushData(indexName, indexFile),
    algolia.setSettings(appId, adminApiKey, indexName)
  ]).then((results) => {
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
