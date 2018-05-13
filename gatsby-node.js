exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /json-url/,
      loader: "null-loader",
    });
  }
};