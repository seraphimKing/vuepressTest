# heroku

2018.6.12<br/>
泡芙酱的动力：有一个非常cute的弟弟，很优秀。想给他做些好玩的<br/>
于是用node仿照教程搭建了一个简单的聊天室。找了一个免费的，简单的demo完全没什么问题的heroku云平台，简单的试了试，觉得还行，就记录一下，防止遗忘。

## heroku
这里我是根据node项目做简单的记录
[link heroku](https://heroku.com)
1. 注册heroku的账号
2. 进入个人面板。点击‘create new app’，输入一个名字，比如'weroom'
3. 点击进入‘weroom’。找到Deploy，他有很多的deploy方法，我就直接用了github
4. 选择自己的仓库名，选择分支，点击发布按钮。

<b>注意：自己的项目里要有名为Procfile的文件，如果是node项目就输入
‘web: node index.js’，index.js是你的启动文件</b>
