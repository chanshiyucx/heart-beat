export default {

  /**
   * ----------------------------------
   *              数据部分
   * ----------------------------------
   */

  /**
   * Github Issues 配置【文章和说说】，了解 Github Issues api: https://developer.github.com/v3/issues/
   * -----------------------------------
   */
  repo: 'https://api.github.com/repos/chanshiyucx/BlogPosts',
  shuoshuo: 'https://api.github.com/repos/chanshiyucx/BlogShuoShuo',
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效
  pre: '0ad1a0539c5b96fd18fa',
  suf: 'aaafba9c7d1362a5746c',
  // 额外的限制参数【只对文章有效】
  params: '?creator=chanshiyucx&state=open',

  /**
   * Gittalk 配置 【评论功能】，详细文档参见：https://github.com/gitalk/gitalk
   * -----------------------------------
   */
  gitalkOptions: {
    clientID: '655fdc97b211a9f4f4a9',
    clientSecret: '77867cd14723002397338fcb76d139b13bdec439',
    repo: 'BlogComments',
    owner: 'chanshiyucx',
    admin: ['chanshiyucx'],
    distractionFreeMode: false, // 是否开始无干扰模式【背景遮罩】
  },

  /**
   * leancloud 配置 【文章浏览次数】
   * -----------------------------------
   */
  leancloud: {
   appId: 'gpbQXGSvwOMTfL6lj5aWUMAA-gzGzoHsz',
   appKey: 'avh1gAX4lKkcQQMa1EReztCt',
  },


  /**
   * ----------------------------------
   *            站点配置信息
   * ----------------------------------
   */

  // 站点标题
  title: '蝉時雨',
  subtitle: '蝉鸣如雨，花宵道中',

  // 加载动画相关
  loadingImg: 'https://dn-coding-net-production-pp.qbox.me/06b36bf5-4fda-4afb-afcb-80700df05834.gif',
  duration: 800,  // ms, 动画时间
  minDelay: 1000, // ms, 数据加载的最小等待间隔，使切换更流畅，值不能小于动画时间
  // 加载动画类型，具体效果参考 https://react.semantic-ui.com/modules/transition#transition-example-group-explorer
  //  可选值如下 transitions： [
  //   'scale',
  //   'fade', 'fade up', 'fade down', 'fade left', 'fade right',
  //   'horizontal flip', 'vertical flip',
  //   'drop',
  //   'fly left', 'fly right', 'fly up', 'fly down',
  //   'swing left', 'swing right', 'swing up', 'swing down',
  //   'browse', 'browse right',
  //   'slide down', 'slide up', 'slide right',
  // ]
  transitions: {
    home: 'scale', // 首页文章卡切换动画，默认值为 'scale'
    post: 'drop', // 文章页加载动画, 默认值为 'drop'
    page: 'drop',  // 其余所有页面的加载动画, 默认值为 'drop'
  },

 /**
  * 音乐播放器， skPlayer文档： http://www.chengfeilong.com/skPlayer/
  * -------------------------------------------------------------------
  */
  playerBg: 'https://dn-coding-net-production-pp.qbox.me/a4dbbbec-97c8-4a90-9ecc-f71c61dac16e.png',
  playerType: 'file', // 歌单形式，自己设置playList或者使用网易云音乐【'file' or 'cloud'】
  playListId: '', // 网易云音乐歌单id，网易云不支持https, https站点需要自传歌单链接
  // 自传歌单配置如下，如不需要支持https，直接使用网易云是更好的选择
  playList: [{
    name: 'うたかたの风と蝉时雨',
    author: 'Little Planet',
    src: 'https://p1.music.126.net/24NNCkr1YPZYj3PGHjmQhg==/2051688697442345.mp3',
    cover: 'https://dn-coding-net-production-pp.qbox.me/b706547f-9237-48fb-ace9-89f9506ab099.jpg'
  }, {
    name: '春の凑に ~ Lost shiners',
    author: '莲弾奏结界',
    src: 'https://p1.music.126.net/J1y0rz-ACI3dPSokXzcitA==/5637196115709843.mp3',
    cover: 'https://dn-coding-net-production-pp.qbox.me/8fc9411a-4566-417c-8c7c-ea9d9b2bba2e.jpg'
  }, {
    name: '夏阳炎',
    author: '天威梦方',
    src: 'https://p2.music.126.net/XwV3rg9JyE3fT_6MJ6O1Lw==/7839517907200525.mp3',
    cover: 'https://dn-coding-net-production-pp.qbox.me/8ba4d0d1-b717-4506-bae7-ba511efabf9b.jpg'
  }, {
    name: '秋风のとおり道',
    author: '风神华伝',
    src: 'https://p2.music.126.net/qwCORT3KPWUqy1FuAQ2oOQ==/5711962906386817.mp3',
    cover: 'https://dn-coding-net-production-pp.qbox.me/324d613f-51b6-462e-8e63-b8f914e5e27b.jpg'
  }, {
    name: '冬のわすれもの',
    author: 'ハルノカゼ',
    src: 'https://p2.music.126.net/xJQQMD9TNAILEjLhAlBbkA==/3162195441566460.mp3',
    cover: 'https://dn-coding-net-production-pp.qbox.me/0d153fd1-e458-47e7-9f8b-78939301c9c4.jpg'
  }],

  /**
   * ----------------------------------
   *            页面配置相关
   * ----------------------------------
   */

  /**
   * 吟诗一句【各个页面置顶的引言】
   * ----------------------------------------------
   */
  qoutes: {
    archives: '文章千古事，得失寸心知',
    categories: '行云流水，落笔生花',
    tags: '列卒周匝，星罗云布',
    books: '吾生也有涯，而知也无涯',
    shuoshuo: '欲言又止，止言又欲',
    friends: '莫愁前路无知己，天下谁人不识君',
    about: '蝉鸣如雨，花宵道中',
  },

   /**
    * 分类页面【与 Github Issues 的 Milestone 对应】
    * ----------------------------------------------
    */
   catsInfo: [
     {
       name: '事件簿', // name 和 Milestone 相匹配
       text: '今天又是和平的一天~',
       img: 'https://dn-coding-net-production-pp.qbox.me/ccde131b-2030-480c-9ae6-47864ec7b7a6.jpg',
     },
     {
       name: '技术向',
       text: '技术什么的不懂啦',
       img: 'https://dn-coding-net-production-pp.qbox.me/40c9bd4d-e39a-436d-836d-152d5e8a0dee.jpg',
     },
     {
       name: '笔记本',
       text: 'emmmmmm',
       img: 'https://dn-coding-net-production-pp.qbox.me/5b558b08-5f3a-4e53-a5bd-24ce7a6a2213.jpg',
     },
     {
       name: '代码库',
       text: 'Write the code, Change the World',
       img: 'https://dn-coding-net-production-pp.qbox.me/aa42635d-caa9-47a5-bd52-92e568d2eef7.jpg',
     },
     {
       name: '分享境',
       text: '偷偷给你看点东西',
       img: 'https://dn-coding-net-production-pp.qbox.me/3f9966dd-cd17-44fe-a476-2cd0d873d0ac.jpg',
     },
     {
       name: '自言语',
       text: '欲言又止，止言又欲',
       img: 'https://dn-coding-net-production-pp.qbox.me/cc4c43fe-3a0a-436f-a942-fed34bbb8748.jpg',
     },
   ],

  /**
   * 书单页面
   * -------------------------------------------
   */
  booksOptions: {
    showPage: true, // 是否开启书单页面
    enableGitalk: true, // 是否开启评论功能
    books: [{
      name: 'CSS 揭秘',
      author: '【希】韦鲁',
      published: '2016-04-01',
      progress: '正在阅读...',
      ratingIcon: 'star', // 评分形式【'star' or 'heart'】
      rating: 0, // 评分值【0 - 5】
      post: {}, // 相关文章, 需要填 name 和 link
      cover: 'https://dn-coding-net-production-pp.qbox.me/c409fa31-9bbe-4473-ab67-2835ef435c16.jpg',
      link: 'http://www.duokan.com/book/137271',
      desc: '这是一本注重实践的教程，书中揭示了47个鲜为人知的 CSS 技巧，指导中高级 CSS 开发者循序渐进，探寻更优雅的解决方案，攻克每天都会遇到的各种网页样式难题。',
    }, {
      name: '图解 HTTP',
      author: '【日】上野宣',
      published: '2014-05-01',
      progress: '正在阅读...',
      rating: 0,
      post: {},
      cover: 'https://dn-coding-net-production-pp.qbox.me/30b5a6cf-31fa-47d0-9608-1b5af3c58999.jpg',
      link: 'http://www.duokan.com/book/103506',
      desc: '172 张图解轻松入门，Web 前端开发者必备！从基础知识到最新动向，一本书掌握 HTTP 协议。Https 安全通道解析，Nginx 服务器精解宝典，http 权威指南！',
    }, {
      name: '黑客与画家',
      author: '【美】格雷厄姆',
      published: '2011-04-01',
      progress: '正在阅读...',
      rating: 0,
      post: {},
      cover: 'https://dn-coding-net-production-pp.qbox.me/d9d68db0-61d2-4268-bbcf-4b296fad89e8.jpg',
      link: 'http://www.duokan.com/book/246',
      desc: '硅谷创业之父 Paul Graham 的文集，主要介绍黑客即优秀程序员的爱好和动机，讨论黑客成长、黑客对世界的贡献以及编程语言和黑客工作方法等所有对计算机时代感兴趣的人的一些话题。',
    }, {
      name: 'JavaScript 秘密花园',
      author: '伊沃·韦特泽尔 Ivo Wetzel',
      published: '未出版',
      progress: '初读一遍',
      rating: 4,
      post: {},
      cover: 'https://dn-coding-net-production-pp.qbox.me/48ea746c-d17d-42c6-875b-87bee5ad7044.jpg',
      link: 'http://www.jb51.net/onlineread/JavaScript-Garden-CN/#intro',
      desc: 'JavaScript 秘密花园是一个不断更新，主要关心 JavaScript 一些古怪用法的文档。初学者可以籍此深入了解 JavaScript 的语言特性。',
    }, {
      name: '深入浅出 React 和 Redux',
      author: '程墨',
      published: '2017-05-01',
      progress: '正在阅读...',
      rating: 0,
      post: {},
      cover: 'https://dn-coding-net-production-pp.qbox.me/674f0fce-1770-4ed2-8a9e-45248bab0a49.jpg',
      link: 'http://www.duokan.com/book/143695',
      desc: '由浅入深地介绍，如何用 React 和 Redux 构建现代化的前端项目，产出高质量的前端代码，系统分析 React 和 Redux 结合的优势，与开发技巧，为开发大型系统提供参考。',
    }],
  },

 /**
  * 说说页面
  * -------------------------------------------
  */
 shuoshuoOptions: {
   showPage: true,
   enableGitalk: true,
 },

 /**
  * 友链页面
  * -------------------------------------------
  */
  friendsOptions: {
    showPage: true,
    enableGitalk: true,
    friends: [{
      name: '阁子',
      link: 'https://newdee.cf/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/3c331ee2-416a-4f2f-8fb6-c8d27d0dcd78.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/840fe017-3fa9-4c18-aab2-de121cb5d090.jpg',
    }, {
      name: '后宫学长',
      link: 'https://haremu.com/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/65b887ca-c794-4032-a7cb-0d2c14fb13e3.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/16a8ac35-fa15-41f7-8abe-c92cac69bc74.jpg',
    }, {
      name: '⊿叶之色☆～',
      link: 'http://leaful.com/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/8b809764-b6e3-4377-9f39-e40298c9b489.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/d9f0428c-38ef-4152-ba08-feff5f4fba36.jpg',
    }, {
      name: '惶心',
      link: 'https://tech.hxco.de/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/20cc9237-c715-4fba-9fac-f605f12c382a.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/4bc438fc-c91d-4c73-9c24-d1b3b16a9b03.jpg',
    }, {
      name: 'Blessing Studio',
      link: 'https://blessing.studio/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/ab28f198-6d1a-4dee-b567-7132d4eccbc2.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/f97a0160-6f2f-4c14-b358-e4e1d8b79b14.jpg',
    }, {
      name: '梓喵出没',
      link: 'http://www.azimiao.com/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/9631a235-98f7-4576-9055-7743a4050bbb.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/116aef18-0944-46d2-b1f4-a0537272a56b.jpeg',
    }, {
      name: '稗田千秋',
      link: 'https://wind.moe/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/871a7270-fbcd-49dc-8097-99b72af66ca0.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/db33586a-1eaf-4bf3-9a28-edeb524f5b2d.jpg',
    }, {
      name: '痴情的小五',
      link: 'https://cherryml.com/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/2452875d-3e00-4977-b87c-d9103cc09cac.png',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/efeeef11-860b-4ff2-b61c-bc9766be5f03.jpg',
    }, {
      name: '林洋洋',
      link: 'http://linyy.name/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/52e24936-96af-48b2-bfd7-168ac525cc04.jpg',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/3205121a-0278-4d12-a3e8-df4cd355605c.jpg',
    }, {
      name: '樱花庄的白猫',
      link: 'https://2heng.xin/',
      cover: 'https://dn-coding-net-production-pp.qbox.me/9540dcf6-e49a-4bed-9dab-f9858ded0f7d.jpg',
      avatar: 'https://dn-coding-net-production-pp.qbox.me/e50bded5-fbee-49bf-9e99-7a5feaf8081b.jpg',
    }],
  },

 /**
  * 关于页面
  * -------------------------------------------
  */
  aboutOptions: {
    showPage: true,
    enableGitalk: true,
    // 头像
    avatar: 'https://dn-coding-net-production-pp.qbox.me/2af1a90f-4b60-4abd-a7b3-a64a903aa921.png',
    // 右侧的介绍，不建议超过四行
    info: [{
      icon: 'user',
      text: '蝉時雨',
    }, {
      icon: 'envira',
      text: '蝉鸣如雨，花宵道中',
    }, {
      icon: 'university',
      text: 'University of Electronic Science and Technology of China (UESTC)',
    }, {
      icon: 'graduation',
      text: 'Communication&Information Engineering',
    }],
    // 自行添加模块，支持 markdown 语法和 font-awesome 图标，content 行首不要空格，可以模仿以下示例
    // 颜色可选值13种， colors: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'],
    // 颜色卡参见： https://react.semantic-ui.com/layouts/theming
    section: [{
      color: 'pink',
      title: 'Origin',
      content: `
蝉時雨，源自日语 せみしぐれ。

夏日众蝉鸣叫此起彼伏好似落雨，蝉儿们似要将仅存的的生命燃烧奏出最后的音符，绚烂与壮美中氤氲着沉寂与无常，是日本夏天最具代表性的季节物语之一。

正如蝉儿一般，生命短暂即逝，却仍一无反顾奏出生命的最强音，而我的青春岁月又何尝不期望如此，在最美的年华绽放最璀璨的人间烟火。

蝉鸣如雨，花宵道中，一如少年。
      `,
    }, {
      color: 'orange',
      title: 'Contact',
      content: `
[<i class="fa fa-envelope" aria-hidden="true"></i> E-Mail：1124590931@qq.com](http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=5dTU19HQ3NXc1tSllJTLhoqI) <br />
[<i class="fa fa-github" aria-hidden="true"></i> Github：@chanshiyucx](https://github.com/chanshiyucx) <br />
[<i class="fa fa-globe" aria-hidden="true"></i> 知乎：@蝉時雨](https://www.zhihu.com/people/ichanshiyu/activities) <br />
[<i class="fa fa-music" aria-hidden="true"></i> 网易云音乐：@天璇北落](https://music.163.com/#/user/home?id=103060582) <br />
      `,
    }, {
      color: 'yellow',
      title: 'Timeline',
      content: `
2017-12-31: React 重写 SPA 博客，全站使用 Github Issues <br />
2017-07-??: 魔改 NexT，风格转变二次元 <br />
2017-04-??: 博客荒废中重生，迁入 Hexo，主题 NexT <br />
2016-03-17: 购入域名 chanshiyu.com，小站起步 <br />
      `,
    }, {
      color: 'purple',
      title: 'Theme',
      content: `
如你所见，现在呈现在你眼前的是一个 React 开发的 SPA 单页面博客应用程序，后台数据源依托于 Github Issues，前端框架采用 React + Dva，组件库采用 Semantic-UI，样式方案采用 Styled Components。
此外，还使用开源项目 Gitalk 作为博客的评论系统，Gitter 扩展博客留言功能，基本上使用了 Github 全家桶套餐。
技术栈：React + Dva + Semantic-UI + Styled Components + Github Issues。

写这个主题的初衷是因为 Hexo 已经不能满足自己日益增长的功能定制需求，便逐渐萌生了自己写博客主题的想法，于是 HeartBeat 就此诞生，而这也是第一个自己从零开始独立完成的博客主题。

我将这个主题命名为 HeartBeat，纯粹只是因为喜欢 HeartBeat 这个字体图标而已，由于后台使用了 Github 全家桶，这个博客程序不需要额外的服务器，完全免费。

目前主题刚刚成型，需要完善地方还有很多，优化之路还很漫长，希望将来正如主题的名字一样，让人第一眼萌生 HeartBeat 的感觉~

### 版本更新：
2018-01-07: 移除 Gitter 留言功能, 添加音乐播放器 skPlayer 并魔改样式，添加书单页 <br />
2017-12-31: HeartBeat Version 1.0 问世 <br />
      `,
    }]
  }
}
