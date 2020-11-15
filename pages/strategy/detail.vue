<template>
  <el-row class="detail w" type="flex" justify="space-between">
    <el-col class="detail__main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/strategy">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{ strategicalArticle.title }}</h1>
      <el-row class="detail-info">
        <span>创建于：{{ strategicalArticle.created_at | timeFormat }}</span>
        <span>阅读：{{ strategicalArticle.watch || 0 }}</span>
      </el-row>
      <div class="detail-content" v-html="strategicalArticle.content"></div>
      <el-row class="detail-ctrl" type="flex" justify="center" align="middle">
        <div class="detail-ctrl__item">
          <i class="iconfont icon-pinglun"></i>
          <p>评论({{ strategicalArticle.comments.length }})</p>
        </div>
        <div class="detail-ctrl__item">
          <i class="iconfont icon-icon_dianzan-xian"></i>
          <p>点赞({{ strategicalArticle.like || 0 }})</p>
        </div>
        <div class="detail-ctrl__item" @click="$message.warning('暂不支持分享功能')">
          <i class="iconfont icon-iconfontzhizuobiaozhun20"></i>
          <p>分享</p>
        </div>
      </el-row>
      <DetailComment />
    </el-col>
    <el-col class="detail__aside">
      <h4>相关攻略</h4>
      <ul class="recommend-list">
        <li class="recommend-item">
          <a href="#">
            <el-image class="recommend-item__image" src="http://p1-q.mafengwo.net/s11/M00/B4/92/wKgBEFt6ZqaAJeK7AAbj58wpNlY06.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90" />
            <el-row class="recommend-item__content" type="flex" justify="space-between">
              <h5>小蛮腰广州塔，怎么玩才不遗憾？</h5>
              <p>2019-05-22 1:16 阅读 695</p>
            </el-row>
          </a>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'StrategyDetail',
  data () {
    return {
      strategicalArticle: {
        comments: []
      }
    }
  },
  filters: {
    timeFormat (time) {
      if (isNaN(time)) {
        return '-- :'
      }
      const date = new Date(time)
      const MM = date.getMonth() + 1
      const DD = date.getDate()
      const YYYYMMDD = [
        date.getFullYear(),
        MM < 10 ? `0${MM}` : MM,
        DD < 10 ? `0${DD}` : DD
      ].join('-')
      const hhmm = [
        date.getHours(),
        date.getMinutes()
      ].join(':')
      return YYYYMMDD + ' ' + hhmm
    }
  },
  async mounted () {
    const id = this.$route.query.id

    const [err, res] = await this.$api.getStrategicalArticleDetail({ id })

    if (err) {
      return this.$message.error('获取文章数据失败')
    }

    this.strategicalArticle = res.data.data[0]
  }
}
</script>

<style lang="scss" scoped>
.detail {
  &__main {
    width: 700px;
  }

  &__aside {
    width: 280px;
  }

  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }

  &-info {
    padding: 20px;
    text-align: right;
    color: #999;
    span {
      margin-left: 20px;
    }
  }

  &-content {
    line-height: 1.5;
    ::v-deep * {
      max-width: 700px !important;
    }
  }

  &-ctrl {
    padding: 50px 0 30px;

    &__item {
      margin: 0 20px;
      text-align: center;
      cursor: pointer;
      i {
        display: block;
        font-size: 40px;
        color: #ffa500;
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }

  &__aside {
    > h4 {
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: 400;
      border-bottom: 1px solid #ddd;
    }

    .recommend-item {
      > a {
        display: flex;
        justify-content: space-between;
        height: 80px;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
      }
      &__image {
        flex-shrink: 0;
        width: 100px;
        height: 80px;
        margin-right: 10px;
      }
      &__content {
        flex: 1;
        flex-direction: column;
        h5 {
          height: 2.8em;
          line-height: 1.4em;
          font-size: 16px;
          font-weight: 400;
        }
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
