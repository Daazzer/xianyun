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
          <FlightsItem />
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

    }
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
