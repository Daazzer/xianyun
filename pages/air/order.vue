<template>
  <div class="order">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :infoData="infoData" @select-insurance="handleSelectInsurance" />

      <!-- 侧边栏 -->
      <OrderAside :infoData="infoData"/>
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
        insurances: [], // 初始化保险数据
        seat_infos: {},
        dep_datetime: 0,
        arr_datetime: 0
      }
    }
  },
  methods: {
    handleSelectInsurance (index) {
      // 修改选中状态
      this.infoData.insurances[index].isSelected = !this.infoData.insurances[index].isSelected
    }
  },
  async mounted () {
    const { id, seat_xid } = this.$route.query

    const [err, res] = await this.$api.getAirsById(id, { seat_xid })

    if (err) {
      return
    }

    // 改造保险数据，添加选中状态属性
    res.data.insurances = res.data.insurances.map(v => {
      v.isSelected = false
      return v
    })

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
