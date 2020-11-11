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
      <el-row class="comment-list">
        <el-row class="comment-item comment-item--tb">
          <h4>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h4>
          <p class="comment-item__desc">大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终</p>
          <el-row type="flex" justify="space-between" class="comment-item__images">
            <el-image
              style="width: 100px; height: 100px"
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            />
            <el-image
              style="width: 100px; height: 100px"
              src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png"
            />
            <el-image
              style="width: 100px; height: 100px"
              src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            />
          </el-row>
          <el-row type="flex" justify="space-between" class="comment-item__info">
            <div class="main-info">
              <span><i class="el-icon-location-outline"></i>北京市</span>
              <span>
                by
                <el-image
                  style="width: 15px; height: 15px"
                  src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                />
                地球发动机
              </span>
              <span><i class="el-icon-view"></i>14589</span>
            </div>
            <span class="likes">79赞</span>
          </el-row>
        </el-row>
        <el-row class="comment-item comment-item--lr"></el-row>
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
  .comment-item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
}
</style>
