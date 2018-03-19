const path = require("path");

module.exports{
  entry: "../src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js";
  },
  module: {
    rules: {
      test: /\.js$/,
      use: {
        loaders: ["babel-loader"],
        options: {
          presets: ["env", "react"]
        }
      }
    }
  }
}
