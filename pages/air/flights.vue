<template>
  <section class="flights">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsHeader />

        <!-- 航班信息 -->
        <div>
          <FlightsItem
            v-for="flight in flights"
            :key="flight.id"
            :flight="flight"
          />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'Flights',
  data () {
    return {
      flightsData: {}, // 航班总数据
      flights: []     // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getAirs(this.$route.query)

    if (err) {
      return this.$message.error('获取航班信息失败，发生错误')
    }

    this.flightsData = res.data
    this.flights = this.flightsData.flights
  }
}
</script>

<style scoped lang="scss">
.flights {
  width: 1000px;
  margin: 20px auto;
  &-content {
    width: 745px;
    font-size: 14px;
  }
}

.aside {
  width: 240px;
}
</style>
