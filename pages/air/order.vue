<template>
  <div class="order">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm />

      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Order'
}
</script>

<style lang="scss" scoped>
.order {
  width: 1000px;
  margin: 20px auto;
}

.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
