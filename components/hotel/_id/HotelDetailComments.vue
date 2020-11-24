<template>
  <div class="hotel-detail__comments">
    <h4>{{ hotel.all_remarks || 0 }}条真实用户评论</h4>
    <el-row class="rate-bar">
      <el-col :span="4">
        <p>总评数：{{ hotel.all_remarks || 0 }}</p>
        <p>好评数：{{ hotel.good_remarks || 0 }}</p>
        <p>差评数：{{ hotel.bad_remarks || 0 }}</p>
      </el-col>
      <el-col class="star-bar" :span="5">
        <div class="star">
          <el-rate
            v-model="hotel.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} 分"
          />
        </div>
        <div class="height-light stamp">推荐</div>
      </el-col>
      <el-col class="rate-item" v-for="(score, name) in hotel.scores" :key="name" :span="3">
        <div class="wrapper">
          <el-progress
            type="circle"
            color="#f90"
            stroke-linecap="square"
            status="warning"
            :width="70"
            :percentage="score * 10"
            :show-text="false"
            :stroke-width="2"
          />
          <div class="text">
            <span v-if="name === 'environment'">环境</span>
            <span v-if="name === 'product'">产品</span>
            <span v-if="name === 'service'">服务</span>
            <span class="value">{{ score }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HotelDetailComments',
  props: {
    hotel: {
      type: Object,
      default () {
        return {
          stars: 0,
          scores: {
            environment: 0,
            product: 0,
            service: 0
          }
        }
      }
    }
  },
  data () {
    return {
      hotelComments: []  // 后台无数据
    }
  },
  methods: {
    async renderHotelComments (hotel) {
      const [err, res] = await this.$api.getHotelComments({ hotel })

      if (err) {
        return
      }

      // 后台没数据
      this.hotelComments = res.data.data
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.renderHotelComments(id)
  }
}
</script>

<style lang="scss" scoped>
.height-light {
  color: #f90;
}
.hotel-detail__comments {
  .rate-bar {
    padding: 20px 0;
    color: #666;
  }
  .star-bar {
    position: relative;
    .star {
      margin-top: 20px;
      ::v-deep .el-rate__icon {
        font-size: 20px;
      }
    }
    .stamp {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 20px;
      width: 70px;
      height: 70px;
      transform: rotate(-30deg);
      text-align: center;
      font-size: x-large;
      border-radius: 50%;
      opacity: .25;
      border: 2px solid #fa3;
    }
  }
  .rate-item {
    position: relative;
    .wrapper {
      position: relative;
      width: 70px;
    }
    .el-progress {
      ::v-deep .el-progress-circle__track {
        stroke: #fff;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #f90;
    }
  }
}
</style>
