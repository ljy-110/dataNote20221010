vscode运行打包vue项目内存溢出的报错和解决办法

最近在再弄一个旧项目的时候发现这个项目异常的大，内容涉及很多，导致我在运行的时候发生了内存的溢出，虽然不影响代码跑起来，但是他时不时保存的时候就断了就很烦，没办法，就去找各种办法来解决，下面就是碰到的问题和一些别人的解决办法

这是问题，项目运行的时候，点击保存后内存溢出，项目太大了

![image-20211015095403775](E:\ljy\资料\img\image-20211015095403775.png)

```js
95% emitting
<--- Last few GCs --->

[21992:03DAAAD8]   186031 ms: Scavenge 728.6 (755.0) -> 728.5 (755.0) MB, 1.0 / 0.0 ms  (average mu = 0.997, current mu = 0.969) allocation failure
[21992:03DAAAD8]   186096 ms: Mark-sweep (reduce) 728.5 (755.0) -> 697.5 (744.6) MB, 64.4 / 0.0 ms  (average mu = 0.995, current mu = 0.990) last resort GC in old space requested
[21992:03DAAAD8]   186190 ms: Mark-sweep (reduce) 697.5 (732.6) -> 697.2 (716.8) MB, 93.9 / 0.0 ms  (average mu = 0.986, current mu = 0.000) last resort GC in old space requested


<--- JS stacktrace --->

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
npm ERR! code ELIFECYCLE
npm ERR! errno 134
npm ERR! dust-noise-frontend@1.0.0 dev: `webpack-dev-server --inline --progress --config build/webpack.dev.conf.js`
npm ERR! Exit status 134
npm ERR!
npm ERR! Failed at the dust-noise-frontend@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\DELL\AppData\Roaming\npm-cache\_logs\2021-10-14T07_29_53_146Z-debug.log
```

解决办法

1、启动时加大内存，
vue-cli2：

npm run dev 和 npm run build 直接在前面加上--max_old_space_size=4096

```js
 "scripts": {
      "start": "npm run dev",
    "dev": "node --max_old_space_size=4096 build/dev-server.js",
    "build": "node --max_old_space_size=4096 build/build.js",
  },
```

vue-cli3：
scripts中添加一句指令
安装两个npm包 ： increase-memory-limit 和cross-env
安装完成后，先执行一次 npm run fix-memory-limit，然后npm run serve启动即可

```js
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "fix-memory-limit": "cross-env LIMIT=4096 increase-memory-limit",
  },
```

2、然后就是还有一个办法就是 安装`increase-memory-limit 和 cross-env`

```js
全局安装increase-memory-limit
npm install -g increase-memory-limit
npm install -g cross-env
进入工程目录，执行：
npm run fix-memory-limit 

删除以下的内容
node_modules@vue中的vue.cli.service.js
手动删除：--max-old-space-size=6144
```

就是以上的两个方法了希望对大家有用



能够实现的

```js
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node --max_old_space_size=4096 build/build.js"
  },
```





**2022-03-29**

最后发现是因为node的版本太高，如果要解决只能把node版本给重新安装一次
