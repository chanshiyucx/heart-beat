import AV from 'leancloud-storage'
import fetch from 'dva/fetch'
import config from '../config'

const { posts, pages, pre, suf, params } = config
const token = `access_token=${pre}${suf}`

// 状态检测
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) return response
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// 文章总数
export async function queryTotal() {
  // 一次获取全部文章，估测没什么影响，先以 200 做限制
  const url = `${posts}/issues?${params}&page=1&per_page=200&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const totalList = await response.json()
  return totalList
}

// 文章列表
// export async function queryList({ page = 1, pageSize = 4 }) {
//   const url = `${posts}/issues?${params}&page=${page}&per_page=${pageSize}&${token}`
//   const response = await fetch(url)
//   checkStatus(response)
//   const postList = await response.json()
//   return postList
// }

// 分类文章
export async function filterList({ type, filter }) {
  const url = `${posts}/issues?${type}=${filter}&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const postList = await response.json()
  return postList
}

// 单个文章
export async function queryPost({ number }) {
  const url = `${posts}/issues/${number}?${params}&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const post = await response.json()
  return post
}

// 分类
export async function queryCats() {
  const url = `${posts}/milestones?${token}`
  const response = await fetch(url)
  checkStatus(response)
  const cats = await response.json()
  return cats
}

// 标签云
export async function queryTags() {
  const url = `${posts}/labels?${token}`
  const response = await fetch(url)
  checkStatus(response)
  const tags = await response.json()
  return tags
}

// 说说总数
export async function queryShuoShuoTotal() {
  const url = `${pages}/issues?${params}&labels=shuoshuo&page=1&per_page=300&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const shuoshuoTotal = await response.json()
  return shuoshuoTotal
}

// 说说
export async function queryShuoShuo({ page = 1, pageSize = 5 }) {
  const url = `${pages}/issues?${params}&labels=shuoshuo&page=${page}&per_page=${pageSize}&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const myShuoShuo = await response.json()
  return myShuoShuo
}

// 书单 && 友链 && 关于
export async function queryPage({ type }) {
  const url = `${pages}/issues?labels=${type}&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const data = await response.json()
  return data[0]
}

// 热度
export async function queryHot({ postList }) {
  return new Promise(resolve => {
    if (window.location.href.includes('http://localhost:8000/')) resolve()
    const seq = postList.map(o => {
      return new Promise(resolve => {
        const query = new AV.Query('Counter')
        const Counter = AV.Object.extend('Counter')
        const { title, id } = o
        query.equalTo('id', id)
        query
          .find()
          .then(res => {
            if (res.length > 0) {
              // 已存在则返回热度
              const counter = res[0]
              resolve(counter.get('time'))
            } else {
              // 不存在则新建
              const newcounter = new Counter()
              newcounter.set('title', title)
              newcounter.set('id', id)
              newcounter.set('time', 1)
              newcounter
                .save()
                .then(() => {
                  resolve()
                })
                .catch(console.error)
            }
          })
          .catch(console.error)
      }).catch(console.error)
    })

    Promise.all(seq)
      .then(data => {
        resolve(data)
      })
      .catch(console.error)
  }).catch(console.error)
}

// 增热度
export async function queryPostHot({ post }) {
  return new Promise(resolve => {
    if (window.location.href.includes('http://localhost:8000/')) resolve()
    const query = new AV.Query('Counter')
    const Counter = AV.Object.extend('Counter')
    const { title, id } = post
    query.equalTo('id', id)
    query
      .find()
      .then(res => {
        if (res.length > 0) {
          // 已存在则加热度
          const counter = res[0]
          counter.fetchWhenSave(true)
          counter.increment('time')
          counter
            .save()
            .then(counter => {
              resolve(counter.get('time'))
            })
            .catch(console.error)
        } else {
          // 不存在则新建
          const newcounter = new Counter()
          newcounter.set('title', title)
          newcounter.set('id', id)
          newcounter.set('time', 1)
          newcounter
            .save()
            .then(() => {
              resolve(1)
            })
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}

// 点赞
export async function likeSite(params) {
  return new Promise(resolve => {
    const query = new AV.Query('Counter')
    query.equalTo('title', 'site')
    query
      .first()
      .then(res => {
        if (params && params.type === 'getTime') {
          resolve(res.get('time'))
        } else {
          res.fetchWhenSave(true)
          res.increment('time')
          res
            .save()
            .then(counter => {
              resolve(counter.get('time'))
            })
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}
