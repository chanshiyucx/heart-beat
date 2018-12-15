# HeartBeat - A SPA Blog Theme

[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com) [![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes) [![Email](https://img.shields.io/badge/Emali%20me-me@chanshiyu.com-green.svg?style=flat-square)](me@chanshiyu.com)

![蝉时雨](https://i.loli.net/2018/12/15/5c15047d6d235.png)

HeartBeat 是一个基于 [UmiJS](https://umijs.org/) 开发的 SPA 单页面博客应用程序，后台数据源依托于 [Github Issues](https://developer.github.com/v3/issues/) ，使用开源项目 [Gitalk](https://github.com/gitalk/gitalk) 作为博客评论系统。该主题基于 Github 全家桶，脱离服务器与数据库，关注内容本身，免费食用。

技术栈：UmiJS + Github Issues + Gitalk

在线演示：[蝉時雨](https://chanshiyu.com)

## Getting Started

### Installing

```bash
git@github.com:chanshiyucx/HeartBeat.git
cd HeartBeat
npm install # or yarn
```

### Configuration

修改目录 `src/config.js` 的配置文件，每个配置项都有详细说明。

注意修改项目目录下 `.umirc.js` 的 `title` 为自己的站点标题！

页面模板参考： [文章、关于、标签、分类、书单等模板](https://github.com/chanshiyucx/Blog/issues)

### Preview

```bash
npm start
```

浏览器打开 `http://localhost:8000` 便可访问新的博客！

### Deployment

```bash
umi build
```

打包完毕，将 `dist` 目录下生成的静态文件发布 `Github Pages` 或 `Coding Pages` 即可。

Just enjoy it ฅ●ω●ฅ

## License

This project is licensed under the MIT License.
