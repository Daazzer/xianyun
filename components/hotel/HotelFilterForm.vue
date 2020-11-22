<template>
  <el-row class="hotel__filter-form" type="flex">
    <el-col class="filter-form__item price-filter" :span="4">
      <h4>
        <span>价格</span>
        <span>0-{{ price }}</span>
      </h4>
      <div class="opt">
        <el-slider
          v-model="price"
          :min="0"
          :max="4000"
          @change="filterPrice"
        />
      </div>
    </el-col>
    <el-col
      class="filter-form__item"
      :span="4"
      v-for="(filter, index) in filters"
      :key="filter.key"
    >
      <h4>{{ filter.title }}</h4>
      <div class="opt">
        <el-dropdown @command="filterHotelInfoByKey">
          <span class="el-dropdown-link">
            {{ getOptionLabel(filter.key, index) }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="opt-dropdown-menu" slot="dropdown">
            <el-dropdown-item
              v-for="(option, index) in filter.options"
              :icon="`${option.isSelected ? 'el-icon-circle-check' : 'iconfont icon-yuanxing'}`"
              :key="option.id"
              :command="{ index, key: filter.key }"
            >{{ option.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col class="filter-form__item reset-filter" :span="4">
      <div class="opt">
        <el-button type="primary" @click="resetFilter">撤销条件</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import filters from '~/plugins/filters'
export default {
  name: 'HotelFilterForm',
  data () {
    return {
      filters: [
        { title: '住宿等级', options: [], key: 'hotellevel', dataKey: 'levels' },
        { title: '住宿类型', options: [], key: 'hoteltype', dataKey: 'types' },
        { title: '酒店设施', options: [], key: 'hotelasset', dataKey: 'assets' },
        { title: '酒店品牌', options: [], key: 'hotelbrand', dataKey: 'brands' }
      ],
      price: 4000
    }
  },
  methods: {
    filterPrice (price_in) {
      this.$store.commit('hotel/setHotelListParams', { price_in })
      this.$emit('filter-hotels')
    },
    filterHotelInfoByKey ({ index, key }) {
      let data = []

      this.filters.forEach(filter => {
        if (filter.key === key) {
          // 拿到被点击的那一项的选项
          data = filter.options
          // 修改对应选项的选中状态
          const isSelected = filter.options[index].isSelected
          filter.options[index].isSelected = !isSelected
        }
      })

      // 拿到已选中的所有选项，并且只将 id 保存到一个数组
      data = data.filter(v => v.isSelected).map(v => v.id)

      this.$store.commit('hotel/setHotelListParams', { [key]: data })

      this.$emit('filter-hotels')
    },
    /**
     * 返回过滤标签在不同状态下的标签名
     * @param {string} key vuex 对应的数据项的 key 值
     * @param {number} index 过滤器标签索引
     * @returns {string} 每个选项的标签名
     */
    getOptionLabel (key, index) {
      const data = this.$store.state.hotel.hotelListParams[key]
      const len = data.length
      if (len === 1) {
        // 找出被选中的那一项
        const option = this.filters[index].options.find(v => v.isSelected)
        return option.name
      } else if (len > 1) {
        return `已选${len}项`
      }
      return '不限'
    },
    resetFilter () {
      this.$store.commit('hotel/resetFilter')
      // 重置选中状态
      this.filters.forEach(filter => {
        filter.options.forEach(option => {
          option.isSelected = false
        })
      })

      this.price = 4000
      this.$emit('filter-hotels')
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getHotelFilterOptions()

    if (err) {
      return this.$message.error('获取酒店筛选选项数据失败')
    }

    const data = res.data.data
    let filters = this.filters

    for (const key in data) {
      filters.forEach(filter => {
        // 将对应的属性值存到对应的选项中
        if (key === filter.dataKey) {
          // 数据改造，添加一个选择状态
          filter.options = data[key].map(v => {
            v.isSelected = false
            return v
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel__filter-form {
  $border: 1px solid #ddd;
  padding: 5px 0;
  border: $border;
  color: #666;
  .filter-form {
    &__item {
      > h4 {
        font-weight: 400;
      }
      padding: 5px 20px;
      border-right: $border;
      &:last-child {
        border-right: none;
      }
      &.price-filter {
        > h4 {
          display: flex;
          justify-content: space-between;
        }
        .opt {
          margin-top: 0;
        }
      }
      &.reset-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        .opt {
          margin-top: 0;
          text-align: center;
        }
      }
      .opt {
        margin-top: 10px;
        .el-dropdown {
          width: 100%;
          &-link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.opt-dropdown-menu {
  width: 180px;
  max-height: 280px;
  overflow: auto;
}
</style>
