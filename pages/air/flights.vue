<template>
  <section class="flights">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters
          :data="flightsCacheData"
          @filterdata="setFlights"
        />

        <!-- 航班头部布局 -->
        <FlightsHeader />

        <!-- 航班信息 -->
        <div>
          <FlightsItem
            v-for="flight in flights"
            :key="flight.id"
            :flight="flight"
          />
          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top: 10px">
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              :total="flightsData.total"
              layout="total, sizes, prev, pager, next, jumper"
            />
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'Flights',
  data () {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 航班总数据，会被筛选出来的数据不停的覆盖
      flightsCacheData: {  // 缓存一份数据，用于返回筛选数据
        flights: [],
        info: {},
        options: {}
      },
      flights: [],     // 航班列表数据，用于循环 FlightsItem组件，单独出来是因为要分页
      pageIndex: 1, // 当前页码
      pageSize: 5,  // 显示条数
    }
  },
  methods: {
    // 获取一段航班列表数据，设置每一页的航班列表数据
    setFlights (data) {
      // 如果有新数据从第一页开始显示
      if (data) {
        this.pageIndex = 1
        this.flightsData.flights = data
        this.flightsData.total = data.length
      }

      const start = (this.pageIndex - 1) * this.pageSize
      const end = start + this.pageSize
      this.flights = this.flightsData.flights.slice(start, end)
    },

    // 切换条数时触发
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.setFlights()
    },

    // 切换页数时触发
    handleCurrentChange (pageIndex) {
      this.pageIndex = pageIndex
      this.setFlights()
    },
  },
  async mounted () {
    const [err, res] = await this.$api.getAirs(this.$route.query)

    if (err) {
      return this.$message.error('获取航班信息失败，发生错误')
    }

    this.flightsData = res.data
    /*
    缓存一份新的列表数据数据，这个列表不会被修改
    而 flightsData 会被修改，注意这里需要使用 ES9 的解构对象，或者
    Object.assign() 静态方法进行对象的复制，否则会出现引用赋值的现象，两个变量
    指向同一个对象
     */
    this.flightsCacheData = { ...res.data }
    this.setFlights()
  }
}
</script>

<style scoped lang="scss">
.flights {
  width: 1000px;
  margin: 20px auto;
  &-content {
    width: 745px;
    font-size: 14px;
  }
}

.aside {
  width: 240px;
}
</style>
