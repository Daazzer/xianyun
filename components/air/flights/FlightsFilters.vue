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
          @change="filterAirData"
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
          @change="filterAirData"
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
          @change="filterAirData"
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
          @change="filterAirData"
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
    /** 管道方式实现机票数据筛选，每次选择条件时触发一次 */
    filterAirData () {
      let flightsData = [...this.data.flights]
      if (this.airport !== '') {
        flightsData = this.filterAirport(flightsData, this.airport)
      }
      if (this.flightTimes !== '') {
        flightsData = this.filterFlightTimes(flightsData, this.flightTimes)
      }
      if (this.company !== '') {
        flightsData = this.filterCompany(flightsData, this.company)
      }
      if (this.airSize !== '') {
        flightsData = this.filterAirSize(flightsData, this.airSize)
      }

      this.$emit('filterdata', flightsData)
    },

    // 如果筛选框为空则全部数据返回，下同
    filterAirport (data, condition) {
      return data.filter(v =>
        v.org_airport_name === condition
      )
    },

    filterFlightTimes (data, condition) {
      const [from, to] = condition.split(',') // [6,12]

      return data.filter(v => {
        const start = Number(v.dep_time.split(':')[0])
        return start >= from && start < to
      })
    },

    filterCompany (data, condition) {
      return data.filter(v =>
        v.airline_name === condition
      )
    },

    filterAirSize (data, condition) {
      return data.filter(v =>
        v.plane_size === condition
      )
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
