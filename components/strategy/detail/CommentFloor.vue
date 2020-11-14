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

  &__content {
    padding: 5px 10px 0;
  }

  &-info {
    font-size: 12px;
    color: #666;
    .time {
      color: #999;
    }
    .username {
      margin-right: 5px;
    }
  }
  &-message {
    margin-top: 10px;
  }
  &-pic {
    $size: 80px;
    width: $size;
    height: $size;
    padding: 5px;
    margin-right: 5px;
    margin-top: 10px;
    border: 1px dashed #ddd;
    border-radius: 6px;
    overflow: hidden;
  }

  &-reply {
    height: 20px;
    line-height: 20px;
    text-align: right;
    color: #1e50a2;
    &:hover a {
      display: inline;
    }
    a {
      display: none;
      font-size: 12px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
