<template>
  <el-row class="hotel-detail__pics-info" type="flex" justify="space-between">
    <el-col class="pics-info-show" :span="16">
      <el-image :src="showPicSrc">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </el-col>
    <el-col class="pics-info-wrapper" :span="8">
      <el-row class="pics-info-list" tag="ul" :gutter="20">
        <el-col
          class="pics-info-list__item"
          tag="li"
          :span="12"
          v-for="(pic, index) in pics"
          :key="index"
        >
          <a href="javascript:;" @click="showPic(index)">
            <el-image :src="pic">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </a>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HotelDetailPicsInfo',
  data () {
    return {
      pics: [],
      showPicSrc: ''
    }
  },
  methods: {
    showPic (index) {
      this.showPicSrc = this.pics[index]
    }
  },
  created () {
    // 模拟添加一条酒店酒店内部图片数据
    for (let i = 1; i <= 6; i++) {
      this.pics.push(`http://157.122.54.189:9093/images/hotel-pics/${i}.jpeg`)
    }
    this.showPicSrc = this.pics[0]
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail__pics-info {
  .el-image {
    display: block;
  }
  ::v-deep .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 30px;
    background-color: #f5f7fa;
    color: #909399;
  }
  .pics-info-show {
    .el-image {
      width: 640px;
      height: 360px;
    }
  }
  .pics-info-list {
    &__item {
      .el-image {
        width: 160px;
        margin-bottom: 14px;
      }
    }
  }
}
</style>
