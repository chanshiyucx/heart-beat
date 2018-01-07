export default {
  /*
   * Github Issues 配置
   */
  repo: 'https://api.github.com/repos/chanshiyucx/BlogPosts',
  shuoshuo: 'https://api.github.com/repos/chanshiyucx/BlogShuoShuo',
  // token 需要拆开成两部分
  pre: '0ad1a0539c5b96fd18fa',
  suf: 'aaafba9c7d1362a5746c',
  // 额外的限制参数
  params: '?creator=chanshiyucx&state=open',

  /*
   * Gittalk 配置
   */
   gitalkOptions: {
     clientID: '655fdc97b211a9f4f4a9',
     clientSecret: '77867cd14723002397338fcb76d139b13bdec439',
     repo: 'BlogComments',
     owner: 'chanshiyucx',
     admin: ['chanshiyucx'],
     // facebook-like distraction free mode
     distractionFreeMode: false,
   },

  /*
   * leancloud 配置
   */
   leancloud: {
     appId: 'gpbQXGSvwOMTfL6lj5aWUMAA-gzGzoHsz',
     appKey: 'avh1gAX4lKkcQQMa1EReztCt',
   },

  /*
   * 站点信息
   */
  title: '蝉時雨',
  subtitle: '蝉鸣如雨，花宵道中',

  /*
   * 加载动画
   */
  loadingImg: 'https://dn-coding-net-production-pp.qbox.me/06b36bf5-4fda-4afb-afcb-80700df05834.gif',
  duration: 800,
  minDelay: 800,

  /*
   * 分类
   */
   catsInfo: {
     '事件簿': {
       text: '今天又是和平的一天~',
       img: 'https://dn-coding-net-production-pp.qbox.me/ccde131b-2030-480c-9ae6-47864ec7b7a6.jpg',
     },
     '技术向': {
       text: '技术什么的不懂啦',
       img: 'https://dn-coding-net-production-pp.qbox.me/40c9bd4d-e39a-436d-836d-152d5e8a0dee.jpg',
     },
     '笔记本': {
       text: 'emmmmmm',
       img: 'https://dn-coding-net-production-pp.qbox.me/5b558b08-5f3a-4e53-a5bd-24ce7a6a2213.jpg',
     },
     '代码库': {
       text: 'Write the code, Change the World',
       img: 'https://dn-coding-net-production-pp.qbox.me/aa42635d-caa9-47a5-bd52-92e568d2eef7.jpg',
     },
     '分享境': {
       text: '偷偷给你看点东西',
       img: 'https://dn-coding-net-production-pp.qbox.me/3f9966dd-cd17-44fe-a476-2cd0d873d0ac.jpg',
     },
     '自言语': {
       text: '欲言又止，止言又欲',
       img: 'https://dn-coding-net-production-pp.qbox.me/cc4c43fe-3a0a-436f-a942-fed34bbb8748.jpg',
     },
   },

   /*
    * 书单
    */
   book: [{
     name: 'CSS 揭秘',
     author: '【希】韦鲁',
     published: '2016-04-01',
     progress: '正在阅读...',
     rating: 0,
     post: {},
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
     author: ' 伊沃·韦特泽尔 Ivo Wetzel',
     published: '未出版',
     progress: '初读一遍',
     rating: 4,
     post: {},
     cover: 'https://dn-coding-net-production-pp.qbox.me/48ea746c-d17d-42c6-875b-87bee5ad7044.jpg',
     link: 'http://www.jb51.net/onlineread/JavaScript-Garden-CN/#intro',
     desc: 'JavaScript 秘密花园是一个不断更新，主要关心 JavaScript 一些古怪用法的文档。初学者可以籍此深入了解 JavaScript 的语言特性。',
   }],

  /*
   * 友链
   */
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

  /*
   * 关于
   */
  avatar: 'https://dn-coding-net-production-pp.qbox.me/2af1a90f-4b60-4abd-a7b3-a64a903aa921.png',
  contact: [{
    name: 'E-Mail：1124590931@qq.com',
    icon: 'envelope',
    link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=5dTU19HQ3NXc1tSllJTLhoqI',
  }, {
    name: 'Github：@chanshiyucx',
    icon: 'github',
    link: 'https://github.com/chanshiyucx',
  }, {
    name: '知乎：@蝉時雨',
    icon: 'globe',
    link: 'https://www.zhihu.com/people/ichanshiyu/activities',
  }, {
    name: '网易云音乐：@天璇北落',
    icon: 'music',
    link: 'https://music.163.com/#/user/home?id=103060582',
  }],

  // 播放器
  playerBg: 'https://dn-coding-net-production-pp.qbox.me/a4dbbbec-97c8-4a90-9ecc-f71c61dac16e.png',
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
  }]
}
