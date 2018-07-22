// 是否为移动端
export const isMobile = /mobile/i.test(window.navigator.userAgent)

// 预加载图片
export async function loadImgs({ images, width, height }) {
  return new Promise(resolve => {
    const seq = images.map(cover => {
      return new Promise(resolve => {
        const src = `${cover}?imageView2/2/w/${width}/h/${height}`
        let imgObj = new Image()
        imgObj.onload = () => {
          resolve()
        }
        imgObj.onerror = () => {
          resolve()
        }
        imgObj.src = src
      })
    })
    Promise.all(seq).then(() => {
      resolve()
    }).catch(console.error)
  }).catch(console.error)
}

