# webpack

* 这两天逛了下webpack文档，结果把自己惊讶到了。我之前一直以为阅读过webpack文档，知道它是啥，觉得自己还是不错的。结果，好吧，我从来没有阅读过webpack文档，真的是哪来的迷之自信。
> 还有一件人生大事，2018.6.1，今天，儿童节这一天，光荣的毕业啦，从此不再是一个孩子，是一个社会人士啦。希望未来一直能够如这个月一样，保持初心，抛弃社会的浮躁心理。步入社会的这一年，真的经历过太多的事，幼稚，自以为事的做了很多傻事，也可能伤害到了一些人，把自己弄的越来越不像刚进入社会的大学生的那样有闯劲和对事事抱有新鲜感。感谢人生中出现的一些贵人，帮我度过了人生中这样的一段低谷期，在孤独迷茫的夜晚让我倾述不安，陪我通宵哭泣。也感谢这一个月的大学生涯，帮我找回原来的自己，有点傻，有点幼稚，但是不服输，对未来充满希望的自己！

## webpack易混淆和使用相对较少的几个属性
- output的‘path’和‘publicPath’

  |path|publicPath|
  |:--|:--|
  |出口文件存储位置|多用于在生产环境时将路径内嵌到图片css文件路径中|

### resolve 
用来配置文件路径的指向。可以定义文件跟模块的默认路径及后缀等，节省 webpack 搜索文件的时间、优化引用模块时的体验。常用的包括alias、extensions、root、modulesDirectories属性：<br/>
1. extensions：是个数组，定义资源的默认后缀，比如定义后引用a.js、b.json、c.css等资源可以不用写后缀名直接写a、b、c<br/>
2. alias：用其他模块或路径进行替换

``` javascript
alias: {
  test1: path.resolve(__dirname, 'src/test1/'),// 用test1替换路径'src/test1/'
  test2: path.resolve(__dirname, 'src/test2/')
}
```

### externals
不想把第三方库打包进bundle，但是使用externals配置后，依旧可以在代码中通过CMD、AMD或者window／global全局方式访问
1. 在html中引入第三方库的cdn
2. 在webpack中配置externals
3. 在js中引用

### devtool
配置调试代码的方式，一般只在开发环境中使用
1. eval 设置断点调试，不显示列信息，每个js模块代码用eval()执行，并在每个生成的模块代码尾部加上注释，不会生成.map文件
2. 以设断点调试，不显示列信息，生成相应的.Map文件，并在合并后的代码尾部加上注释//# sourceMappingURL=**.js.map ，可以看到模块代码并没有被eval()包裹，此种模式并没有将调试信息放入D打包后的代码中，保持了打包后代码的简洁性.
其他还有eval-source-map、cheap-source-map、cheap-module-source-map、cheap-module-eval-source-map、hidden-source-map，也可以自己组合，如cheap-module-eval-source-map。


## 基本plugins介绍
### html-webpack-plugin
简单的说，它会自动帮你生成一个html文件，并引用相关的assets（css、js）
1. title 生成html文件标题
2. filename 生成html文件名
3. 根据指定的模版文件生成特定的html文件。常见的模版文件为jade、ejs等在用之前需要安装对应的loader
``` javascript
// webpack.config.js
// npm i jade-loader --save-dev
...
loaders: {
  ...
  {
    test: /\.jade$/,
    loader: 'jade'
  }
}
plugins: [
  new HtmlWebpackPlugin({
    ...
    jade: 'path/myfile.jade'
  })
]
```
4. inject script位于的位置。注入选项。有true、body、head、false等选项
5. minify 对html文件进行压缩
6. hash 给生成的js一个hash值
``` javascript
plugins: [
  new HtmlWebpackPlugin({
    ...
    hash: true
  })
]
result： <script type=text/javascript src=bundle.js？22b9692e22e7be37b57e></script>
```
7. cache 默认值为true，只在内容变化的时候生成一个新文件
8. showErrors 是否显示webpack编译错误
9. chunks 针对多个入口，因为生成多个js文件，决定是否都使用这些js文件
``` javascript
// webpack.config.js
entry: {
  index: path.resolve(__dirname, './src/index.js'),
  index1: path.resolve(__dirname, './src/index1.js'),
  index2: path.resolve(__dirname, './src/index2.js')
}
...
plugins: [
  new HtmlWebpackPlugin({
    ...
    chunks: ['index','index2']
  })
]
result: 
<script type=text/javascript src=index.js></script>
<script type=text/javascript src=index2.js></script>
```
10. excludeChunks 排除掉某些js文件
11. chunksSortMode 决定script标签的引用次序
'none', 'auto', 'dependency', '{function}'。

