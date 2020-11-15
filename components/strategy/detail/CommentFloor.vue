<template>
  <div class="comment-floor">
    <CommentFloor
      v-if="floorComment.parent"
      :floorComment="floorComment.parent"
      @pic-preview="picPreview"
      @reply-comment="replyComment"
    />
    <div class="comment-floor__content">
      <el-row class="comment-floor-info" type="flex" justify="space-between" align="middle">
        <el-row type="flex" align="middle">
          <span class="username">{{ floorComment.account.nickname }}</span>
          <span class="time">{{ floorComment.created_at | timeFormat }}</span>
        </el-row>
        <span class="floor-num">{{ floorComment.level }}</span>
      </el-row>
      <p class="comment-floor-message">{{ floorComment.content }}</p>
      <el-row type="flex" v-if="floorComment.pics && floorComment.pics.length > 0">
        <div
          class="comment-floor-pic"
          v-for="pic in floorComment.pics"
          :key="pic.id"
          @click="picPreview(baseURL + pic.url)"
        >
          <el-image :src="baseURL + pic.url" />
        </div>
      </el-row>
      <div class="comment-floor-reply">
        <a href="javascript:;" @click="replyComment(floorComment.id)">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import { timeFormat } from '@/plugins/filters'
export default {
  name: 'CommentFloor',
  props: {
    floorComment: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    picPreview (picUrl) {
      this.$emit('pic-preview', picUrl)
    },
    replyComment (id) {
      this.$emit('reply-comment', id)
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
    cursor: pointer;
    .el-image {
      height: 100%;
      ::v-deep &__inner {
        display: block;
        object-fit: cover;
      }
    }
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
