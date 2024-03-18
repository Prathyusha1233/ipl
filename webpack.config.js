const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new JavaScriptObfuscator(
      {
        rotateUnicodeArray: true,
      },
      ["excluded_bundle_name.js"]
    ),
  ],
};
