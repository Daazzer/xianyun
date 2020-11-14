<template>
  <div class="comment-floor">
    <!-- <CommentFloor /> -->
    <div class="comment-floor__content">
      <el-row class="comment-floor-info" type="flex" justify="space-between" align="middle">
        <el-row type="flex" align="middle">
          <span class="username">地球发动机</span>
          <span class="time">2020-11-14 7:37</span>
        </el-row>
        <span class="floor-num">2</span>
      </el-row>
      <p class="comment-floor-message">你个沙雕</p>
      <el-row type="flex">
        <div class="comment-floor-pic">
          <el-image src="http://157.122.54.189:9095/uploads/ef1727a000164749a0fe16cea86eaefe.jpg" />
        </div>
      </el-row>
      <div class="comment-floor-reply">
        <a href="javascript:;">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentFloor'
}
</script>

<style lang="scss" scoped>
.comment-floor {
  padding: 2px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
</style>
