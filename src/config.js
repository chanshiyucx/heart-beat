export default {
  /**
   * ====================================
   *            站点功能【必需】
   * ====================================
   */

  /**
   * 站点标题
   */
  title: '蝉時雨',
  subtitle: '蝉鸣如雨，花宵道中',

  /**
   * Github Issues 配置【文章、说说、书单、友链】, Github Issues api: https://developer.github.com/v3/issues/
   */
  // 博客仓库
  blog: 'https://api.github.com/repos/chanshiyucx/Blog',
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效
  pre: '0ad1a0539c5b96fd18fa',
  suf: 'aaafba9c7d1362a5746c',
  // 额外的限制参数【作者和状态】
  open: 'creator=chanshiyucx&state=open',
  closed: 'creator=chanshiyucx&state=closed',

  /**
   * Gittalk 配置【评论功能】，详细文档参见：https://github.com/gitalk/gitalk
   */
  gitalkOption: {
    clientID: '864b1c2cbc4e4aad9ed8',
    clientSecret: '6ca16373efa03347e11a96ff92e355c5cea189bb',
    repo: 'Comment',
    owner: 'chanshiyucx',
    admin: ['chanshiyucx'],
    distractionFreeMode: false, // 是否开始无干扰模式【背景遮罩】
  },

  /**
   * leancloud 配置 【文章浏览次数】
   */
  leancloud: {
    appId: 'b6DWxsCOWuhurfp4YqbD5cDE-gzGzoHsz',
    appKey: 'h564RR5uVuJV5uSeP7oFTBye',
  },

  /**
   * 文章打赏
   */
  reward: [
    {
      type: '支付宝',
      qr: 'https://dn-coding-net-production-pp.qbox.me/b8fd74b0-e563-4aa5-9d49-09f459b9afee.png',
    },
    {
      type: '微信',
      qr: 'https://dn-coding-net-production-pp.qbox.me/9ba82f12-1eb9-4593-89df-f827de4bc0e7.png'
    }
  ],

  /**
   * ====================================
   *            页面配置【自定义】
   * ====================================
   */

  /**
   * 归档配置
   */
  archivesOption: {
    enableGitalk: false,
    qoute: '文章千古事，得失寸心知',
  },

  /**
   * 分类页面【与 Github Issues 的 Milestone 对应】
   */
  catsOption: {
    enableGitalk: false,
    qoute: '行云流水，落笔生花',
    list: [
      {
        name: '事件簿', // name 和 Milestone 必须一致
        text: '今天又是和平的一天~',
        img: 'https://dn-coding-net-production-pp.qbox.me/ccde131b-2030-480c-9ae6-47864ec7b7a6.jpg',
      },
      {
        name: '技术向',
        text: '技术什么的真是不懂啦',
        img: 'https://dn-coding-net-production-pp.qbox.me/40c9bd4d-e39a-436d-836d-152d5e8a0dee.jpg',
      },
      {
        name: '笔记本',
        text: '诶！？我刚刚想说什么来着',
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
    ]
  },

  /**
   * 标签配置
   */
  tagsOption: {
    enableGitalk: false,
    qoute: '列卒周匝，星罗云布',
  },

  /**
   * 说说页面
   */
  moodOption: {
    enableGitalk: true,
    qoute: '欲言又止，止言又欲',
  },

  /**
   * 书单页面
   */
  booksOption: {
    enableGitalk: true,
    qoute: '吾生也有涯，而知也无涯',
  },

  /**
   * 友链页面
   */
  friendsOption: {
    enableGitalk: true,
    qoute: '青青子衿，悠悠我心',
  },

  /**
   * 关于页面
   */
  aboutOption: {
    enableGitalk: true,
    qoute: '蝉鸣如雨，花宵道中',
    avatar: 'https://dn-coding-net-production-pp.qbox.me/2af1a90f-4b60-4abd-a7b3-a64a903aa921.png',
    info: [ // 个人介绍
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
    contact: [ // 联系方式
      {
        icon: 'https://dn-coding-net-production-pp.qbox.me/44351583-d016-479a-a231-d3946f3fdc50.png',
        link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=5dTU19HQ3NXc1tSllJTLhoqI',
      },
      {
        icon: 'https://dn-coding-net-production-pp.qbox.me/6a7cfb7b-ebb7-48db-966e-7e748d70cfb0.png',
        link: 'https://github.com/chanshiyucx',
      },
      {
        icon: 'https://dn-coding-net-production-pp.qbox.me/c8dda842-7003-4c6c-a76d-6971419267e0.png',
        link: 'https://www.zhihu.com/people/ichanshiyu/activities',
      },
      {
        icon: 'https://dn-coding-net-production-pp.qbox.me/801a63e7-1abf-4443-ad0e-661acda1f950.png',
        link: 'https://music.163.com/#/user/home?id=103060582',
      },
    ],
  },

  /**
   * 动态背景 Backstretch
   * 配置参数详见： https://github.com/jquery-backstretch/jquery-backstretch
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
    bgOption: {
      duration: 10000,
      fade: 1000,
      animateFirst: false,
    },
  },

  /**
   * 音乐播放器, 在 skPlayer 基础上修改，详见： http://www.chengfeilong.com/skPlayer/ 
   */
  skPlayerOption: {
    bgImg: 'https://dn-coding-net-production-pp.qbox.me/a4dbbbec-97c8-4a90-9ecc-f71c61dac16e.png',
    autoplay: false,  // 自动播放, 默认为 false, true/false
    listshow: true,   // 列表显示, 默认为 true, true/false
    mode: 'listloop', // 循环模式, 默认为 'listloop', 【'listloop', 列表循环; 'singleloop', 单曲循环】
    source: [         // 自定义歌单
      {
        name: 'うたかたの风と蝉时雨',
        author: 'Little Planet',
        src: 'https://music.163.com/song/media/outer/url?id=729434.mp3',
        cover: 'https://dn-coding-net-production-pp.qbox.me/b706547f-9237-48fb-ace9-89f9506ab099.jpg',
      },
      {
        name: '春の凑に ~ Lost shiners',
        author: '莲弾奏结界',
        src: 'https://music.163.com/song/media/outer/url?id=714830.mp3',
        cover: 'https://dn-coding-net-production-pp.qbox.me/8fc9411a-4566-417c-8c7c-ea9d9b2bba2e.jpg',
      },
      {
        name: '夏阳炎',
        author: '天威梦方',
        src: 'https://music.163.com/song/media/outer/url?id=803557.mp3',
        cover: 'https://dn-coding-net-production-pp.qbox.me/8ba4d0d1-b717-4506-bae7-ba511efabf9b.jpg',
      },
      {
        name: '秋风のとおり道',
        author: '风神华伝',
        src: 'https://music.163.com/song/media/outer/url?id=766272.mp3',
        cover: 'https://dn-coding-net-production-pp.qbox.me/324d613f-51b6-462e-8e63-b8f914e5e27b.jpg',
      },
      {
        name: '冬のわすれもの',
        author: 'ハルノカゼ',
        src: 'https://music.163.com/song/media/outer/url?id=729461.mp3',
        cover: 'https://dn-coding-net-production-pp.qbox.me/0d153fd1-e458-47e7-9f8b-78939301c9c4.jpg',
      },
    ]
  },

  /**
   * 加载动画
   */
  loadingImg: 'https://dn-coding-net-production-pp.qbox.me/06b36bf5-4fda-4afb-afcb-80700df05834.gif',

  /**
   * 主题配色，目前主要用于文章、说说、关于等卡片配色，以后可能会有其他用途
   * 推荐一个好看的取色站，日本の伝統色：http://nipponcolors.com/
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

  /**
   * 文章封面配图
   */
  covers: [
    'https://dn-coding-net-production-pp.qbox.me/8e7e14e4-69f0-4763-b208-2b5a27a9c732.jpg',
    'https://dn-coding-net-production-pp.qbox.me/40294ec6-39aa-4663-89ec-73940dbc1cf7.jpg',
    'https://dn-coding-net-production-pp.qbox.me/e55b19a7-3f5c-4654-a131-9460c0ec865a.jpg',
    'https://dn-coding-net-production-pp.qbox.me/38f38e5f-eb33-40fc-89ab-79866c171e81.jpg',
    'https://dn-coding-net-production-pp.qbox.me/22865cc2-73a6-4530-9a9f-1bbc910dfddd.jpg',
    'https://dn-coding-net-production-pp.qbox.me/8bbcf13b-01e5-4c3c-91b2-2ca2dbf02317.jpg',

    'https://dn-coding-net-production-pp.qbox.me/a62a631b-391c-4fef-a34c-98d9a00d26b9.jpg',
    'https://dn-coding-net-production-pp.qbox.me/c09befb1-5619-4322-ac30-8d38fa954768.jpg',
    'https://dn-coding-net-production-pp.qbox.me/d27c7842-8d29-41b9-aae9-aa305534a38c.jpg',
    'https://dn-coding-net-production-pp.qbox.me/a294a561-82b3-48b5-baeb-57459c9f5e64.jpg',
    'https://dn-coding-net-production-pp.qbox.me/e1b343d2-d211-47a1-bc14-4ad09bee33cd.jpg',
    'https://dn-coding-net-production-pp.qbox.me/2d44888e-7d96-4d17-a1ef-7e7d4502f76f.jpg',
  ]
}