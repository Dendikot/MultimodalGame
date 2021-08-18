const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");

module.exports = merge(common, {
	mode: "development",
	target: "web",
	devtool: false,
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	}
});
