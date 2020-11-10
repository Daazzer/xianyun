<template>
  <span>({{ countDown }}s)</span>
</template>

<script>
export default {
  name: 'CaptchaCountDownTimer',
  data () {
    return {
      countDown: 0,
      countDownTimer: null
    }
  },
  methods: {
    /**
     * 设置验证码发送倒计时
     * @param {number} interval 倒计时的间隔
     * @param {Function} cb 倒计时完毕时回调
     */
    setCountDownTimer (interval, cb) {
      if (interval < 0) {
        try {
          throw new Error('时间间隔不能小于0')
        } catch (error) {
          console.error(error.message)
          cb()
          return
        }
      }
      // 防止定时器多次触发
      clearInterval(this.countDownTimer)
      // 记录开始时刻
      const beginTime = Date.now()
      this.countDown = interval
      this.countDownTimer = setInterval(() => {
        // 每隔一秒获取当前时刻
        const nowTime = Date.now()
        // 对比两个时间间隔
        const diffTime = parseInt((nowTime - beginTime)/1000)
        // 给页面显示倒计时
        this.countDown--
        if (diffTime >= interval) {
          clearInterval(this.countDownTimer)
          cb()
        }
      }, 1000)
    }
  }
}
</script>
