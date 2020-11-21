<template>
  <el-row class="hotel__area-info" type="flex" :gutter="10">
    <el-col class="area-info__search-option" :span="14">
      <el-row type="flex">
        <el-col :span="3">区域：</el-col>
        <el-col :span="21">
          <el-row :class="{
            'scenics-message': true,
            'open': isOpened
          }">
            <span
              class="scenics-message__item"
              v-for="scenic in scenics"
              :key="scenic.id"
            >{{ scenic.name }}</span>
          </el-row>
          <a :class="{
            'scenics-message-btn': true,
            'open': isOpened
          }"
            href="javascript:;"
            @click="isOpened = !isOpened"
          >
            <i class="el-icon-d-arrow-right"></i> 等{{ scenics.length }}个区域
          </a>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="3">
          均价
          <el-tooltip placement="top-start" content="等级均价由平日价格计算得出，节假日价格会有上浮。">
            <sup class="question-mark">?</sup>
          </el-tooltip>：
        </el-col>
        <el-col :span="21">
          <el-row type="flex">
            <el-col
              :span="6"
              v-for="(averagePrice, index) in averagePrices"
              :key="index"
            >
              <el-tooltip content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" :visible-arrow="false">
                <span class="level-evaluate">
                  <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                  <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                  <i
                    class="iconfont icon-huiyuanhuangguanguanjun"
                    v-for="i in index + 1"
                    :key="i + 'icon'"
                  ></i>
                  <span class="level-evaluate__price-label">&yen;{{ averagePrice }}</span>
                </span>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <!-- 嵌入脚本的形式加载地图 -->
    <script src="//webapi.amap.com/maps?v=1.4.15&key=a3bef07558c5ea956fe1aa766fac3400&callback=loadMap"></script>
    <el-col class="area-info__map" id="map" :span="10" />
  </el-row>
</template>

<script>
export default {
  name: 'HotelAreaInfo',
  props: {
    scenics: {
      type: Array,
      default () {
        return []
      }
    },
    hotelInfos: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isOpened: false,
      map: {},
      averagePrices: [332, 512, 768]
    }
  },
  methods: {
    async loadMap () {
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 10
      })

      let cityName = this.$route.query.cityName

      if (cityName) {
        this.$store.commit('hotel/setLocationCity', cityName)
      } else {
        cityName = this.$store.state.hotel.locationCity
      }

      if (!cityName) {
        // 定位并获取城市名
        cityName = await this.locatingCity()
        this.$store.commit('hotel/setLocationCity', cityName)
        this.$alert(`定位当前城市：${cityName}`, { type: 'success' })
      }

      this.$router.push({
        path: '/hotel',
        query: { cityName }
      })
      this.$emit('located', cityName)
    },
    /**
     * 地图定位城市
     * @returns {Promise} 加载地图后的等待结果
     */
    locatingCity () {
      const p = new Promise(rv => {
        AMap.plugin('AMap.CitySearch', () => {
          const citySearch = new AMap.CitySearch()
          citySearch.getLocalCity((status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              rv(result.city)
            }
          })
        })
      })
      return p
    },
    // renderMapScript () {
    //   const amapApi = document.createElement('script')
    //   amapApi.src = this.mapUrl
    //   document.head.appendChild(amapApi)
    // },
    renderHotelMarkers (hotels) {
      this.map.clearMap()
      hotels.forEach((hotel, index) => {
        const { longitude, latitude } = hotel.location
        const marker = new AMap.Marker({
          map: this.map,
          title: hotel.name,
          position: new AMap.LngLat(longitude, latitude),
          content: `<span class="custom-marker">${index + 1}</span>`
        })

        // 新建信息窗体
        const infoWindow = new AMap.InfoWindow({
          anchor: 'bottom-center',
          content: hotel.name,
          offset: new AMap.Pixel(0, -35)
        })

        // 每个标记点都显示窗口信息
        marker.on('mouseover', () => {
          infoWindow.open(this.map, [longitude, latitude])
        })

        marker.on('mouseout', () => {
          infoWindow.close()
        })
      })

      // 显示出范围内所有标记点
      this.map.setFitView()
    },
  },
  watch: {
    hotelInfos (hotels) {
      this.renderHotelMarkers(hotels)
    }
  },
  mounted () {
    window.loadMap  = this.loadMap
  }
}
</script>

<style>
.amap-icon img{
  width: 22px;
  height: 36px;
}
.amap-info-content {
  font-size: 12px;
}
.custom-marker {
  display: inline-block;
  width: 22px;
  height: 36px;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  background-size: 22px 36px;
  background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png);
}
</style>

<style lang="scss" scoped>
.hotel__area-info {
  min-height: 260px;
  .area-info {
    &__search-option {
      > .el-row {
        margin-bottom: 20px;
        font-size: 14px;
        color: #666;
      }
      .scenics-message {
        max-height: 3em;
        overflow: hidden;
        &__item {
          display: inline-block;
          padding: 0 2px;
          margin-right: 1em;
        }
        &.open {
          max-height: none;
        }
        &-btn {
          &.open {
            .el-icon-d-arrow-right {
              transform: rotate(270deg);
            }
          }
          .el-icon-d-arrow-right {
            transform: rotate(90deg);
            color: #f90;
          }
        }
      }
      .question-mark {
        $size: 1.2em;
        display: inline-block;
        width: 1.2em;
        height: $size;
        line-height: $size;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        background-color: #ccc;
        cursor: pointer;
      }
      .level-evaluate {
        display: flex;
        &__price-label {
          margin-left: 5px;
        }
        .icon-huiyuanhuangguanguanjun {
          color: #f90;
        }
      }
    }
  }
}
</style>