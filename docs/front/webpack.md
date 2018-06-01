# webpack

* 这两天逛了下webpack文档，结果把自己惊讶到了。我之前一直以为阅读过webpack文档，知道它是啥，觉得自己还是不错的。结果，好吧，我从来没有阅读过webpack文档，真的是哪来的迷之自信。
> 还有一件人生大事，2018.6.1，今天，儿童节这一天，光荣的毕业啦，从此不再是一个孩子，是一个社会人士啦。希望未来一直能够如这个月一样，保持初心，抛弃社会的浮躁心理。步入社会的这一年，真的经历过太多的事，幼稚，自以为事的做了很多傻事，也可能伤害到了一些人，把自己弄的越来越不像刚进入社会的大学生的那样有闯劲和对事事抱有新鲜感。感谢人生中出现的一些贵人，帮我度过了人生中这样的一段低谷期，在孤独迷茫的夜晚让我倾述不安，陪我通宵哭泣。也感谢这一个月的大学生涯，帮我找回原来的自己，有点傻，有点幼稚，但是不服输，对未来充满希望的自己！

## 基本plugins介绍
- html-webpack-plugin
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



