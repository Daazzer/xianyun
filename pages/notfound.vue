<template>
  <div class="w notfound">
    <h2>404 页面找不到</h2>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.notfound {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  h2 {
    font-weight: 400;
    color: #555;
  }
}
</style>
