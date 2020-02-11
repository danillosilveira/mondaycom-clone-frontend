const withCss = require("@zeit/next-css");

module.exports = withCss({
  webpack(config) {
    return config;
  }
});
