<template>
  <el-col class="strategy__article-bar">
    <ArticleBarHeader />
    <el-row class="article-list">
      <article
        v-for="strategicalArticle in strategicalArticles"
        :key="strategicalArticle.id"
      >
        <!--
        根据文章图片数决定是上下结构函数左右结构，
        上下结构则只能显示 3 张
        左右结构则最多能显示 1 张
        -->
        <el-row
          v-if="strategicalArticle.images.length >= 3"
          class="article-item article-item--tb"
        >
          <h4>
            <a href="#">{{ strategicalArticle.title }}</a>
          </h4>
          <p class="article-item__desc">
            <a href="#" v-html="strategicalArticle.summary"></a>
          </p>
          <el-row
            class="article-item__images"
            type="flex"
            justify="space-between"
          >
            <a
              href="#"
              v-for="(imgSrc, index) in strategicalArticle.images.filter((v, i) => i < 3)"
              :key="index"
            >
              <el-image :src="imgSrc" />
            </a>
          </el-row>
          <el-row class="article-item__info" type="flex" justify="space-between">
            <el-row class="main-info" type="flex" align="middle">
              <span><i class="el-icon-location-outline"></i>{{ strategicalArticle.cityName }}</span>
              <el-row type="flex" align="middle">
                by
                <a class="user-avatar" href="#">
                  <el-image
                    :src="$axios.defaults.baseURL + strategicalArticle.account.defaultAvatar"
                  />
                </a>
                <a class="user-nickname" href="#">{{ strategicalArticle.account.nickname }}</a>
              </el-row>
              <span><i class="el-icon-view"></i>{{ strategicalArticle.watch }}</span>
            </el-row>
            <span class="likes">{{ strategicalArticle.like }} 赞</span>
          </el-row>
        </el-row>
        <el-row
          v-else-if="strategicalArticle.images.length < 3"
          class="article-item article-item--lr"
          type="flex"
          justify="space-between"
        >
          <div
            v-if="strategicalArticle.images && strategicalArticle.images.length > 0"
            class="article-item__images"
          >
            <a href="#">
              <el-image :src="strategicalArticle.images[0]" />
            </a>
          </div>
          <div class="article-item__content">
            <h4>
              <a href="#">
                {{ strategicalArticle.title }}
              </a>
            </h4>
            <p>
              <a href="#" v-html="strategicalArticle.summary"></a>
            </p>
            <el-row
              class="article-item__info"
              type="flex"
              justify="space-between"
            >
              <el-row class="main-info" type="flex" align="middle">
                <span><i class="el-icon-location-outline"></i>{{ strategicalArticle.cityName }}</span>
                <el-row type="flex" align="middle">
                  by
                  <a class="user-avatar" href="#">
                    <el-image
                      :src="$axios.defaults.baseURL + strategicalArticle.account.defaultAvatar"
                    />
                  </a>
                  <a class="user-nickname" href="#">{{ strategicalArticle.account.nickname }}</a>
                </el-row>
                <span><i class="el-icon-view"></i>{{ strategicalArticle.watch }}</span>
              </el-row>
              <span class="likes">{{ strategicalArticle.like }} 赞</span>
            </el-row>
          </div>
        </el-row>
      </article>
    </el-row>
    <el-row
      class="article-pagination"
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
  name: 'ArticleBar',
  data () {
    return {
      currentPage4: 4,
      strategicalArticles: [],
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
  async mounted () {
    const [err, res] = await this.$api.getStrategies()

    if (err) {
      return this.$message.error('获取文章数据失败，发生错误')
    }

    this.strategicalArticles = res.data.data
  }
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
.strategy__article-bar {
  width: 700px;
  h4 {
    font-size: 18px;
    font-weight: 400;
  }
}
.article-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  &--tb {
    .article-item__images {
      margin: 15px 0;
    }
  }
  &--lr {
    .article-item__images {
      margin-right: 10px;
    }
  }
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
.article-pagination {
  margin-top: 10px;
}
</style>
