# 单页面博客 HeartBeat
[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com)
[![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-me@chanshiyu.com-green.svg?style=flat-square)]()

## 关于 HeartBeat
HeartBeat 是一个使用 Preact 开发的 SPA 单页面博客应用程序，后台数据源依托于 [Github Issues](https://developer.github.com/v3/issues/)，前端框架使用 [UmiJS](https://umijs.org/)。此外，还使用开源项目 [Gitalk](https://github.com/gitalk/gitalk) 作为博客的评论系统，基本上使用了 Github 全家桶。

技术栈：UmiJS + Github Issues + Gitalk

演示地址：[蝉時雨 ](https://chanshiyu.com)  
踩坑记：[从零开始制作博客の不完全指北](https://chanshiyu.com/#/post/8)

## 食用指南
### 下载并安装
```bash
git@github.com:chanshiyucx/HeartBeat.git
cd HeartBeat
npm install
```

### 配置
修改目录 `src/config.js` 的配置文件，每个配置项都有详细说明，亦可参考 [HeartBeat 风味食用指南](https://chanshiyu.com/#/post/11)。

### 预览
```bash
npm start
```
打开一个新的标签页 http://localhost:8000/#/，便可先行站点预览调试。

### 打包和发布
```bash
umi build
```
打包完毕，将 `dist` 目录下生成的静态文件发布 Github Pages 或 Coding Pages 即可。

Just enjoy it ฅ●ω●ฅ
