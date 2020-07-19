const htmlPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new htmlPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
