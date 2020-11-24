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
        <div class="detail-ctrl__item" @click="starArticle">
          <i :class="`iconfont icon-shoucang${isStar ? '1' : ''}`"></i>
          <p>收藏({{ strategicalArticle.account.starPosts ? strategicalArticle.account.starPosts.length : 0 }})</p>
        </div>
        <div class="detail-ctrl__item" @click="likeArticle">
          <i :class="`iconfont icon-${isLike ? 'dianzan3' : 'icon_dianzan-xian'}`"></i>
          <p>点赞({{ strategicalArticle.likeIds ? strategicalArticle.likeIds.length : 0 }})</p>
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
        <li
          class="recommend-item"
          v-for="recommendStrategicalArticle in recommendStrategicalArticles"
          :key="recommendStrategicalArticle.id"
        >
          <a :href="`/strategy/detail?id=${recommendStrategicalArticle.id}`">
            <el-image
              class="recommend-item__image"
              v-if="recommendStrategicalArticle.images.length > 0"
              :src="recommendStrategicalArticle.images[0]"
            />
            <el-row class="recommend-item__content" type="flex" justify="space-between">
              <h5>{{ recommendStrategicalArticle.title }}</h5>
              <p>{{ recommendStrategicalArticle.created_at | timeFormat }} 阅读 {{ recommendStrategicalArticle.watch }}</p>
            </el-row>
          </a>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import { timeFormat } from '@/plugins/filters'
export default {
  name: 'StrategyDetail',
  data () {
    return {
      strategicalArticle: {
        account: {
          starPosts: []
        },
        comments: [],
        likeIds: []
      },
      recommendStrategicalArticles: []
    }
  },
  methods: {
    async likeArticle () {
      const id = this.$route.query.id
      const [err, res] = await this.$api.likeStrategicalArticle({
        id
      })

      if (err) {
        return
      }

      this.$message.success('点赞成功')
      if (!this.strategicalArticle.likeIds) {
        this.strategicalArticle.likeIds = []
      }
      // 在原点赞数据基础上添加当前用户 id，用于显示点赞状态
      this.strategicalArticle.likeIds.push(this.$store.state.user.userInfo.user.id)
    },
    async starArticle () {
      const id = this.$route.query.id
      const [err, res] = await this.$api.starStrategicalArticle({ id })

      if (err) {
        return
      }

      this.$message.success('收藏成功')
      if (!this.strategicalArticle.account.starPosts) {
        this.strategicalArticle.account.starPosts = []
      }
      // 在原收藏数据基础上添加当前用户 id，用于显示收藏状态
      this.strategicalArticle.account.starPosts.push(this.$store.state.user.userInfo.user.id)
    },
    async renderArticleDetial (id) {
      const [err, res] = await this.$api.getStrategicalArticleDetail({ id })

      if (err) {
        return
      }

      if (res.data.data.length > 0) {
        this.strategicalArticle = res.data.data[0]
      }
    },
    async renderRecommendArticle (id) {
      const [err, res] = await this.$api.getRecommendStrategicalArticles({ id })

      if (err) {
        return
      }

      this.recommendStrategicalArticles = res.data.data
    }
  },
  computed: {
    isLike () {
      const userId = this.$store.state.user.userInfo.user.id
      const likeIds = this.strategicalArticle.likeIds
      // 查询点赞状态
      if (likeIds) {
        return likeIds.some(id =>
          id === userId
        )
      } else {
        return false
      }
    },
    isStar () {
      const userId = this.$store.state.user.userInfo.user.id
      const starIds = this.strategicalArticle.account.starPosts
      // 查询收藏状态
      if (starIds) {
        return starIds.some(id =>
          Number(id) === userId
        )
      } else {
        return false
      }
    }
  },
  filters: {
    timeFormat
  },
  mounted () {
    const id = this.$route.query.id
    this.renderArticleDetial(id)
    this.renderRecommendArticle(id)
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
