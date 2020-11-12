<template>
  <el-row class="comment-header">
    <el-row class="comment-header__search">
      <el-input
        v-model="searchVal"
        placeholder="请输入想去的地方，比如'广州'"
      />
      <el-button class="search-btn" type="text" icon="el-icon-search" />
    </el-row>
    <el-row class="comment-header__recommend-text">
      <span>推荐：</span>
      <el-link
        :underline="false"
        href="https://element.eleme.io"
        target="_blank"
        >默认链接</el-link
      >
      <el-link
        :underline="false"
        href="https://element.eleme.io"
        target="_blank"
        >默认链接</el-link
      >
      <el-link
        :underline="false"
        href="https://element.eleme.io"
        target="_blank"
        >默认链接</el-link
      >
    </el-row>
    <el-row
      class="comment-header__title"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <h4>推荐攻略</h4>
      <el-button icon="el-icon-edit" type="primary">写游记</el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'CommentBarHeader'
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
.comment-header {
  &__search {
    position: relative;
    .el-input {
      ::v-deep .el-input__inner {
        border: 3px solid $linkColor;
        border-radius: 0;
        &:focus {
          border-color: $linkColor;
        }
      }
    }
    .search-btn {
      position: absolute;
      top: 50%;
      right: 0;
      margin-right: 10px;
      transform: translateY(-50%);
      font-size: 24px;
      color: $linkColor;
      ::v-deep .el-icon-search {
        font-weight: bold;
      }
    }
  }

  &__recommend-text {
    padding: 10px 0;
    color: #666;
    span {
      margin-right: 4px;
      font-size: 12px;
    }
    .el-link {
      @extend span;
      border-bottom: 1px solid transparent;
      &:hover,
      &.is-underline:hover:after {
        border-bottom: 1px solid $linkColor;
      }
      &:hover {
        color: $linkColor;
      }
    }
  }
  &__title {
    position: relative;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    &::after {
      content: "";
      position: absolute;
      display: block;
      bottom: 0;
      left: 0;
      width: 72px;
      height: 2px;
      background-color: $linkColor;
    }
    h4 {
      color: $linkColor;
    }
  }
}
</style>
