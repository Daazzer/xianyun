<template>
  <div class="hotel w">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $store.state.hotel.locationCity }}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <HotelSearchForm @search-hotels="handleSearchHotels" />
    <HotelAreaInfo
      :scenics="cityInfo.scenics"
      :hotelList="hotelList"
      @located="handleLocated"
    />
    <HotelFilterForm @filter-hotels="renderHotelList(hotelListParams)" />
    <HotelList
      :hotelList="hotelList"
      @pagination-change="renderHotelList(hotelListParams)"
    />
  </div>
</template>

<script>
export default {
  name: 'Hotel',
  data () {
    return {
      cityInfo: {
        scenics: []
      },
      hotelList: []
    }
  },
  methods: {
    async renderCityInfo (name) {
      const [err, res] = await this.$api.getCities({ name })

      if (err) {
        return
      }

      if (res.data.data.length === 0) {
        this.cityInfo = {
          scenics: []
        }
        return
      }

      this.cityInfo = res.data.data[0]
    },
    async renderHotelList (hotelListParams) {
      const [err, res] = await this.$api.getHotels(hotelListParams)

      if (err) {
        this.hotelList = []  // 为了地图加载状态能取消
        return
      }

      this.hotelList = res.data.data
      this.$store.commit('hotel/setTotalHotels', res.data.total)
    },
    async handleLocated (cityName) {
      await this.renderCityInfo(cityName)

      const city = this.cityInfo.id  // 城市 id
      this.$store.commit('hotel/setHotelListParams', { city })
      this.renderHotelList(this.hotelListParams)
    },
    handleSearchHotels (cityName) {
      if (cityName !== '') {
        this.renderCityInfo(cityName)
        this.$router.push({
          path: '/hotel',
          query: { cityName }
        })
      }
      this.renderHotelList(this.hotelListParams)
    }
  },
  computed: {
    hotelListParams () {
      return this.$store.state.hotel.hotelListParams
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel {
  .el-breadcrumb {
    margin-bottom: 20px;
    overflow: hidden;
  }
}
</style>
