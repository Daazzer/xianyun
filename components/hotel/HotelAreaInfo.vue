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
    <script v-if="isLoadedMap" src="//webapi.amap.com/maps?v=1.4.15&key=a3bef07558c5ea956fe1aa766fac3400&callback=loadMap"></script>
    <el-col
      element-loading-spinner="iconfont icon-jiazaizhong"
      class="area-info__map"
      id="map"
      v-loading="loadingMap"
      :span="10"
    />
  </el-row>
</template>

<script>
import {
  renderMarker,
  getMarkerContent,
  locatingCity
} from '@/plugins/amap'

export default {
  name: 'HotelAreaInfo',
  props: {
    scenics: {
      type: Array,
      default () {
        return []
      }
    },
    hotelList: {
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
      averagePrices: [332, 512, 768],
      isLoadedMap: false,
      loadingMap: false
    }
  },
  methods: {
    async loadMap () {
      this.loadingMap = true
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
        cityName = await locatingCity()
        this.$store.commit('hotel/setLocationCity', cityName)
        this.$alert(`定位当前城市：${cityName}`, { type: 'success' })
      }

      this.$router.push({
        path: '/hotel',
        query: { cityName }
      })
      this.$emit('located', cityName)
    },
    renderHotelMarker (hotels) {
      const map = this.map
      map.clearMap()
      hotels.forEach((hotel, index) => {
        const { longitude, latitude } = hotel.location
        renderMarker({
          map,
          title: hotel.name,
          position: new AMap.LngLat(longitude, latitude),
          content: getMarkerContent(index + 1)
        })
      })
    }
  },
  watch: {
    hotelList (hotels) {
      this.loadingMap = true
      this.renderHotelMarker(hotels)
      setTimeout(() => this.loadingMap = false, 300)
    }
  },
  mounted () {
    this.isLoadedMap = true
    window.loadMap  = this.loadMap
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(3turn);
  }
}
::v-deep .el-loading-spinner {
  animation: rotating 3s linear infinite;
  .icon-jiazaizhong {
    font-size: 38px;
  }
}
.hotel__area-info {
  min-height: 260px;
  margin-bottom: 20px;
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
