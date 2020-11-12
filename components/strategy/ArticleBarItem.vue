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
      <h4><a href="#">{{ strategicalArticle.title }}</a></h4>
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
        class="article-item__images"
        v-if="strategicalArticle.images && strategicalArticle.images.length > 0"
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
        <p class="article-item__desc">
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
</style>
