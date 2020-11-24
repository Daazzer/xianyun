<template>
  <el-form inline>
    <el-form-item>
      <el-autocomplete
        placeholder="切换城市"
        v-model="cityName"
        :fetch-suggestions="queryCity"
        @select="selectCity"
      />
    </el-form-item>
    <el-form-item>
      <el-date-picker
        type="daterange"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
        value-format="yyyy-MM-dd"
        v-model="hotelDate"
        :picker-options="{ disabledDate }"
      />
    </el-form-item>
    <el-form-item class="hotel-person">
      <el-popover width="300" v-model="visible" :visible-arrow="false">
        <el-row class="hotel-person__select-group" type="flex" align="middle" :gutter="10">
          <el-col>每间</el-col>
          <el-col>
            <el-select placeholder="请选择" size="mini" v-model="adultsNum">
              <el-option
                v-for="adult in adults"
                :key="adult.message"
                :label="adult.message"
                :value="adult.value"
              >{{ adult.value }}</el-option>
            </el-select>
          </el-col>
          <el-col>
            <el-select placeholder="请选择" size="mini" v-model="childrenNum">
              <el-option
                v-for="child in children"
                :key="child.message"
                :label="child.message"
                :value="child.value"
              >{{ child.value }}</el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button type="primary" size="mini" @click="showSelectPerson">确定</el-button>
        </el-row>
        <el-input
          placeholder="人数未定"
          readonly
          slot="reference"
          v-model="personStr"
        >
          <i class="iconfont icon-yonghu1" slot="suffix"></i>
        </el-input>
      </el-popover>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchHotel">查看价格</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'HotelSearchForm',
  data () {
    return {
      cityName: '',
      cityId: undefined,
      hotelDate: [],
      adults: [],
      children: [],
      adultsNum: 1,
      childrenNum: 0,
      personStr: '',
      visible: false
    }
  },
  methods: {
    async queryCity (name, cb) {
      if (name === '') {
        return cb([])
      }

      this.cityId = undefined

      const [err, res] = await this.$api.getCities({ name })

      if (err) {
        this.cityId = undefined
        return cb([{ value: '搜索城市失败' }])
      }

      let cities = res.data.data

      if (typeof cities === 'undefined' || Array.isArray(cities) && cities.length === 0) {
        this.cityId = undefined
        return cb([])
      }

      cities = cities.map(city => {
        if (name === city.name) {
          this.cityId = city.id
        }
        return { value: city.name, id: city.id }
      })

      cb(cities)
    },
    selectCity (city) {
      this.cityId = city.id
    },
    disabledDate (time) {
      return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
    },
    showSelectPerson () {
      const adultStr = this.adults.find(v => v.value === this.adultsNum).message
      const childStr = this.children.find(v => v.value === this.childrenNum).message
      if (this.childrenNum === 0) {
        this.personStr = adultStr
      } else {
        this.personStr = adultStr + ' ' + childStr
      }
      this.visible = false
    },
    searchHotel () {
      if (this.cityName !== '') {
        this.$store.commit('hotel/setLocationCity', this.cityName)
      }
      if (typeof this.cityId !== 'undefined') {
        this.$store.commit('hotel/setHotelListParams', { city: this.cityId })
      }
      if (this.hotelDate) {
        this.$store.commit('hotel/setHotelListParams', {
          enterTime: this.hotelDate[0],
          leftTime: this.hotelDate[1]
        })
      } else {
        this.$store.commit('hotel/setHotelListParams', {
          enterTime: undefined,
          leftTime: undefined
        })
      }
      // todo 由于后端接口问题，此参数暂时不用
      // if (this.personStr !== '') {
      //   this.$store.commit('hotel/setHotelListParams', { person: this.adultsNum + this.childrenNum })
      // }
      this.$emit('search-hotels', this.cityName)
    }
  },
  mounted () {
    for (let i = 0; i < 7; i++) {
      this.adults.push({ value: i + 1, message: `${i + 1}成人` })
      if (i < 5) {
        this.children.push({value: i, message: `${i}儿童`})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-person {
  &__select-group {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
