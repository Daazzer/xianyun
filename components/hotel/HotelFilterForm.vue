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
    <el-col class="filter-form__item" :span="4">
      <h4>住宿等级</h4>
      <div class="opt">
        <el-dropdown @command="filterHotelInfoByKey">
          <span class="el-dropdown-link">
            {{ hotellevel }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="opt-dropdown-menu" slot="dropdown">
            <el-dropdown-item
              v-for="(level, index) in filterOption.levels"
              :icon="`${level.isSelected ? 'el-icon-circle-check' : 'iconfont icon-yuanxing'}`"
              :key="level.id"
              :command="{ index, key: 'levels' }"
            >{{ level.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col class="filter-form__item" :span="4">
      <h4>住宿类型</h4>
      <div class="opt">
        <el-dropdown @command="filterHotelInfoByKey">
          <span class="el-dropdown-link">
            {{ hoteltype }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="opt-dropdown-menu" slot="dropdown">
            <el-dropdown-item
              v-for="(type, index) in filterOption.types"
              :icon="`${type.isSelected ? 'el-icon-circle-check' : 'iconfont icon-yuanxing'}`"
              :key="type.id"
              :command="{ index, key: 'types' }"
            >{{ type.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col class="filter-form__item" :span="4">
      <h4>酒店设施</h4>
      <div class="opt">
        <el-dropdown @command="filterHotelInfoByKey">
          <span class="el-dropdown-link">
            {{ hotelasset }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="opt-dropdown-menu" slot="dropdown">
            <el-dropdown-item
              v-for="(asset, index) in filterOption.assets"
              :icon="`${asset.isSelected ? 'el-icon-circle-check' : 'iconfont icon-yuanxing'}`"
              :key="asset.id"
              :command="{ index, key: 'assets' }"
            >{{ asset.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col class="filter-form__item" :span="4">
      <h4>酒店品牌</h4>
      <div class="opt">
        <el-dropdown @command="filterHotelInfoByKey">
          <span class="el-dropdown-link">
            {{ hotelbrand }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="opt-dropdown-menu" slot="dropdown">
            <el-dropdown-item
              v-for="(brand, index) in filterOption.brands"
              :icon="`${brand.isSelected ? 'el-icon-circle-check' : 'iconfont icon-yuanxing'}`"
              :key="brand.id"
              :command="{ index, key: 'brands' }"
            >{{ brand.name }}</el-dropdown-item>
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
export default {
  name: 'HotelFilterForm',
  data () {
    return {
      filterOption: {
        assets: [],
        brands: [],
        levels: [],
        types: []
      },
      price: 4000
    }
  },
  methods: {
    filterPrice (price_in) {
      this.$store.commit('hotel/setHotelListParams', { price_in })
      this.$emit('filter-hotels')
    },
    filterHotelInfoByKey ({ index, key }) {
      // 修改对应选项的选中状态
      const data = this.filterOption[key]
      const isSelected = data[index].isSelected
      data[index].isSelected = !isSelected

      const dataArr = data.filter(v => v.isSelected).map(v => v.id)
      let hotelListParamKey = ''

      switch (key) {
        case 'levels':
          hotelListParamKey = 'hotellevel'
          break
        case 'types':
          hotelListParamKey = 'hoteltype'
          break
        case 'assets':
          hotelListParamKey = 'hotelasset'
          break
        case 'brands':
          hotelListParamKey = 'hotelbrand'
          break
      }

      this.$store.commit('hotel/setHotelListParams', {
        [hotelListParamKey]: dataArr
      })

      this.$emit('filter-hotels')
    },
    /**
     * 返回过滤选项在不同状态下的标签名
     * @param {string} dataKey vuex 对应的数据项的 key 值
     * @param {string} optKey 请求回来的数据项的 key 值
     * @returns {string} 每个选项的标签名
     */
    getOptLabel (dataKey, optKey) {
      const data = this.$store.state.hotel.hotelListParams[dataKey]
      const len = data.length
      if (len === 1) {
        // 找出被选中的那一项
        const opt = this.filterOption[optKey].find(v => v.isSelected)
        return opt.name
      } else if (len > 1) {
        return `已选${len}项`
      }
      return '不限'
    },
    resetFilter () {
      this.$store.commit('hotel/resetFilter')
      // 重置选中状态
      const filterOption = this.filterOption
      for (const key in filterOption) {
        filterOption[key].forEach(opt => {
          if (opt.isSelected) {
            opt.isSelected = false
          }
        })
      }
      this.price = 4000
      this.$emit('filter-hotels')
    }
  },
  computed: {
    hotellevel () {
      return this.getOptLabel('hotellevel', 'levels')
    },
    hoteltype () {
      return this.getOptLabel('hoteltype', 'types')
    },
    hotelasset () {
      return this.getOptLabel('hotelasset', 'assets')
    },
    hotelbrand () {
      return this.getOptLabel('hotelbrand', 'brands')
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getHotelFilterOptions()

    if (err) {
      return this.$message.error('获取酒店筛选选项数据失败')
    }

    const data = res.data.data

    // 数据改造，添加一个选择状态
    for (const key in data) {
      this.filterOption[key] = data[key].map(v => {
        v.isSelected = false
        return v
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
