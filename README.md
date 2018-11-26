# HeartBeat - A SPA Blog Theme 

[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com)
[![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-me@chanshiyu.com-green.svg?style=flat-square)]()

HeartBeat 一个基于 Preact 开发的 SPA 单页面博客应用程序，后台数据源依托于 [Github Issues](https://developer.github.com/v3/issues/)，前端框架使用 [UmiJS](https://umijs.org/)。此外，还使用开源项目 [Gitalk](https://github.com/gitalk/gitalk) 作为博客的评论系统，该主题核心基于 Github 全家桶食用。

技术栈：UmiJS + Github Issues + Gitalk

演示地址：[蝉時雨](https://chanshiyu.com)

## Getting Started

### Installing

```bash
git@github.com:chanshiyucx/HeartBeat.git
cd HeartBeat
npm install
```

### Configuration

修改目录 `src/config.js` 的配置文件，每个配置项都有详细说明。

[template](https://github.com/chanshiyucx/Blog/tree/master/Pages)

### Preview

```bash
npm start
```

### Deployment

```bash
umi build
```

打包完毕，将 `dist` 目录下生成的静态文件发布 Github Pages 或 Coding Pages 即可。

Just enjoy it ฅ●ω●ฅ

## License

This project is licensed under the MIT License.
