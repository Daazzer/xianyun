<template>
  <el-row class="strategy" type="flex" justify="space-between" tag="main">
    <el-col class="strategy__recommend-bar">
      <el-row class="recommend-cascader">
        <ul class="recommend-list">
          <li class="recommend-item">热门城市<i class="el-icon-arrow-right"></i></li>
          <li class="recommend-item">热门城市<i class="el-icon-arrow-right"></i></li>
          <li class="recommend-item">热门城市<i class="el-icon-arrow-right"></i></li>
          <li class="recommend-item">热门城市<i class="el-icon-arrow-right"></i></li>
        </ul>
        <ol class="recommend-sublist">
          <li class="recommend-subitem">
            <nuxt-link to="#">
              <i>1</i>
              <strong>北京</strong>
              <span>世界著名古都和现代化国际城市</span>
            </nuxt-link>
          </li>
          <li class="recommend-subitem">
            <nuxt-link to="#">
              <i>1</i>
              <strong>北京</strong>
              <span>世界著名古都和现代化国际城市</span>
            </nuxt-link>
          </li>
          <li class="recommend-subitem">
            <nuxt-link to="#">
              <i>1</i>
              <strong>北京</strong>
              <span>世界著名古都和现代化国际城市</span>
            </nuxt-link>
          </li>
          <li class="recommend-subitem">
            <nuxt-link to="#">
              <i>1</i>
              <strong>北京</strong>
              <span>世界著名古都和现代化国际城市</span>
            </nuxt-link>
          </li>
        </ol>
      </el-row>
      <el-row class="recommend-city">
        <h4>推荐城市</h4>
        <nuxt-link to="#">
          <el-image src="http://157.122.54.189:9093/images/pic_sea.jpeg" />
        </nuxt-link>
      </el-row>
    </el-col>
    <el-col class="strategy__comment-bar">
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
          <h4>
            <nuxt-link to="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</nuxt-link>
          </h4>
          <p class="comment-item__desc">
            <nuxt-link to="#">大家对塞班岛总存在着dsadsadsadadsadsacascs这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终</nuxt-link>
          </p>
          <el-row type="flex" justify="space-between" class="comment-item__images">
            <nuxt-link to="#">
              <el-image
                src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              />
            </nuxt-link>
            <nuxt-link to="#">
              <el-image
                src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              />
            </nuxt-link>
            <nuxt-link to="#">
              <el-image
                src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              />
            </nuxt-link>
          </el-row>
          <el-row type="flex" justify="space-between" class="comment-item__info">
            <el-row type="flex" align="middle" class="main-info">
              <span><i class="el-icon-location-outline"></i>北京市</span>
              <el-row type="flex" align="middle">
                by
                <nuxt-link class="user-avatar" to="#">
                  <el-image
                    src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                  />
                </nuxt-link>
                <nuxt-link class="user-nickname" to="#">地球发动机</nuxt-link>
              </el-row>
              <span><i class="el-icon-view"></i>14589</span>
            </el-row>
            <span class="likes">79 赞</span>
          </el-row>
        </el-row>
        <el-row type="flex" justify="space-between" class="comment-item comment-item--lr">
          <div class="comment-item__images">
            <nuxt-link to="#">
              <el-image
                src="https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90"
              />
            </nuxt-link>
          </div>
          <div class="comment-item__content">
            <h4>
              <nuxt-link to="#">
                远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略
              </nuxt-link>
            </h4>
            <p>想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲 却能感受到十足的欧陆风情——欧式建筑和街道，金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，有直</p>
            <el-row type="flex" justify="space-between" class="comment-item__info">
              <el-row type="flex" align="middle" class="main-info">
                <span><i class="el-icon-location-outline"></i>北京市</span>
                <el-row type="flex" align="middle">
                  by
                  <nuxt-link class="user-avatar" to="#">
                    <el-image
                      src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                    />
                  </nuxt-link>
                  <nuxt-link class="user-nickname" to="#">地球发动机</nuxt-link>
                </el-row>
                <span><i class="el-icon-view"></i>14589</span>
              </el-row>
              <span class="likes">79 赞</span>
            </el-row>
          </div>
        </el-row>
      </el-row>
      <el-row class="comment-pagination" type="flex" justify="center" align="middle">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Strategy',
  data () {
    return {
      searchVal: '',
      currentPage4: 4,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
        }]
      }]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>

<style lang="scss" scoped>
.strategy {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
  $linkColor: #ffa500;
  &__recommend-bar {
    width: 260px;
  }
  &__comment-bar {
    width: 700px;
    h4 {
      font-size: 18px;
      font-weight: 400;
    }
  }
  .search {
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
    &-btn {
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
          border-bottom: 1px solid $linkColor;
        }
        &:hover {
          color: $linkColor;
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
      background-color: $linkColor;
    }
    h4 {
      color: $linkColor;
    }
  }
  .comment-item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    h4, p {
      margin-bottom: 15px;
    }
    h4 {
      a {
        &:hover {
          color: $linkColor;
        }
      }
    }
    p {
      display: -webkit-box;
      height: 63px;
      line-height: 1.5;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #666;
    }
    &__images {
      ::v-deep .el-image__inner {
        width: 220px;
        height: 150px;
      }
    }
    &--tb {
      .comment-item__images {
        margin: 15px 0;
      }
    }
    &--lr {
      .comment-item__images {
        margin-right: 10px;
      }
    }
    .main-info {
      font-size: 12px;
      color: #999;
      > * {
        margin-right: 10px;
      }
      .user-avatar {
        margin: 5px;
        .el-image {
          display: block;
          width: 16px;
          height: 16px;
        }
      }
      .user-nickname {
        color: $linkColor;
      }
    }
    .likes {
      color: $linkColor;
    }
  }
  .comment-pagination {
    margin-top: 10px;
  }
  .recommend-cascader {
    position: relative;
    font-size: 14px;
    $border: 1px solid #ddd;
    .recommend-list {
      border-top: $border;
      border-bottom: $border;
      position: relative;
      background-color: #fff;
      z-index: 20;
      .recommend-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 10px 0 20px;
        border-left: $border;
        border-right: $border;
        &:hover {
          border-right-color: #fff;
          &, .el-icon-arrow-right {
            color: $linkColor;
          }
        }
        .el-icon-arrow-right {
          color: #999;
          font-size: 20px;
        }
      }
      .recommend-item + .recommend-item {
        border-top: $border;
      }
    }
    .recommend-sublist {
      position: absolute;
      top: 0;
      left: 259.5px;
      width: 350px;
      padding: 10px 20px;
      border: $border;
      background-color: #fff;
      z-index: 10;
      .recommend-subitem {
        display: flex;
        align-items: center;
        height: 36px;
        line-height: 1.5;
        a {
          display: flex;
          align-items: center;
        }
        i {
          font-size: 24px;
          font-style: italic;
          color: $linkColor;
        }
        strong {
          margin: 0 10px;
          font-weight: normal;
          color: $linkColor;
        }
        span {
          color: #999;
        }
        strong:hover, span:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .recommend-city {
    margin-top: 20px;
    h4 {
      font-weight: 400;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
