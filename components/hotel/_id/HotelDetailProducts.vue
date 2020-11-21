<template>
  <el-table
    class="hotel-detail__products"
    style="width: 100%"
    :data="hotelProductsTableData"
    :row-style="{ cursor: 'pointer' }"
    @row-click="goToLink"
  >
    <el-table-column
      prop="name"
      label="价格来源"
      width="420"
    />
    <el-table-column
      prop="bestType"
      label="低价房型"
      width="420"
    />
    <el-table-column
      prop="price"
      label="最低价格/每晚"
      width="160"
    >
      <template #default="scope">
        <span class="height-light price">&yen; {{ scope.row.price }}</span>
        起
        <i class="el-icon-arrow-right height-light"></i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'HotelDetailProducts',
  props: {
    hotelProductsTableData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    goToLink () {
      window.open('https://hotels.ctrip.com/hotels/694679.html?hotel=694679&tab=1&#abtest=200820_HTL_cdhwp:B;')
    }
  }
}
</script>

<style lang="scss" scoped>
.height-light {
  color: #f90;
}
.hotel-detail__products {
  margin: 40px 0;
  .price {
    font-size: 18px;
  }
}
</style>
