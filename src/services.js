import AV from 'leancloud-storage'
import fetch from 'dva/fetch'
import config from './config'

const { posts, pages, pre, suf, params } = config
const token = `access_token=${pre}${suf}`

// 状态检测
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) return response
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// 文章总数,一次获取全部文章，先以 200 做限制
export async function queryTotal() {
  try {
    const url = `${posts}/issues?${params}&page=1&per_page=200&${token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

// 分类
export async function queryCats() {
  try {
    const url = `${posts}/milestones?${token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

// 标签
export async function queryTags() {
  try {
    const url = `${posts}/labels?${token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

// 筛选文章
export async function queryFilterPost({ type, filter }) {
  try {
    const url = `${posts}/issues?${type}=${filter}&${token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

// 说说总数
export async function queryShuoShuoTotal() {
  try {
    const url = `${pages}/issues?${params}&labels=shuoshuo&page=1&per_page=300&${token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

// 书单 && 友链 && 关于
export async function queryPage({ type }) {
  try {
    const url = `${pages}/issues?labels=${type}&${token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data[0]
  } catch (e) {
    console.log(e)
  }
}

// 文章热度
export async function queryHot({ postList }) {
  return new Promise(resolve => {
    if (window.location.href.includes('http://localhost:8000/')) {
      resolve(postList)
    }
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
              o.times = counter.get('time')
              resolve(o)
            } else {
              // 不存在则新建
              const newcounter = new Counter()
              newcounter.set('title', title)
              newcounter.set('id', id)
              newcounter.set('time', 1)
              newcounter
                .save()
                .then(() => {
                  resolve(o)
                })
                .catch(console.error)
            }
          }).catch(console.error)
      }).catch(console.error)
    })

    Promise.all(seq)
      .then(data => {
        resolve(data)
      })
      .catch(console.error)
  }).catch(console.error)
}

// 增加热度
export async function queryPostHot({ post }) {
  return new Promise(resolve => {
    if (window.location.href.includes('http://localhost:8000/')) {
      post.times = 1
      resolve(post)
    }
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
              post.times = counter.get('time')
              resolve(post)
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
              post.times = 1
              resolve(post)
            })
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}

// 喜欢小站
export async function likeSite(params) {
  return new Promise(resolve => {
    const query = new AV.Query('Counter')
    const Counter = AV.Object.extend('Counter')
    query.equalTo('title', 'site')
    query
      .first()
      .then(res => {
        if (res) {
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
        } else {
          // 不存在则新建
          const newcounter = new Counter()
          newcounter.set('title', 'site')
          newcounter.set('time', 1)
          newcounter
            .save()
            .then((counter) => {
              resolve(counter.get('time'))
            })
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}
