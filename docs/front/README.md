# vuepress

## 入门

网上教程很多，自己写了个简单的vuepress教程全当自己知识记录了

- 安装vuepress，也可以选择全局安装
```
yarn global add vuepress 或者 npm install -g vuepress
```

- 新建文件夹，这里我命名为 vpress，vpress文件夹下新建docs文件夹
```
mkdir vpress
cd vpress
mkdir docs
```

- 在docs文件夹下创建一个README.md文件，可以在内部输入任何内容
```
touch README.md
```

- 打开docs文件夹，执行vuepress dev，打开localhost:8080，就可以看到我们在README.md中写入的内容
```
cd docs
vuepress dev
```

## 基本配置

- 在docs文件夹下创建.vuepress文件夹，并在.vuepress下新建config.js文件
config用于导航栏，标题等基本配置
```
cd docs
mkdir .vuepress
touch config.js
```

- 在config中配置项目的标题和描述
```
module.exports = {
    title: 'blog',
    description: 'Just attempt',
}
```
- 在docs文件夹下创建back、front两个文件夹，文件夹名随意
```
mkdir back
mkdir front
```

- 在back文件夹下创建README.md文件，front文件夹下创建README.md和info.md文件
在内部随意写上一些内容

-  接着就可以在config.js配置导航栏的目录项，以下是我的简易配置
```
module.exports = {
    title: 'blog',
    description: 'Just attempt',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/'},
            { text: 'Guides', link: '/front/'},
            { text: 'Info', link: '/back/'}
        ],
        sidebar: [
            {
                title: '日常随笔',
                collapsable: true,
                children: [
                    '/'
                ]
            },
            {
                title: '前端小结',
                collapsable: true,
                children: [
                    '/front/',
                ]
            },
            {
                title: '后端小结',
                collapsable: true,
                children: [
                    '/back/',
                    '/back/info.md'
                ]
            }
        ]
    }
}
```

此外还可以创建vue组件

- 在.vuepress文件夹下创建components文件夹，我这里建了一个名为'my-comp.vue'的文件
- 我们可以在任意的README.md中调用，这里我在blog下的README.md中直接进行填入
```
echo <my-comp></my-comp>
```

[link github](https://github.com/seraphimKing/vuepressTest)

## 部署

- 这里我用的是surge进行项目部署，所以首先安装surge，根据步骤输入你的邮箱密码，如果没有注册过会自动为你注册
```
npm install -g surge
```

- 在vpress文件夹下进行npm初始化，并安装vuepress
```
npm init 
npm i vuepress
```

- 在package.json中做如下配置，因为我们文档已经放入docs，所以会将dist自动打到docs的.vuepress文件夹下
```
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

- 进行打包构建，成功后我们看到docs文件夹下的.vuepress文件夹下出现dist文件夹
```
yarn docs:build 或者 npm run docs:build
```

- 想用surge进行部署，在vpress执行以下命令
```
surge docs/.vuepress/dist
```

- 如果你有自己的域名，可以执行以下命令，yourdomain.com用你的域名替换
```
surge docs/.vuepress/dist yourdomain.com
```

- 登录你的域名进行相关配置操作
[link domain](http://surge.sh/help/adding-a-custom-domain)

这样，简易的vuepress大致完成了