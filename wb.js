const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotenv = require('dotenv');

// 加载环境变量
const env = dotenv.config().parsed || {};
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// 公共配置
const commonConfig = {
  entry: './src/index.js', // 假设你的 React 入口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true, // 清理旧文件
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 支持 TS/JS
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 或 'ts-loader' for TypeScript
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              'babel-plugin-styled-components', // CSS-in-JS 支持
              process.env.NODE_ENV === 'development' &&
                require.resolve('react-refresh/babel'), // Fast Refresh
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // PostCSS for autoprefixer
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader', // 或 file-loader for larger images
            options: {
              limit: 8192, // 小于 8KB 内联
              name: 'images/[name].[contenthash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader', // 图像优化（压缩）
            options: {
              mozjpeg: { progressive: true, quality: 65 },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }, // 支持 WebP 转换
            },
          },
          // 可添加 responsive-loader for 响应式图像：{ loader: 'responsive-loader', options: { adapter: require('responsive-loader/sharp') } }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 模板 for SSG-like generation
      filename: 'index.html',
    }),
    new webpack.DefinePlugin(envKeys), // 注入环境变量
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 多进程并行处理
        terserOptions: {
          compress: {
            unused: true, // 删除未使用代码
            dead_code: true, // 删除死代码
            drop_console: process.env.NODE_ENV === 'production', // 生产环境删除 console
            drop_debugger: true, // 删除 debugger
            pure_funcs:
              process.env.NODE_ENV === 'production'
                ? ['console.log', 'console.info']
                : [],
          },
          mangle: {
            safari10: true, // Safari 兼容性
          },
          output: {
            comments: false, // 删除注释
            ascii_only: true, // ASCII 输出
          },
        },
        extractComments: false, // 不提取注释到单独文件
      }),
    ], // 压缩和 tree-shaking
    usedExports: true, // 启用 tree-shaking
    sideEffects: true, // package.json 中设置 "sideEffects": false
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -20,
        },
      },
    },
  },
};

// 开发配置（包括 Fast Refresh 和 HMR）
const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
    proxy: {
      '/api': 'http://localhost:5000', // 代理 API 到后端服务器
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(), // Fast Refresh
  ],
};

// 生产配置
const prodConfig = {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};

// 客户端配置（默认 CSR）
const clientConfig = merge(
  commonConfig,
  process.env.NODE_ENV === 'development' ? devConfig : prodConfig
);

// 服务器配置（for SSR）
const serverConfig = merge(commonConfig, {
  target: 'node', // Node.js 环境
  entry: './src/server.js', // 假设你有一个服务器入口文件 for SSR
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: [require('webpack-node-externals')()], // 排除 Node modules
  plugins: [], // 无需 HTML 插件
});

module.exports = [clientConfig, serverConfig]; // 导出双配置
