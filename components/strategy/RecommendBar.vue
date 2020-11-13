<template>
  <el-col class="strategy__recommend-bar">
    <el-row class="recommend-cascader" @mouseleave.native="clearActive">
      <ul class="recommend-cascader__list">
        <li
          v-for="(recommendCityListItem, index) in recommendCityListItems"
          :class="{
            'recommend-cascader__item': true,
            'active': recommendCityListItem.isActived
          }"
          :key="index"
          @mouseover="handleHoverCascaderItem(index)"
        >
          {{ recommendCityListItem.type }}<i class="el-icon-arrow-right"></i>
        </li>
      </ul>
      <ol class="recommend-cascader__sublist">
        <li
          class="recommend-cascader__subitem"
          v-for="(recommendCitySubItem, index) in recommendCityListSubItems"
          :key="index"
        >
          <nuxt-link :to="recommendCitySubItem.link" @click.native="searchRecommendArticles(recommendCitySubItem.city)">
            <i>{{ index + 1 }}</i>
            <strong>{{ recommendCitySubItem.city }}</strong>
            <span>{{ recommendCitySubItem.desc }}</span>
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
  name: 'RecommendBar',
  data () {
    return {
      recommendCityListItems: [],
      recommendCityListSubItems: []
    }
  },
  methods: {
    clearActive () {
      this.recommendCityListItems.forEach(v => {
        if (v.isActived) {
          v.isActived = false
        }
      });
    },
    // 悬停时给当前列表项添加激活类名，并且鼠标在子级菜单时保持当前父级菜单列表项的激活状态
    handleHoverCascaderItem (index) {
      this.clearActive()
      this.recommendCityListItems[index].isActived = true
      this.renderRecommendCityListSubItem(index)
    },
    renderRecommendCityListSubItem (index) {
      const recommendCityListSubItems = [...this.recommendCityListItems[index].children]
      // 添加一个链接接字段
      this.recommendCityListSubItems = recommendCityListSubItems.map(city => {
        city.link = '/strategy?city=' + city.city
        return city
      })
    },
    searchRecommendArticles (recommendCity) {
      this.$store.dispatch('strategy/searchRecommendArticles', recommendCity)
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getRecommendCityList()
    if (err) {
      return this.$message.error('获取城市推荐列表数据失败，发生错误')
    }

    this.recommendCityListItems = res.data.data.map(v => {
      v.isActived = false
      return v
    })
    this.renderRecommendCityListSubItem(0)
    for (const recommendCityListItem of this.recommendCityListItems) {
      if (recommendCityListItem.type === '推荐城市') {
        // 在文章头部搜索栏显示前三个城市
        const recommendCities = recommendCityListItem.children.slice(0, 3)
        this.$store.commit('strategy/setRecommendCities', recommendCities.map(v => v.city))
        break
      }
    }
  }
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
  /* 悬停时都会显示，无论父子 DOM */
  &:hover &__sublist {
    display: block;
  }
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
    &:hover, &.active {
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
    height: 36px;
    line-height: 36px;
    * {
      vertical-align: middle;
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
