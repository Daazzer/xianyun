<template>
  <el-col class="strategy__recommend-bar">
    <el-row class="recommend-cascader">
      <ul class="recommend-cascader__list">
        <li class="recommend-cascader__item">
          热门城市<i class="el-icon-arrow-right"></i>
        </li>
      </ul>
      <ol class="recommend-cascader__sublist">
        <li class="recommend-cascader__subitem">
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
</template>

<script>
export default {
  name: 'RecommendBar'
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
.strategy__recommend-bar {
  width: 260px;
}
.recommend-cascader {
  $border: 1px solid #ddd;
  position: relative;
  font-size: 14px;
  &__list {
    border-top: $border;
    border-bottom: $border;
    position: relative;
    box-shadow: 0 0 1px #f5f5f5;
    background-color: #fff;
    z-index: 20;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 10px 0 20px;
    border-left: $border;
    border-right: $border;
    &:hover {
      border-right-color: #fff;
      &,
      .el-icon-arrow-right {
        color: $linkColor;
      }
    }
    .el-icon-arrow-right {
      color: #999;
      font-size: 20px;
    }
  }
  &__item + &__item {
    border-top: $border;
  }
  &__sublist {
    display: none;
    position: absolute;
    top: 0;
    left: 259.5px;
    width: 350px;
    padding: 10px 20px;
    border: $border;
    background-color: #fff;
    z-index: 10;
  }
  &__subitem {
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
    strong:hover,
    span:hover {
      text-decoration: underline;
    }
  }
}
.recommend-city {
  margin-top: 20px;
  h4 {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    font-weight: 400;
  }
}
</style>
