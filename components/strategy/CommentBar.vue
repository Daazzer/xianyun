<template>
  <el-col class="strategy__comment-bar">
    <CommentBarHeader />
    <el-row class="comment-list">
      <el-row class="comment-item comment-item--tb">
        <h4>
          <nuxt-link to="#"
            >塞班贵？一定是你的打开方式不对！6000块玩转塞班</nuxt-link
          >
        </h4>
        <p class="comment-item__desc">
          <nuxt-link to="#"
            >大家对塞班岛总存在着dsadsadsadadsadsacascs这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。
            by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终</nuxt-link
          >
        </p>
        <el-row
          type="flex"
          justify="space-between"
          class="comment-item__images"
        >
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
      <el-row
        type="flex"
        justify="space-between"
        class="comment-item comment-item--lr"
      >
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
          <p>
            想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲
            却能感受到十足的欧陆风情——欧式建筑和街道，金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，有直
          </p>
          <el-row
            type="flex"
            justify="space-between"
            class="comment-item__info"
          >
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
    <el-row
      class="comment-pagination"
      type="flex"
      justify="center"
      align="middle"
    >
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
</template>

<script>
export default {
  name: 'CommentBar',
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
.strategy__comment-bar {
  width: 700px;
  h4 {
    font-size: 18px;
    font-weight: 400;
  }
}
.comment-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  h4,
  p {
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
</style>
