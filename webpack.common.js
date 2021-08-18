const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: "web",
	devtool: false,
	entry: "./src/index.js",
	plugins: [new HtmlWebpackPlugin({
		template: "./src/template.html"
	})],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				type: "asset/resource"
			}
			// {
			// 	test: /\.(png|jpe?g|gif)$/i,
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: '[path][name].[ext]',
			// 	},
			// }
		]
	}
};
