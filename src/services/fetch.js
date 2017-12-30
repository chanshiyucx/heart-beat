import fetch from 'dva/fetch'
import config from '../config'

const { repo, pre, suf, params } = config
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
  const url = `${repo}/issues${params}&page=1&per_page=1&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const data = await response.json()
  return data[0].number
}

// 文章列表
export async function queryList({ page = 1, pageSize = 4 }) {
  const url = `${repo}/issues${params}&page=${page}&per_page=${pageSize}&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const postList = await response.json()
  return postList
}

// 分类文章
export async function filterList({ type, filter }) {
  const url = `${repo}/issues?${type}=${filter}&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const postList = await response.json()
  return postList
}

// 单个文章
export async function queryPost({ number }) {
  const url = `${repo}/issues/${number}${params}&${token}`
  const response = await fetch(url)
  checkStatus(response)
  const post = await response.json()
  return post
}

// 分类
export async function queryCats() {
  const url = `${repo}/milestones?${token}`
  const response = await fetch(url)
  checkStatus(response)
  const cats = await response.json()
  return cats
}

// 标签云
export async function queryTags() {
  const url = `${repo}/labels?${token}`
  const response = await fetch(url)
  checkStatus(response)
  const tags = await response.json()
  return tags
}
