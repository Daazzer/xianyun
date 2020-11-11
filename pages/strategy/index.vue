<template>
  <el-row class="strategy" type="flex" justify="space-between" tag="main">
    <el-col class="strategy-recommend-bar">左边</el-col>
    <el-col class="strategy-comment-bar">
      <el-row class="comment-header">
        <el-row class="search">
          <el-input
            v-model="searchVal"
            placeholder="请输入想去的地方，比如'广州'"
          />
          <el-button class="search-btn" type="text" icon="el-icon-search" />
        </el-row>
        <el-row class="search-recommend">
          <span>推荐：</span>
          <el-link :underline="false" href="https://element.eleme.io" target="_blank">默认链接</el-link>
          <el-link :underline="false" href="https://element.eleme.io" target="_blank">默认链接</el-link>
          <el-link :underline="false" href="https://element.eleme.io" target="_blank">默认链接</el-link>
        </el-row>
        <el-row class="strategy-title" type="flex" justify="space-between" align="middle">
          <h4>推荐攻略</h4>
          <el-button icon="el-icon-edit" type="primary">写游记</el-button>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Strategy',
  data () {
    return {
      searchVal: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.strategy {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
  &-recommend-bar {
    width: 260px;
  }
  &-comment-bar {
    width: 700px;
  }
  .search {
    position: relative;
    .el-input {
      ::v-deep .el-input__inner {
        border: 3px solid #ffa500;
        border-radius: 0;
        &:focus {
          border-color: #ffa500;
        }
      }
    }
    &-btn {
      position: absolute;
      top: 50%;
      right: 0;
      margin-right: 10px;
      transform: translateY(-50%);
      font-size: 24px;
      color: #ffa500;
      ::v-deep .el-icon-search {
        font-weight: bold;
      }
    }
    &-recommend {
      padding: 10px 0;
      color: #666;
      span {
        margin-right: 4px;
        font-size: 12px;
      }
      .el-link {
        @extend span;
        border-bottom: 1px solid transparent;
        &:hover, &.is-underline:hover:after {
          border-bottom: 1px solid #ffa500;
        }
        &:hover {
          color: #ffa500;
        }
      }
    }
  }
  &-title {
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
      background-color: #ffa500;
    }
    h4 {
      font-size: 18px;
      font-weight: 400;
      color: #ffa500;
    }
  }
}
</style>
