<template>
  <ul class="detail-comment-list">
    <li
      class="detail-comment-item"
      v-for="comment in comments"
      :key="comment.id"
    >
      <el-row class="detail-comment-item__info" type="flex" justify="space-between" align="middle">
        <el-row type="flex" align="middle">
          <el-image src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          <span class="username">{{ comment.account.nickname }}</span>
          <span class="time">{{ comment.created_at | timeFormat }}</span>
        </el-row>
        <span class="floor-num">{{ comment.level }}</span>
      </el-row>
      <div class="detail-comment-item__content">
        <CommentFloor v-if="comment.parent" :floorComment="comment.parent" />
        <div class="comment-new">
          <p class="comment-new__message">{{ comment.content }}</p>
          <el-row type="flex" v-if="comment.pics && comment.pics.length > 0">
            <div
              class="comment-new__pic"
              v-for="pic in comment.pics"
              :key="pic.id"
            >
              <el-image :src="baseURL + pic.url" />
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
import { timeFormat } from '@/plugins/filters'
export default {
  name: 'DetailCommentList',
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  filters: {
    timeFormat
  },
  computed: {
    baseURL () {
      return this.$axios.defaults.baseURL
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-comment-list {
  border: 1px solid #ddd;
}
.detail-comment-item {
  padding: 20px 20px 5px;
  border-bottom: 1px dashed #ddd;
  &:last-child {
    border-bottom: none;
  }
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
    .time {
      color: #999;
    }
  }
  &__content {
    padding-left: 30px;
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
        cursor: pointer;
        .el-image {
          height: 100%;
          ::v-deep &__inner {
            display: block;
            object-fit: cover;
          }
        }
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
