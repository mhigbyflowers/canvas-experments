const Merge = require('broccoli-merge-trees');
const Sass = require('broccoli-sass');
const LiveReload = require('broccoli-inject-livereload');
const Autoprefixer = require('broccoli-autoprefixer');
const CssOptimizer = require('broccoli-csso');

let pubFiles = new LiveReload('public');

if (process.env.EMBER_ENV === 'production') {
  pubFiles = 'public';
}

const stylePaths = [
  'styles',
  'node_modules/normalize-css',
  'node_modules/font-awesome/scss',
  'node_modules/yoga-sass/assets',
];

const compiledSass = new Sass(stylePaths, 'app.scss', 'app.css');
const optimizedCSS = new CssOptimizer(compiledSass);
const styles = new Autoprefixer(optimizedCSS);

module.exports = new Merge([pubFiles, styles]);