### UglifyJsPlugin 
1. 安装
```javascript
npm i -D uglifyjs-webpack-plugin
```
2. 使用，在webpack.config.js
```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJsPlugin()
  ]
}
```
js解释器、最小化器、压缩器、美化器工具集。会拖慢webpack编译速度，所以在开发时需要关闭，部署时将其打开。如：在.env中配置一个环境变量‘isproduction’，然后在webpack.config.js加上以下代码
```javascript
if(isProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({sourceMap: true})
  );
}
```

### extract-text-webpack-plugin
抽离css样式，防止样式打包在js中引起页面样式加载错乱情况。
1. 安装
```javascript
npm install extract-text-webpack-plugin
```
2. 配置。在webpack.config.js中引入该插件
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ 
          fallback: "style-loader",  // 编译后用什么loader来提取css文件
          use: "css-loader"  // 需要使用什么样的loader去编译文件
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
// publicfile:用来覆盖项目路径,生成该css文件的文件路径
```

### hot-module-replacement
热更新，无刷新实现代码更新。仅仅适用于开发环境
1. 安装
```javascript
npm install --save-dev webpack-dev-server webpack-dev-middleware express
```
2. 把webpack/hot/dev-server加入到 webpack 配置文件的 entry 项:
```javascript
entry: [
  'webpack-dev-server/client?http://localhost:3000',
  './src/app.js'
],
```
3. 把new webpack.HotModuleReplacementPlugin()加入到 webpack 配置文件的 plugins 项:
```javascript
plugins: [
  new webpack.HotModuleReplacementPlugin()
]
```
4. 在项目根目录新建个server.js文件，将server部分分离到一个单独的 ：
```javascript
ar webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
 
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});
 
server.listen(3000, 'localhost', function(err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:3000/');
});
```
5. 在 package.json 中定义启动监听热加载：
```javascript
"scripts": {
  "start": "node server.js"
}
```

### OccurenceOrderPlugin
通过计算模块出现次数来分配模块。通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID。这个经常被使用可以较快地获得模块。这使得模块可以预读，建议这样可以减少总文件大小。

### ProvidePlugin
定义一个共用的插件入口
```javascript
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
})
```
这样就可直接在文件中使用$，无需再require('jQuery')

### DedupePlugin
检测完全相同(以及几乎完全相同)的文件，并把它们从输出中移除。

### DefinePlugin
主要用来定义全局的环境变量，以便我们在自己的程序中引用它。
```javascript
plugins: [
  new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') // or development
  })
]
```


## 使用优化

#### 区分生产环境和开发环境 
1. package.json里面的script设置环境变量
```javascript
"scripts": {
  "publish-mac": "export NODE_ENV=pro&&webpack -p --progress --color"
}
```
2. 在webpack.config.js中使用process.env.NODE_ENV进行判断

####  使用代码热替换
#### 解决使用import导致文件变大，编译速度变慢
1. 使用webpack的externals属性，不将文件打包进出口文件。
2. 用alias直接配置文件路径

#### 合并公共代码
用commonsChunkPlugin插件来合并一些类似于lodash、bootstrap这类被多个页面共享的类库，合并成一个js
```javascript
new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: "js/common.js",
    chunks: ['index', 'detail]
})
```

#### 通过webpack在项目中使用bootstrap, jquery以及fontawesome
1. 在入口文件中引用下列样式
```javascript
require('bootstrap/less/bootstrap.less');
require('font-awesome/scss/font-awesome.scss');
require('./index.scss');
```
2. 在webpack.config.js的entry中添加一个vendor
```javascript
common: ['jquery', 'bootstrap'],
```
3. 添加相应的loader，并将jquery暴露到全局,让web pack帮助复制font文件
```javascript
{
  test: path.join(config.path.src, '/libs/jq/jquery-2.1.4.min'),
  loader: 'expose?jQuery'
},
{ 
  test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
  loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]' 
}
```
4. 在plugins里添加ProvidePlugin，让$指向jQuery
```javascript
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
})
```

