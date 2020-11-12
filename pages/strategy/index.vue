<template>
  <el-row class="strategy" type="flex" justify="space-between" tag="main">
    <RecommendBar />
    <CommentBar />
  </el-row>
</template>

<script>
export default {
  name: 'Strategy',
  async mounted () {
    const [err, res] = await this.$api.getRecommendCityList()
    if (err) {
      return this.$message.error('获取城市推荐列表数据失败，发生错误')
    }
    console.log(res)
  }
}
</script>

<style lang="scss" scoped>
.strategy {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
}
</style>
