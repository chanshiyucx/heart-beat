# SPA-Blog HeartBeat
[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com)
[![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-1124590931@qq.com-green.svg?style=flat-square)]()

## 关于 HeartBeat
HeartBeat 是一个使用 React 开发 SPA 单页面博客应用程序，后台数据源依托于 [Github Issues](https://developer.github.com/v3/issues/)，前端框架使用 React + Dva，组件库使用 [Semantic-UI](https://react.semantic-ui.com/elements/icon)，样式方案使用 [Styled Components](https://www.styled-components.com)。此外，还使用开源项目 Gitalk 作为博客的评论系统，基本上使用了 Github 全家桶。

技术栈：React + Dva + Semantic-UI + Styled Components + Github Issues  

演示地址：[蝉時雨 ](https://chanshiyucx.github.io/)  
食用指南：[HeartBeat 风味食用指南](https://chanshiyu.com/#/post/11)  
踩坑记：[从零开始制作博客の不完全指北](https://chanshiyu.com/#/post/8)

## 食用指南
### 下载并安装
先将仓库克隆到本地：
```bash
git clone git@github.com:chanshiyucx/SPA-Blog.git
```
安装依赖包：
```bash
cd SPA-Blog
npm install
```

### 配置
修改目录 `src/config.js` 的配置文件，每个配置项都有详细说明，亦可参考 [HeartBeat 风味食用指南](https://chanshiyu.com/#/post/11)，最后别忘了修改 `/public/index.html` 的 `title`。

### 预览
```bash
npm start
```
打开一个新的标签页 http://localhost:8000/#/，便可先行站点预览调试。

### 打包和发布
```bash
npm run build
```
打包完毕，将 `dist` 目录下生成的静态文件发布 Github Pages 或 Coding Pages 即可。

Just enjoy it ฅ●ω●ฅ
