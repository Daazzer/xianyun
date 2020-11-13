<template>
  <article>
    <!--
    根据文章图片数决定是上下结构函数左右结构，
    上下结构则只能显示 3 张
    左右结构则最多能显示 1 张
    -->
    <el-row
      v-if="strategicalArticle.images.length >= 3"
      class="article-item article-item--tb"
    >
      <h4><nuxt-link :to="articleDetailPage">{{ strategicalArticle.title }}</nuxt-link></h4>
      <p class="article-item__desc">
        <nuxt-link :to="articleDetailPage" v-html="strategicalArticle.summary" />
      </p>
      <el-row
        class="article-item__images"
        type="flex"
        justify="space-between"
      >
        <nuxt-link
          :to="articleDetailPage"
          v-for="(imgSrc, index) in strategicalArticle.images.filter((v, i) => i < 3)"
          :key="index"
        >
          <el-image :src="imgSrc" />
        </nuxt-link>
      </el-row>
      <ArticleBarItemInfo :strategicalArticle="strategicalArticle" />
    </el-row>
    <el-row
      v-else-if="strategicalArticle.images.length < 3"
      class="article-item article-item--lr"
      type="flex"
      justify="space-between"
    >
      <div
        class="article-item__images"
        v-if="strategicalArticle.images && strategicalArticle.images.length > 0"
      >
        <nuxt-link :to="articleDetailPage">
          <el-image :src="strategicalArticle.images[0]" />
        </nuxt-link>
      </div>
      <div class="article-item__content">
        <h4>
          <nuxt-link :to="articleDetailPage">
            {{ strategicalArticle.title }}
          </nuxt-link>
        </h4>
        <p class="article-item__desc">
          <nuxt-link :to="articleDetailPage" v-html="strategicalArticle.summary" />
        </p>
        <ArticleBarItemInfo :strategicalArticle="strategicalArticle" />
      </div>
    </el-row>
  </article>
</template>

<script>
export default {
  name: 'ArticleBarItem',
  props: {
    strategicalArticle: {
      type: Object,
      default () {
        return {
          images: []
        }
      }
    }
  },
  computed: {
    articleDetailPage () {
      return '/strategy/detail?id=' + this.strategicalArticle.id
    }
  }
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
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
    font-size: 18px;
    font-weight: 400;
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
  &__content {
    flex: 1;
  }
}
</style>
