<template>
  <div class="order">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :infoData="infoData" />

      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      // 机票信息
      infoData: {
        insurances: [] // 初始化保险数据
      }
    }
  },
  async mounted () {
    const { id, seat_xid } = this.$route.query

    const [err, res] = await this.$api.getAirsById(id, { seat_xid })

    if (err) {
      return this.$message.error('获取订单信息失败')
    }

    this.infoData = res.data
  }
}
</script>

<style lang="scss" scoped>
.order {
  width: 1000px;
  margin: 20px auto;
}

.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
