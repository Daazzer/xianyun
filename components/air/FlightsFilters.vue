<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airport"
          placeholder="起飞机场"
          @change="filterAirport"
        >
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="flightTimes"
          placeholder="起飞时间"
          @change="filterFlightTimes"
        >
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="company"
          placeholder="航空公司"
          @change="filterCompany"
        >
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airSize"
          placeholder="机型"
          @change="filterAirSize"
        >
          <el-option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        size="mini"
        round
        plain
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlightsFilters',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" },
      ],
      airport: '',        // 机场
      flightTimes: '',    // 出发时间
      company: '',        // 航空公司
      airSize: ''         // 机型大小
    }
  },
  methods: {
    // 选择机场时候触发
    filterAirport (value) {
      const airportData = this.data.flights.filter(v =>
        v.org_airport_name === value
      )
      this.$emit('filterdata', airportData)
    },

    // 选择出发时间时候触发
    filterFlightTimes (value) {
      const [from, to] = value.split(',') // [6,12]

      const flightTimesData = this.data.flights.filter(v => {
        // 出发时间小时
        const start = +v.dep_time.split(':')[0]
        return start >= from && start < to
      })

      this.$emit('filterdata', flightTimesData)
    },

    // 选择航空公司时候触发
    filterCompany (value) {
      const companyData = this.data.flights.filter(v =>
        v.airline_name === value
      )

      this.$emit('filterdata', companyData)
    },

    // 选择机型时候触发
    filterAirSize (value) {
      const airSizeData = this.data.flights.filter(v =>
        v.plane_size === value
      )

      this.$emit('filterdata', airSizeData)
    },

    // 撤销条件时候触发
    handleFiltersCancel () {
      this.airport = ''
      this.flightTimes = ''
      this.company = ''
      this.airSize = ''
      this.$emit('filterdata', this.data.flights)
    },
  }
}
</script>

<style lang="scss" scoped>
.filters {
  margin-bottom: 20px;
  &-top .el-select {
    margin-left: 10px;
  }
}
.filter-cancel {
  margin-top: 10px;
}
</style>
