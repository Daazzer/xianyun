<template>
  <div class="hotel-detail__assets">
    <el-row class="assets-info">
      <el-col class="assets-info-label" :span="4">基本信息</el-col>
      <el-col class="assets-info-content base-info" :span="20">
        <el-row :gutter="10" type="flex">
          <el-col>入住时间：{{ hotel.enterTime !== 'null' ? hotel.enterTime + '之后' : '-' }}</el-col>
          <el-col>离店时间：{{ hotel.leftTime !== 'null' ? hotel.leftTime + '之前' : '-' }}</el-col>
          <el-col>
            {{ hotel.creation_time !== 'null' ? hotel.creation_time : '-' }}
            /
            {{ hotel.renovat_time !== 'null' ? hotel.renovat_time : '-' }}
          </el-col>
          <el-col>酒店规模: {{ hotel.roomCount }}间客房</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col class="assets-info-label" :span="4">主要设施</el-col>
      <el-col class="assets-info-content base-info" :span="20">
        <span
          class="assets-info-item"
          v-for="asset in hotel.hotelassets"
          :key="asset.id"
        >{{ asset.name }}</span>
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col class="assets-info-label" :span="4">停车服务</el-col>
      <el-col class="assets-info-content base-info" :span="20">
        -
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col class="assets-info-label" :span="4">品牌信息</el-col>
      <el-col class="assets-info-content" :span="20">
        {{ hotel.hotelbrand ? hotel.hotelbrand.name : '-' }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HotelDetailAssets',
  props: {
    hotel: {
      type: Object,
      default () {
        return {
          hotelassets: [],
          hotelbrand: {}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail__assets {
  margin-bottom: 40px;
  .assets-info {
    border-bottom: 1px solid #eee;
    &-label,
    &-content {
      padding: 20px 10px;
      font-size: 14px;
    }
    .base-info {
      color: #666;
    }
    &-item {
      padding: 4px 10px;
      margin-right: 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      background-color: #eee;
      color: #666;
    }
  }
}
</style>
