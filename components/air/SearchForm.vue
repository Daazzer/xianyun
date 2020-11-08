<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(tab, index) in tabs"
        :class="{ active: index === currentTab }"
        :key="index"
        @click="handleSearchTab(tab, index)"
      >
        <i :class="tab.icon"></i>{{ tab.name }}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <el-autocomplete
          placeholder="请搜索出发城市"
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
        />
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          v-model="form.destCity"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          v-model="form.departDate"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: '',  // 出发城市
        departCode: '',  // 出发城市代码
        destCity: '',  // 到达城市
        destCode: '',  // 到达城市代码
        departDate: '',  // 日期字符串
      }
    }
  },
  methods: {
    // tab切换时触发
    handleSearchTab (tab, index) {
      if (index === 1) {
        this.$alert('目前暂不支持往返，请使用单程选票！', '提示', {
          type: 'warning'
        })
      }
    },

    /**
     * 发送查询城市请求
     * @param {string} name 城市名
     * @returns {Promise} 搜索结果的 Promise
     */
    async querySearch (name) {
      if (name === '') {
        return []
      }

      const [err, res] = await this.$api.getAirsCity({ name })

      if (err) {
        return [{ value: '数据获取失败' }]
      }

      // 必须数据中有 value 属性
      const cityData = res.data.data.map(v => ({
        ...v,
        value: v.name
      }))

      return cityData
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch (value, cb) {
      const result = await this.querySearch(value)
      // 如果手动输入的城市与返回的数据城市完全匹配，那么就把该值的城市代码也赋值给 data
      const matchResult = result.find(v => this.form.departCity === v.value)
      if (matchResult) {
        this.form.departCity = matchResult.value
        this.form.departCode = matchResult.sort
      }
      cb(result)
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch (value, cb) {
      const result = await this.querySearch(value)
      const matchResult = result.find(v => this.form.destCity === v.value)
      if (matchResult) {
        this.form.destCity = matchResult.value
        this.form.destCode = matchResult.sort
      }
      cb(result)
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 触发和目标城市切换时触发
    handleReverse () {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit () {
      // 原生表单校验
      const rules = [
        { value: this.form.departCity, message: '请选择出发城市' },
        { value: this.form.destCity, message: '请选择到达城市' },
        { value: this.form.departDate, message: '请选择出发时间' }
      ]

      let isValidated = true
      for (const rule of rules) {
        // 如果不通过则直接停止
        if (rule.value === '' || !rule.value) {
          isValidated = false
          this.$alert(rule.message, '提示', {
            type: 'warning'
          }).catch(err => err)
          return
        }
      }

      if (!isValidated) {
        return
      }

      const query = this.form

      for (const key in query) {
        if (/(departCity|destCity)/.test(key)) {
          query[key] = query[key].replace('市', '')
        }
      }

      this.$router.push({
        path: '/air/flights',
        query
      })
    }
  }
}
</script>

<style scoped lang="scss">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;

  &-content {
    padding: 15px 50px 15px 15px;
    position: relative;

    .el-autocomplete {
      width: 100%;
    }
  }
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
    cursor: pointer;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.reverse {
  @mixin iconOpt($left, $width, $height) {
    display: block;
    content: "";
    position: absolute;
    left: $left;
    width: $width;
    height: $height;
    background: #ccc;
  }
  position: absolute;
  top: 35px;
  right: 15px;
  &:after,
  &:before {
    @include iconOpt(-35px, 25px, 1px);
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      @include iconOpt(10px, 1px, 20px);
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
