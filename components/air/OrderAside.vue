<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{ infoData.dep_date }}</div>
        <div>{{ infoData.org_city_name }} - {{ infoData.dst_city_name }}</div>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        class="info-step"
      >
        <el-col :span="5" class="flight-airport">
          <strong>{{ infoData.dep_time }}</strong>
          <span>{{ infoData.org_airport_name }}{{ infoData.org_airport_quay }}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--- {{ timeRank }} ---</span>
          <span>{{ infoData.airline_name }}{{ infoData.flight_no }}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{ infoData.arr_time }}</strong>
          <span>浦东机场T2</span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>成人机票</span>
      <span>￥{{ infoData.seat_infos.org_settle_price }}</span>
      <span>x{{ orderInfo.usersAmount }}</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>机建＋燃油</span>
      <span>¥{{ infoData.airport_tax_audlet }}/人/单程</span>
      <span>x{{ orderInfo.usersAmount }}</span>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额：</span>
      <span class="price">￥ {{ totalPrice }}</span>
    </el-row>
  </div>
</template>

<script>
import timeDiff from '@/plugins/timeRank'
export default {
  props: {
    infoData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    timeRank () {
      return timeDiff(this.infoData.dep_datetime, this.infoData.arr_datetime)
    },
    orderInfo () {
      return this.$store.state.air.orderAside
    },
    totalPrice () {
      const usersAmount = this.orderInfo.usersAmount
      // 票价
      let total = this.infoData.seat_infos.org_settle_price * usersAmount
      // 燃油价
      total += this.infoData.airport_tax_audlet * usersAmount
      // 保险价
      total += this.infoData.insurances.reduce((accuVal, curItem) => {
        // 如果当前保险列表有原保险数据的 id 则累加
        if (this.orderInfo.insurances.indexOf(curItem.id) > -1) {
          return accuVal + curItem.price
        }
        return accuVal
      }, 0)

      return total
    }
  },
}
</script>

<style scoped lang="scss">
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}

.air-info {
  padding: 15px;

  .info-top {
    margin-bottom: 10px;
    > div:last-child {
      font-size: 14px;
    }
  }

  .info-step {
    .flight-airport {
      strong {
        display: block;
        font-size: 22px;
        font-weight: normal;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      text-align: center;
      font-size: 12px;
      color: #999;
      span {
        display: block;
      }
    }
  }
}

.info-bar {
  border-top: 1px #ddd dashed;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;

  .price {
    font-size: 28px;
    color: orange;
  }
}
</style>
