<template>
  <el-row class="hotel-detail__name-info">
    <el-row type="flex" align="bottom">
      <h4 class="hotel-cn-name">{{ hotel.name }}</h4>
      <span
        class="hotel-level"
        v-if="hotel.hotellevel && hotel.hotellevel.level"
        :title="`${hotel.hotellevel.level}星级`"
      >
        <i
          class="iconfont icon-huiyuanhuangguanguanjun"
          v-for="level in hotel.hotellevel.level"
          :key="level"
        ></i>
      </span>
      <div class="hotel-type">{{ hotel.hoteltype.name }}</div>
    </el-row>
    <h4 class="hotel-en-name">{{ hotel.alias }}</h4>
    <div class="hotel-location">
      <i class="el-icon-location"></i>{{ hotel.address }}
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'HotelDetailNameInfo',
  props: {
    hotel: {
      type: Object,
      default () {
        return {
          hotellevel: {},
          hoteltype: {}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail__name-info {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  .hotel {
    &-cn-name {
      margin-right: 10px;
      font-size: x-large;
      font-weight: 400;
      color: #333;
    }
    &-level {
      margin-right: 5px;
      display: flex;
      align-items: flex-end;
      color: #f90;
    }
    &-type {
      color: #606266;
    }
    &-en-name {
      font-weight: 400;
    }
    &-location {
      .el-icon-location {
        margin-right: 5px;
      }
    }
  }
}
</style>
