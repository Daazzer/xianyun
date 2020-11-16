<template>
  <el-row class="article-item__info" type="flex" justify="space-between">
    <el-row class="main-info" type="flex" align="middle">
      <span><i class="el-icon-location-outline"></i>{{ strategicalArticle.cityName }}</span>
      <el-row type="flex" align="middle">
        by
        <nuxt-link class="user-avatar" to="user/personal">
          <el-image
            :src="$axios.defaults.baseURL + strategicalArticle.account.defaultAvatar"
          />
        </nuxt-link>
        <nuxt-link class="user-nickname" to="/user/personal">{{ strategicalArticle.account.nickname }}</nuxt-link>
      </el-row>
      <span><i class="el-icon-view"></i> {{ strategicalArticle.watch || 0 }}</span>
    </el-row>
    <span class="likes">{{ strategicalArticle.like || 0 }} 赞</span>
  </el-row>
</template>

<script>
export default {
  name: 'ArticleBarItemInfo',
  props: {
    strategicalArticle: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
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
</style>
