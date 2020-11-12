<template>
  <el-row class="strategy" type="flex" justify="space-between" tag="main">
    <RecommendBar />
    <ArticleBar />
  </el-row>
</template>

<script>
export default {
  name: 'Strategy',
}
</script>

<style lang="scss" scoped>
.strategy {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
}
</style>
