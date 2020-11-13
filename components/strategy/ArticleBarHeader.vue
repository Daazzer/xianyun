<template>
  <el-row class="article-header">
    <el-row class="article-header__search">
      <el-input
        v-model="citySearchVal"
        placeholder="请输入想去的地方，比如'广州'"
      />
      <el-button
        class="search-btn"
        type="text"
        icon="el-icon-search"
        @click="searchRecommendArticles(citySearchVal)"
      />
    </el-row>
    <el-row class="article-header__recommend-text">
      <span>推荐：</span>
      <a
        v-for="(recommendCity, index) in recommendCities"
        :key="index"
        @click="searchRecommendArticles(recommendCity)"
      >{{ recommendCity }}</a>
    </el-row>
    <el-row
      class="article-header__title"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <h4>推荐攻略</h4>
      <el-button icon="el-icon-edit" type="primary">写游记</el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'ArticleBarHeader',
  props: {
    recommendCities: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      citySearchVal: ''
    }
  },
  methods: {
    searchRecommendArticles (recommendCity) {
      this.citySearchVal = recommendCity
      // 点击搜索的时候通过地址栏把搜索状态显示给用户
      this.$router.push({
        path: '/strategy',
        query: { city: recommendCity }
      })
      this.$store.dispatch('strategy/searchRecommendArticles', recommendCity)
    }
  }
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
.article-header {
  h4 {
    font-size: 18px;
    font-weight: 400;
  }
  &__search {
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
    .search-btn {
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
  }

  &__recommend-text {
    padding: 10px 0;
    color: #666;
    span {
      margin-right: 4px;
      font-size: 12px;
    }
    a {
      @extend span;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: $linkColor;
      }
    }
  }
  &__title {
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
}
</style>
