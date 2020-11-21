<template>
  <div class="hotel w">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $store.state.hotel.locationCity }}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <HotelSearchForm />
  </div>
</template>

<script>
export default {
  name: 'Hotel'
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
