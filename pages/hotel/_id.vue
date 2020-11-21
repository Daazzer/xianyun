<template>
  <div class="hotel-detail w">
    <el-breadcrumb>
      <el-breadcrumb-item to="/hotel">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel', query: { cityName: $store.state.hotel.locationCity || hotel.city.name } }">{{ hotel.real_city }}酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{ hotel.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <HotelDetailNameInfo :hotel="hotel" />
    <HotelDetailPicsInfo />
    <!-- <HotelDetailProducts :hotelProductsTableData="hotel.products" /> -->
    <!-- <HotelDetailAreaInfo :hotelAreaInfo="hotelAreaInfo" @load-map="handleLoadMap" /> -->
    <!-- <HotelDetailAssets :hotel="hotel" /> -->
    <!-- <HotelDetailComments :hotel="hotel" /> -->
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
        city: {}
      },
      hotelAreaInfo: {}
    }
  },
  methods: {
    async renderHotelDetails (id) {
      const [err, res] = await this.$api.getHotels({ id })

      if (err) {
        return this.$message.error('获取酒店详情信息失败')
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
    },
    /*
    由于地图与传入数据之间的顺序是不定的
    但是需要在地图加载完成时，再将位置信息传到到子组件
    所以这里需要再发多一次请求另外拿数据
     */
    async handleLoadMap () {
      const id = this.$route.params.id
      const [err, res] = await this.getHotelDetails({ id })

      if (err) {
        return this.$message.error('加载地图标记失败')
      }

      const { longitude, latitude }  = res.data.data[0].location
      const { name, address } = res.data.data[0]

      this.hotelAreaInfo = {
        longitude,
        latitude,
        name,
        address
      }
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
