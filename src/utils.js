import timeago from 'timeago.js'

const t = timeago()

// 是否为移动端
export const isMobile =
  /mobile/i.test(window.navigator.userAgent) || document.body.clientWidth < 1200

// 延时
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

// 文章格式化
export const formatPost = post => {
  const { created_at, body, labels } = post
  const temp = body.split('\r\n')
  const regex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/g
  const cover = regex.exec(temp[0])
  post.cover = {
    title: cover[1],
    src: cover[2]
  }
  post.desc = temp[2]
  post.content = body
  post.date = t.format(created_at, 'zh_CN')
  post.filterLabels = labels.sort((a, b) => a.name.length >= b.name.length)
  return post
}

// 预加载图片
export const loadImg = async ({ images }) => {
  return new Promise(resolve => {
    const seq = images.map(img => {
      return new Promise(resolve => {
        let imgObj = new Image()
        imgObj.onload = () => {
          resolve()
        }
        imgObj.onerror = () => {
          resolve()
        }
        imgObj.src = img
      })
    })
    Promise.all(seq)
      .then(() => {
        resolve()
      })
      .catch(console.error)
  }).catch(console.error)
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()
