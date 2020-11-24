<template>
  <div class="index">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(banner, index) in banners" :key="index">
        <el-image :src="banner.url" />
      </el-carousel-item>
    </el-carousel>
    <div class="index-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in options"
            :key="index"
            :class="{ active: index === currentOption }"
            @click="handleOption(index)"
          >
            <i>{{ item.name }}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input
            :placeholder="options[currentOption].placeholder"
            v-model="searchValue"
            @keyup.enter="handleSearch"
          />
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      banners: [],
      options: [      // 搜索框tab选项
        {
          name: '攻略',
          placeholder: '搜索城市',
          pageUrl: '/strategy?city='
        },
        {
          name: '酒店',
          placeholder: '请输入城市搜索酒店',
          pageUrl: '/hotel?cityName='
        },
        {
          name: '机票',
          placeholder: '请输入出发地',
          pageUrl: '/air'
        }
      ],
      searchValue: '',    // 搜索框的值
      currentOption: 0,   // 当前选中的选项
    }
  },
  methods: {
    handleOption (index) {
      // 设置当前tab
      this.currentOption = index

      // 如果切换的机票tab，那么直接跳转到机票首页
      const optionItem = this.options[index]

      if (optionItem.name === '机票') {
        return this.$router.push(optionItem.pageUrl)
      }
    },
    handleSearch () {
      const optionItem = this.options[this.currentOption]
      // 跳转时候给对应的页面url加上搜索内容参数
      this.$router.push(optionItem.pageUrl + this.searchValue)
    }
  },
  async created () {
    const [err, res] = await this.$api.getBanners()
    if (err) {
      err.msg = '获取图片数据失败'
      return
    }

    const bannersData = res.data.data.map(banner => {
      // 将数据改造，判断图片是否为网络路径
      banner.url = /^https?:\/\//.test(banner.url) ? banner.url : this.$axios.defaults.baseURL + banner.url
      return banner
    })

    this.banners = bannersData
  }
}
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  ::v-deep .el-carousel__container {
    height: 700px;
  }

  &-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%);

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
</style>
