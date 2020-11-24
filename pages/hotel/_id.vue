<template>
  <div class="hotel-detail w">
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
      }
    }
  },
  methods: {
    async renderHotelDetails (id) {
      const [err, res] = await this.$api.getHotels({ id })

      if (err) {
        return
      }

      if (res.data.data.length === 0) {
        this.hotel = {
          hotellevel: {},
          hoteltype: {},
          location: {},
          city: {}
        }
        return
      }

      this.hotel = res.data.data[0]
    }
  },
  async mounted () {
    const id = this.$route.params.id
    this.renderHotelDetails(id)
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
}
</style>
