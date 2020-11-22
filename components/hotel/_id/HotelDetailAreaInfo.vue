<template>
  <el-row class="hotel-detail__area-info" id="hotelAreaInfo" type="flex">
    <!-- 要在地图函数声明好之后再加载脚本 -->
    <script v-if="isLoadedMap" src="//webapi.amap.com/maps?v=1.4.15&key=a3bef07558c5ea956fe1aa766fac3400&callback=loadMap"></script>
    <div class="map" id="map" ref="map"></div>
    <div class="area-info" id="areaInfo">
      <el-tabs v-model="activeName" @tab-click="switchTab">
        <el-tab-pane label="风景" name="scenic">
          <ol class="area-info-list" v-if="scenics.length > 0">
            <li
              class="area-info-list__item"
              v-for="scenic in scenics"
              :key="scenic.id"
              @mouseover="hoverTabItem(scenic)"
            >
              <span class="name">{{ scenic.name }}</span>
              <span class="distance">{{ scenic.distance / 1000 }}公里</span>
            </li>
          </ol>
        </el-tab-pane>
        <el-tab-pane label="交通" name="traffic">
          <ol class="area-info-list" v-if="stations.length > 0">
            <li
              class="area-info-list__item"
              v-for="station in stations"
              :key="station.id"
              @mouseover="hoverTabItem(station)"
            >
              <span class="name">{{ station.name }}</span>
              <span class="distance">{{ station.distance / 1000 }}公里</span>
            </li>
          </ol>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-row>
</template>

<script>
import {
  renderMarker,
  getMarkerContent,
  searchScenics,
  searchStation
} from '@/plugins/amap'

export default {
  name: 'HotelDetailAreaInfo',
  data () {
    return {
      map: {},
      isLoadedMap: false,
      activeName: 'scenic',
      scenics: [],
      stations: [],
      markers: [],
      hotelMarker: {},
      hotelInfo: {}
    }
  },
  methods: {
    loadMap () {
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 10
      })

      this.initMarkers()
    },
    async initMarkers () {
      const { name, address } = await this.renderHotelInfo()

      // 先生成酒店的标记
      const result = await searchScenics(address)
      const hotel = result.poiList.pois[0]

      this.hotelMarker = renderMarker({
        map: this.map,
        position: hotel.location,
        title: name,
        icon: require('@/assets/images/mark_b.png')
      })

      this.renderScenics(address)
    },
    async renderHotelInfo () {
      // 由于这个子组件先于父组件加载，所以在此再发一次请求
      const id = this.$route.params.id
      const [err, res] = await this.$api.getHotels({ id })

      if (err) {
        return this.$message.error('获取地图标记信息失败')
      }

      const { name, address } = res.data.data[0]

      this.hotelInfo = { name, address }

      return { name, address }
    },
    /**
     * 对位置点与位置点的标记进行排序
     * @param {Object[]} pois 位置列表
     * @returns {Array} 排序后的位置列表
     */
    sortPois (pois) {
      pois = pois.map((poi, index) => {
        const marker = renderMarker({
          map: this.map,
          position: poi.location,
          title: poi.name
        })

        // 计算酒店标记点与其它标记点的距离
        const p1 = this.hotelMarker.getPosition()
        const p2 = marker.getPosition()
        const distance = Math.round(p1.distance(p2))
        poi.distance = distance

        this.markers.push(marker)
        this.markers[index].distance = distance

        return poi
      })

      pois.sort((a, b) => a.distance - b.distance)  // 排序位置列表
      this.markers.sort((a, b) => a.distance - b.distance)  // 排序标记字母

      // 排序完再设置标记序号
      this.markers.forEach((marker, index) => {
        const content = getMarkerContent(index + 1)
        marker.setContent(content)
      })

      return pois
    },
    async renderScenics (keyword) {
      const  result = await searchScenics(keyword)

      // 由于酒店的坐标不对，需要对酒店的地址进行搜索，搜索结果的第1项就是酒店坐标
      const scenics = result.poiList.pois.slice(1)

      this.scenics = this.sortPois(scenics)
    },
    async renderStations (keyword) {
      const result = await searchStation(keyword)

      this.stations = this.sortPois(result.stationInfo)
    },
    hoverTabItem (scenic) {
      const infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -35),
        content: scenic.name,
        position: scenic.location
      })

      infoWindow.open(this.map)
      this.map.setCenter(scenic.location)
    },
    switchTab (tab) {
      const keyword = this.hotelInfo.address
      this.map.remove(this.markers)
      this.map.clearInfoWindow()
      this.markers = []

      switch (tab.name) {
        case 'scenic':
          this.renderScenics(keyword)
          break
        case 'traffic':
          this.renderStations(keyword)
          break
      }
    }
  },
  mounted () {
    window.loadMap = this.loadMap
    this.isLoadedMap = true
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail__area-info {
  height: 360px;
  margin-bottom: 40px;
  .map {
    width: 65%;
  }
  .area-info {
    margin-left: 20px;
    flex: 1;
    &-list {
      height: 300px;
      overflow: auto;
      font-size: 14px;
      color: #666;
      &__item {
        display: flex;
        justify-content: space-between;
        padding: 0 20px 0 10px;
        margin-bottom: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
