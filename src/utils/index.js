// 延时
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

// 数组乱序
export const shuffle = (arr) => {
  let i = arr.length, j
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
