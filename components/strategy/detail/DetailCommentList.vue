<template>
  <ul class="detail-comment-list">
    <li class="detail-comment-item">
      <el-row class="detail-comment-item__info" type="flex" justify="space-between">
        <el-row type="flex" align="middle">
          <el-image src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          <span class="username">地球发动机</span>
          <span class="date">2020-11-14 7:41</span>
        </el-row>
        <span class="floor-num">3</span>
      </el-row>
      <div class="detail-comment-item__content">
        <div class="comment-floor"></div>
        <div class="comment-new">
          <p class="comment-new__message">套娃</p>
          <el-row type="flex">
            <div class="comment-new__pic">
              <el-image src="http://157.122.54.189:9095/uploads/ef1727a000164749a0fe16cea86eaefe.jpg" />
            </div>
          </el-row>
          <div class="comment-new__reply">
            <a href="javascript:;">回复</a>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DetailCommentList'
}
</script>

<style lang="scss" scoped>
.detail-comment-list {
  border: 1px solid #ddd;
}
.detail-comment-item {
  padding: 20px 20px 5px;
  border-bottom: 1px dashed #ddd;
  &__info {
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
    .el-image,
    .username {
      margin-right: 5px;
    }
    .el-image {
      $size: 16px;
      width: $size;
      height: $size;
    }
    .date {
      color: #999;
    }
  }
  &__content {
    .comment-new {
      &__message {
        margin-top: 10px;
      }

      &__pic {
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

      &__reply {
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
  }
}
</style>
