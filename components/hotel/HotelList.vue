<template>
  <div>
    <ul class="hotel__list" v-if="hotelList.length > 0">
      <li
        class="list__item"
        v-for="hotel in hotelList"
        :key="hotel.id"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <nuxt-link class="image-link" :to="`/hotel/${hotel.id}`">
              <el-image :src="hotel.photos" />
            </nuxt-link>
          </el-col>
          <el-col :span="10">
            <nuxt-link :to="`/hotel/${hotel.id}`">
              <h4 class="hotel-cn-name">{{ hotel.name }}</h4>
            </nuxt-link>
            <h5 class="hotel-en-name">
              <span>{{ hotel.alias }}</span>
              <span class="rate" :title="`${hotel.hotellevel.level}星级`" v-if="hotel.hotellevel">
                <i
                  class="iconfont icon-huiyuanhuangguanguanjun"
                  v-for="hotellevel in hotel.hotellevel.level"
                  :key="hotellevel.id"
                ></i>
              </span>
              <span v-if="hotel.hoteltype">{{ hotel.hoteltype.name }}</span>
            </h5>
            <el-row class="evaluate" type="flex" :gutter="10">
              <el-col :span="10">
                <el-rate
                  :value="hotel.stars"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </el-col>
              <el-col :span="7">
                <span class="height-light">{{ hotel.all_remarks }}</span>
                条评价
              </el-col>
              <el-col :span="7">
                <span class="height-light">97</span>
                篇游记
              </el-col>
            </el-row>
            <el-row class="location">
              <i class="el-icon-location"></i>位于：{{ hotel.address }}
            </el-row>
          </el-col>
          <el-col class="price-links" :span="6">
            <el-row
              :gutter="20"
              v-for="products in hotel.products"
              :key="products.id"
              @click.native="goToLink"
            >
              <el-col :span="14">{{ products.name }}</el-col>
              <el-col :span="10">
                <span class="height-light">&yen;{{ products.price }}</span>起<i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </li>
    </ul>
    <el-row class="hotel__list-pagination" type="flex" justify="center" align="middle">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage"
        :page-sizes="[6, 7, 8, 9]"
        :page-size="pageSize"
        :total="totalHotels"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HotelList',
  props: {
    hotelList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.$store.commit('hotel/setHotelListParams', {
        _limit: pageSize
      })
      this.$emit('pagination-change')
    },
    handleCurrentChange (currentPage) {
      this.$store.commit('hotel/setHotelListParams', {
        _start: (currentPage - 1) * this.pageSize
      })
      this.$emit('pagination-change')
    },
    goToLink () {
      window.open('https://hotels.ctrip.com/hotels/694679.html?hotel=694679&tab=1&#abtest=200820_HTL_cdhwp:B;')
    }
  },
  computed: {
    ...mapState('hotel', {
      totalHotels: state => state.totalHotels,
      pageSize: state => state.hotelListParams._limit
    })
  }
}
</script>

<style lang="scss" scoped>
.hotel__list {
  margin-bottom: 20px;
  .list__item {
    padding: 25px 0;
    border-bottom: 1px solid #eee;

    .image-link {
      display: block;
    }

    h4 {
      font-weight: 400;
      font-size: 24px;
    }
    h5 {
      margin-bottom: .5em;
      font-size: 16px;
      font-weight: 400;
      color: #999;
      .rate {
        display: inline-flex;
        color: #f90;
      }
    }
    .el-rate {
      display: inline-block;
    }
    .height-light {
      color: #f90;
    }
    .evaluate {
      margin-bottom: 10px;
    }
    .location {
      font-size: 14px;
      color: #666;
      .el-icon-location {
        margin-right: 5px;
      }
    }
    .price-links {
      padding: 0 10px;
      margin-top: 10px;
      .el-row {
        padding: 12px 0;
        height: 48px;
        border-bottom: 1px solid #ebeef5;
        transition: all .3s;
        color: #606266;
        cursor: pointer;
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
}
</style>
