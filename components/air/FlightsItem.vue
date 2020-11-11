<template>
  <div class="flight-item">
    <div @click="handleShowRecommend">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6"> <span>{{ flight.airline_name }}</span>{{ flight.flight_no }}</el-col>
        <el-col :span="12">
          <el-row
            type="flex"
            justify="space-between"
            class="flight-info-center"
          >
            <el-col :span="8" class="flight-airport">
              <strong>{{ flight.dep_time }}</strong>
              <span>{{ flight.org_ariport_name }}{{ flight.org_airport_quay }}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ timeRank }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ flight.arr_time }}</strong>
              <span>{{ flight.dst_ariport_name }}{{ flight.dst_airport_quay }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ flight.seat_infos[0].org_settle_price_child }}</span>起
        </el-col>
      </el-row>
    </div>
    <el-collapse-transition>
      <div class="flight-recommend" v-if="isShowRecommend">
        <!-- 隐藏的座位信息列表 -->
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="4">低价推荐</el-col>
          <el-col :span="20">
            <el-row
              type="flex"
              justify="space-between"
              align="middle"
              class="flight-sell"
              v-for="(seatInfo, index) in flight.seat_infos"
              :key="index"
            >
              <el-col :span="16" class="flight-sell-left">
                <span>{{ seatInfo.name }}</span> | {{ seatInfo.supplierName }}
              </el-col>
              <el-col :span="5" class="price">￥{{ seatInfo.org_settle_price }}</el-col>
              <el-col :span="3" class="choose-button">
                <el-button
                  type="warning"
                  size="mini"
                  @click="handleChoose(flight.id, seatInfo.seat_xid)"
                >选定</el-button>
                <p>剩余：{{ seatInfo.discount }}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import timeDiff from '@/plugins/timeRank'
export default {
  name: 'FlightsItem',
  props: {
    // 数据
    flight: {
      type: Object,
      // 默认是空数据对象
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isShowRecommend: false
    }
  },
  methods: {
    handleShowRecommend () {
      this.isShowRecommend = !this.isShowRecommend
    },
    handleChoose (id, seat_xid) {
      this.$router.push({
        path: '/air/order',
        query: { id, seat_xid }
      })
    }
  },
  computed: {
    timeRank () {
      return timeDiff(this.flight.dep_datetime, this.flight.arr_datetime)
    }
  }
}
</script>

<style scoped lang="scss">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
    &-center {
      padding: 0 30px;
      text-align: center;

      .flight-airport {
        strong {
          display: block;
          font-size: 24px;
          font-weight: normal;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }

      .flight-time {
        span {
          display: inline-block;
          padding: 10px 0;
          border-bottom: 1px #eee solid;
          color: #999;
        }
      }
    }
    &-right {
      .sell-price {
        font-size: 24px;
        color: orange;
        margin: 0 2px;
      }
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    &-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
