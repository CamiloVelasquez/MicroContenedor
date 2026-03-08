const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: { publicPath: 'auto' },
  devServer: { port: 3000 }, // Puerto para el contenedor
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-react'] }
      }
    }]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'contenedor',
      remotes: {
        productos: `productos@${process.env.PRODUCTOS_URL || 'http://localhost:3001'}/remoteEntry.js`,
        carrito: `carrito@${process.env.CARRITO_URL || 'http://localhost:3002'}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};