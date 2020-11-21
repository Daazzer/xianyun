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
    <HotelFilterForm @filter-hotels="handleFilterHotels" />
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
        return this.$message.error('获取酒店周边数据失败')
      }

      this.cityInfo = res.data.data[0]
    },
    async renderHotelList (hotelListParams) {
      const [err, res] = await this.$api.getHotels(hotelListParams)

      if (err) {
        return this.$message.error('获取酒店列表数据失败')
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
      this.renderCityInfo(cityName)
      this.renderHotelList(this.hotelListParams)
      this.$router.push({
        path: '/hotel',
        query: { cityName }
      })
    },
    handleFilterHotels () {
      console.log(1)
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
