<template>
  <div class="pay">
    <main>
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{ totalPrice }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcodeStage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img
              src="http://157.122.54.189:9093/images/wx-sweep2.jpg"
              alt="phone"
            />
          </div>
        </el-row>
      </div>
    </main>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  data () {
    return {
      totalPrice: 0,
      checkPayTimer: null
    }
  },
  methods: {
    async checkPay (orderInfo) {
      const { id, orderNo: out_trade_no, payInfo: { nonce_str } } = orderInfo

      const [err, res] = await this.$api.checkpay({
        id,
        out_trade_no,
        nonce_str
      })

      if (err) {
        this.$message.error('支付失败')
        return err
      }

      const statusTxt = res.data.statusTxt

      if (statusTxt === '支付完成') {
        this.$alert('订单支付成功', '提示', {
          type: 'success'
        })
        return true
      }

      return false
    }
  },
  async mounted () {
    const id = this.$route.query.id

    const [err, res] = await this.$api.getAirsOrderById(id)

    if (err) {
      return this.$message.error('获取订单详情信息失败，发生错误')
    }

    const { payInfo: { code_url: codeUrl }, price } = res.data
    const codeCanvas = document.querySelector('#qrcodeStage')

    this.totalPrice = price

    QRCode.toCanvas(codeCanvas, codeUrl, { width: 200 }, err => {
      if (err) {
        this.$message.error('生成二维码失败')
      }
    })


    // 支付结果轮询
    this.checkPayTimer = setInterval(async () => {
      const isPaid = await this.checkPay(res.data)

      if (typeof isPaid !== 'boolean' || isPaid) {
        clearInterval(this.checkPayTimer)
        return
      }
      console.log(isPaid)
    }, 3000)
  },
  destroyed () {
    // 页面销毁时删除计时器
    clearInterval(this.checkPayTimer)
  }
}
</script>

<style scoped lang="scss">
.pay {
  padding: 30px 0;
  background: #f5f5f5;

  main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      margin-top: 10px;
      padding: 30px;
      border-top: 5px orange solid;
      background: #fff;

      h4 {
        margin-bottom: 10px;
        font-size: 28px;
        font-weight: normal;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        height: fit-content;
        padding: 15px;
        border: 1px #ddd solid;

        #qrcodeStage {
          $size: 200px;
          width: $size;
          height: $size;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
