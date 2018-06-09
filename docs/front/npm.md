# npm
包：模块基础上更深层次的抽象。将某个具有独立的功能封装起来，用于发布、更新、依赖管理和版本控制。node.js根据commonJs规范实现了包机制，开发了npm来解决包的发布和获取需求。

### npm基本操作
1. npm install xx@XXX
2. npm uninstall xxx
3. npm update
4. npm outupdate // 检验模块是否已经过时

### 基础
1. 全局安装
```javascript
npm install xx@latest -g
npm install -g xx 
```
2. 不同保存方式
```javascript
npm install xxx --save-dev // 模块名添加进devDependenices
npm install xxx --save //模块名添加进dependencies
dependencies   //项目所依赖的js模块包
devDependencies  //开发时用到的包
```
3. npm install 默认会安装dependencies和devDependencies字段中所有模块
4. npm install --production 默认只安装dependencies字段的模块
5. npm不仅仅可以用于模块管理，还可用于执行命令。比如script字段中可以指定脚本命令，供npm直接调用(npm run xx)<br/>
npm run pretest > npm run test > npm run posttest<br/>
注意：如果执行过程出错就不会执行下面的脚本
6. npm link可以在本地包和全局包之间创建符号链接。
```javascript
npm link express ./node_modules/express -> /user/local/lib/node_modules/express
```

### 包发布流程
1. npm init生成package.json，创建一个index.js作为包的接口，一个简单的包的制作就完成了。
2. npm adduser完成账号的创建，完成后使用npm whoami检测是否取得账号
3. 在package.json所在目录下运行npm publish完成发布
4. 用npm unpublish命令可以取消发布
