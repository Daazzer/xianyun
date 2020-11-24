<template>
  <section class="air">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>

    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单 -->
      <SearchForm />

      <!-- banner 广告 -->
      <div class="sale-banner">
        <el-image src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>

    <!-- 标语 -->
    <el-row type="flex" class="statement">
      <el-col
        :span="8"
        v-for="(statement, index) in statements"
        :key="index"
      >
        <i
          :class="['iconfont', statement.icon]"
          :style="{ color: statement.color }"
        ></i>
        <span>{{ statement.content }}</span>
      </el-col>
    </el-row>

    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <!-- 机票推荐 -->
    <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col :span="6" v-for="(item, index) in sales" :key="index">
          <nuxt-link
            :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          >
            <img :src="item.cover" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>{{ item.departCity }}-{{ item.destCity }}</span>
              <span>￥699</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Air',
  data () {
    return {
      sales: [],
      statements: [
        { content: '100%航协认证', icon: 'iconweibiaoti-_huabanfuben', color: '#409eff' },
        { content: '出行保证', icon: 'iconbaozheng', color: '#008000' },
        { content: '7x24小时服务', icon: 'icondianhua', color: '#409eff' }
      ]
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getRecommendAirs()

    if (err) {
      err.msg = '获取推荐机票数据失败'
      return
    }

    this.sales = res.data.data.map(v => {
      v.cover = /^https?:\/\//.test(v.cover) ? v.cover : this.$axios.defaults.baseURL + v.cover
      return v
    })
  }
}
</script>

<style scoped lang="scss">
.air {
  width: 1000px;
  margin: 0 auto;

  &-title {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: orange;

    span {
      font-size: 20px;
    }
  }
}
.air-sale {
  border: 1px #ddd solid;
  padding: 20px;
  margin-bottom: 50px;

  &-pic {
    > div {
      width: 225px;
      height: 140px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
      }

      .layer-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        height: 30px;
        line-height: 30px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child {
          font-size: 18px;
        }
      }
    }
  }
  &-group {
    margin-top: 20px;
    padding-top: 8px;
    border-right: 1px #eee solid;

    &:last-child {
      border-right: none;
    }

    .air-sale-row {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;

      .air-sale-price {
        color: orange;
        font-size: 20px;
      }
    }
  }
  &-title {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: #409eff;

    span {
      font-size: 20px;
    }
  }
}
.statement {
  margin: 15px 0;
  border: 1px #ddd solid;
  background: #f5f5f5;
  height: 58px;
  padding: 10px 0;
  box-sizing: border-box;

  > div {
    text-align: center;
    line-height: 38px;
    border-right: 1px #ddd solid;

    &:last-child {
      border-right: none;
    }

    * {
      vertical-align: middle;
    }

    i {
      font-size: 30px;
    }
  }
}
</style>
