export default {
  /**
   * ----------------------------------
   *              数据部分
   * ----------------------------------
   */

  /**
   * 站点标题
   * -----------------------------------
   */
  title: '蝉時雨',
  subtitle: '蝉鸣如雨，花宵道中',

  /**
   * Github Issues 配置【文章和说说】，了解 Github Issues api: https://developer.github.com/v3/issues/
   * 为了方便更新，书单、友链、关于页面都单独提取一条 issue，与说说同仓库，格式可参见如下链接
   * 书单： https://github.com/chanshiyucx/BlogPages/issues/10， labels = books
   * 友链： https://github.com/chanshiyucx/BlogPages/issues/9,   labels = friends
   * 关于： https://github.com/chanshiyucx/BlogPages/issues/8,   labels = about
   * 记得分别打上 labels 哦！！！！
   * --------------------------------------------------------------------------------------------------
   */
  // 文章仓库
  posts: 'https://api.github.com/repos/chanshiyucx/BlogPosts',
  // 说说、书单、友链、关于仓库
  pages: 'https://api.github.com/repos/chanshiyucx/BlogPages',
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效
  pre: '0ad1a0539c5b96fd18fa',
  suf: 'aaafba9c7d1362a5746c',
  // 额外的限制参数【作者和状态】
  params: 'creator=chanshiyucx&state=open',

  /**
   * Gittalk 配置【评论功能】，详细文档参见：https://github.com/gitalk/gitalk
   * ---------------------------------------------------------------------------
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
      name: '事件簿', // name 和 Milestone 必须一致！！！
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
  },

  /**
   * 关于页面
   * -------------------------------------------
   */
  aboutOptions: {
    showPage: true,
    enableGitalk: true,
    avatar: 'https://dn-coding-net-production-pp.qbox.me/2af1a90f-4b60-4abd-a7b3-a64a903aa921.png',
    // 右侧的介绍，不建议超过四行
    info: [
      {
        icon: 'user',
        text: '蝉時雨',
      },
      {
        icon: 'envira',
        text: '蝉鸣如雨，花宵道中',
      },
      {
        icon: 'university',
        text: 'University of Electronic Science and Technology of China (UESTC)',
      },
      {
        icon: 'graduation-cap',
        text: 'Communication&Information Engineering',
      },
    ],
  },

  /**
   * ----------------------------------
   *            主题配置
   * ----------------------------------
   */
  // 加载动画相关
  loadingImg:
    'https://dn-coding-net-production-pp.qbox.me/06b36bf5-4fda-4afb-afcb-80700df05834.gif',
  duration: 800, // ms, 动画时间
  minDelay: 1600, // ms, 数据加载的最小等待间隔，使切换更流畅，值不能小于动画时间
  // 加载动画，Motion CSS： http://pavlyukpetr.com/awesome/
  transitions: {
    home: {
      show: 'rotate-in-scale',
      hide: 'rotate-out-scale',
    }, // 首页文章卡切换动画
    page: {
      show: 'bounce-in',
      hide: 'flip-out-x',
    }, // 其余页面的加载动画
    post: 'clip-y-in', // 文章页加载动画
    footer: { // 播放器和滚动按钮
      show: 'bounce-in-left',
      hide: 'back-out-right',
    },
  },

  /**
   * 动态背景 Backstretch, 配置参数详见： https://github.com/jquery-backstretch/jquery-backstretch
   * -------------------------------------------------------------------------------------
   */
  backstretch: {
    bgImg: [
      "https://dn-coding-net-production-pp.qbox.me/d96a4494-5fe7-4417-9ff4-bf9fdb5714cd.jpg",
      "https://dn-coding-net-production-pp.qbox.me/8f0ada95-fa8e-41a0-a6cf-a3d54dfd29fb.jpg",
      "https://dn-coding-net-production-pp.qbox.me/43b04f6d-090f-419e-82d4-bd9fc0c9b2aa.jpg",
      "https://dn-coding-net-production-pp.qbox.me/2720527c-3c7f-4851-9269-41b910dd3ba8.jpg",
      "https://dn-coding-net-production-pp.qbox.me/a2bf66ed-7221-47b2-becb-9b7544353522.jpg",
      "https://dn-coding-net-production-pp.qbox.me/3f90e634-4738-435b-b654-303bff9eb2c9.jpg",
      "https://dn-coding-net-production-pp.qbox.me/a1649947-a5ac-4a9a-97a2-e030344f6e25.jpg",
      "https://dn-coding-net-production-pp.qbox.me/a1ec70b9-7a44-4485-8541-056c14af6c43.jpg",
      "https://dn-coding-net-production-pp.qbox.me/f0b596a6-b3d8-4cff-95fb-a3f21dbcd833.jpg",
      "https://dn-coding-net-production-pp.qbox.me/44815347-b667-4ef0-bacd-5d971ed524e1.jpg",
    ],
    bgOptions: {
      duration: 10000,
      fade: 1000,
      animateFirst: false,
    },
  },

  /**
   * 音乐播放器 skPlayer 详见： http://www.chengfeilong.com/skPlayer/
   * -------------------------------------------------------------------
   */
  playerBg: 'https://dn-coding-net-production-pp.qbox.me/a4dbbbec-97c8-4a90-9ecc-f71c61dac16e.png',
  playerType: 'file', // 歌单形式，自己设置playList或者使用网易云音乐【'file' or 'cloud'】
  playListId: '', // 网易云音乐歌单id，网易云不支持https, https站点需要自传歌单链接
  // 自传歌单配置如下，如不需要支持https，直接使用网易云是更好的选择
  playList: [
    {
      name: 'うたかたの风と蝉时雨',
      author: 'Little Planet',
      src: 'https://p1.music.126.net/24NNCkr1YPZYj3PGHjmQhg==/2051688697442345.mp3',
      cover: 'https://dn-coding-net-production-pp.qbox.me/b706547f-9237-48fb-ace9-89f9506ab099.jpg',
    },
    {
      name: '春の凑に ~ Lost shiners',
      author: '莲弾奏结界',
      src: 'https://p1.music.126.net/J1y0rz-ACI3dPSokXzcitA==/5637196115709843.mp3',
      cover: 'https://dn-coding-net-production-pp.qbox.me/8fc9411a-4566-417c-8c7c-ea9d9b2bba2e.jpg',
    },
    {
      name: '夏阳炎',
      author: '天威梦方',
      src: 'https://p2.music.126.net/XwV3rg9JyE3fT_6MJ6O1Lw==/7839517907200525.mp3',
      cover: 'https://dn-coding-net-production-pp.qbox.me/8ba4d0d1-b717-4506-bae7-ba511efabf9b.jpg',
    },
    {
      name: '秋风のとおり道',
      author: '风神华伝',
      src: 'https://p2.music.126.net/qwCORT3KPWUqy1FuAQ2oOQ==/5711962906386817.mp3',
      cover: 'https://dn-coding-net-production-pp.qbox.me/324d613f-51b6-462e-8e63-b8f914e5e27b.jpg',
    },
    {
      name: '冬のわすれもの',
      author: 'ハルノカゼ',
      src: 'https://p2.music.126.net/xJQQMD9TNAILEjLhAlBbkA==/3162195441566460.mp3',
      cover: 'https://dn-coding-net-production-pp.qbox.me/0d153fd1-e458-47e7-9f8b-78939301c9c4.jpg',
    },
  ],

  /**
   * 主题配色，目前主要用于文章、说说、关于等卡片配色，以后可能会有其他用途
   * 推荐一个好看的取色站，日本の伝統色：http://nipponcolors.com/
   * -----------------------------------------------------------------------
   */
   themeColors: [
    '#DC9FB4', // 撫子
    '#E16B8C', // 紅梅
    '#3A8FB7', // 千草
    '#8F77B5', // 紫苑
    '#6A4C9C', // 桔梗
    '#60373E', // 紫鳶
    '#6F3381', // 菖蒲
    '#005CAF', // 瑠璃
    '#855B32', // 煎茶
    '#D05A6E', // 今様
    '#E79460', // 洗柿
    '#91AD70', // 柳染
    '#516E41', // 青丹
    '#1B813E', // 常磐
    '#33A6B8', // 浅葱
    '#2EA9DF', // 露草
    '#E03C8A', // 躑躅
  ],
}
