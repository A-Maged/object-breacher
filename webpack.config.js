const path = require("path");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src", "index"),
  output: {
    path: path.join(__dirname, "lib"),
    filename: "bundle.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  devtool: "source-map",
};
