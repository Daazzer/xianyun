<template>
  <el-row class="publish w" type="flex" justify="space-between">
    <el-col class="publish-content">
      <h2>发表新攻略</h2>
      <p class="publish-content__tips">分享你的个人游记，让更多人看到哦！</p>
    </el-col>
    <el-col class="publish-draft">
      草稿
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'StrategyPublish'
}
</script>

<style lang="scss" scoped>
.publish-content {
  width: 750px;
  h2 {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  &__tips {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
}
.publish-draft {
  width: 225px;
}
</style>
