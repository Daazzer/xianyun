<template>
  <div>
    <div
      v-if="loadingHotel"
      class="hotel-detail--loading"
      v-loading="loadingHotel"
      element-loading-spinner="iconfont icon-jiazaizhong"
    ></div>
    <div class="hotel-detail--none" v-else-if="noneHotelData">暂无酒店信息</div>
    <div class="hotel-detail w" v-else>
      <el-breadcrumb>
        <el-breadcrumb-item to="/hotel">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel', query: { cityName: $store.state.hotel.locationCity || hotel.city.name } }">{{ hotel.real_city }}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{ hotel.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <HotelDetailNameInfo :hotel="hotel" />
      <HotelDetailPicsInfo />
      <HotelDetailProducts :hotelProductsTableData="hotel.products" />
      <HotelDetailAreaInfo />
      <HotelDetailAssets :hotel="hotel" />
      <HotelDetailComments :hotel="hotel" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HotelDetail',
  data() {
    return {
      hotel: {
        hotellevel: {},
        hoteltype: {},
        location: {},
        city: {},
        products: []
      },
      loadingHotel: false,
      noneHotelData: true
    }
  },
  methods: {
    async renderHotelDetails (id) {
      const [err, res] = await this.$api.getHotels({ id })

      if (err) {
        this.noneHotelData = true
        return
      }

      if (res.data.data.length === 0) {
        this.hotel = {
          hotellevel: {},
          hoteltype: {},
          location: {},
          city: {}
        }
        this.noneHotelData = true
        return
      }

      this.hotel = res.data.data[0]
      this.noneHotelData = false
    }
  },
  async mounted () {
    this.loadingHotel = true
    const id = this.$route.params.id
    await this.renderHotelDetails(id)
    this.loadingHotel = false
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail {
  .el-breadcrumb {
    margin-bottom: 20px;
    overflow: hidden;
  }
  .height-light {
    color: #f90;
  }
  &--loading, &--none {
    height: 300px;
  }
  &--none {
    padding-top: 100px;
    text-align: center;
    font-size: 1.2rem;
    color: #595959;
  }
}
</style>
