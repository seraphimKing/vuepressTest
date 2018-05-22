# performance

在网上闲逛查阅调试相关资料时，发现一篇利用谷歌控制台performance（原timeline）调试vue源码的文章，
感觉思路很棒，于是借鉴前辈的经验，用这篇文章记录所获，以备将来回顾需要

- 我先去写一个入门级别的vue项目，因为仅仅用来阅读源码，不需要太复杂
``` javascript
<!DOCTYPE html>
<html>
<head>
  <title>Welcome to Vue</title>
  <script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
  <style>
    #app {
      text-align: center;
    }
  </style>
</head>
<body>
  <div id="app">
    <img src="https://vuejs.org/images/logo.png" alt="Vue logo">
    <div>
      <h1>
        {{ title }}
      </h1>
      <h3>
        {{ content }}
      </h3>
      <h6>
        time: {{ time }}
      </h6>
    </div>
    <button @click="handleClick(0)">点击我</button>
    <button @click="handleClick(1)">还原</button>
  </div>

  <script>
    var app = new Vue({
      el: '#app',
      data: {
        title: 'Welcome to performance!',
        content: '尝试利用performance阅读vue',
        time: '2018/5/13',
      },
      methods: {
        handleClick: function (type) {
          const contents = type === 0 ? '呀～被点击了，好害羞' : 'Welcome to performance!'
          this.content = contents
        }
      }
    })
  </script>
</body>
</html>
```
- 打开谷歌隐私窗口（防止收谷歌插件的影响），打开页面
<img :src="$withBase('http://p8phq50xq.bkt.clouddn.com/4.jpg')" alt="4">

- 打开谷歌控制台，点击Performance，再点击左上角实心黑色圆圈。刷新界面，点击弹框中间的stop,
成功后如下图所示：
<img :src="$withBase('http://p8phq50xq.bkt.clouddn.com/6.jpg')" alt="6">

- 我们进行拖拽可以看到在加载vue过程中执行的函数
<img :src="$withBase('http://p8phq50xq.bkt.clouddn.com/7.jpg')" alt="7">

- 我们随意点击，比如点击vue可以看到vue的构造函数具体位置，如下图所示
<img :src="$withBase('http://p8phq50xq.bkt.clouddn.com/8.jpg')" alt="8">

- 点击进入，我们可以看到vue构造函数
<img :src="$withBase('http://p8phq50xq.bkt.clouddn.com/9.jpg')" alt="8">

从performance中我们还可以看到，vue的执行期间还进行了Vue._init执行过程，Vue._init下又进行了mergeOption、initProxy、initRender、initState、Vue.$mount等具体操作，我们都可以从summary看板中找到具体的函数。从而对于Vue的框架有了大致的了解。
