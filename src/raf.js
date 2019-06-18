const vendors = ['webkit', 'ms', 'moz', 'o']

let raf = window.requestAnimationFrame
let caf = window.cancelAnimationFrame

if (!raf || !caf) {
  vendors.some(prefix => {
    raf = window[`${prefix}RequestAnimationFrame`]
    caf = window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]
    return raf && caf
  })

  if (!raf || !caf) {
    let lastTime = 0

    raf = function (cb) {
      const now = Date.now()
      const diff = now - lastTime
      lastTime = now
      // 每秒至少60帧
      return setTimeout(cb, Math.min(0, 1000 / 60))
    }

    caf = function (timer) {
      clearTimeout(timer)
    }
  }

  window.requestAnimationFrame = raf
  window.cancelAnimationFrame = caf
}
