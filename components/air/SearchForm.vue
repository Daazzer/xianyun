<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :class="{ active: index === currentTab }"
        :key="index"
        @click="handleSearchTab(item, index)"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <el-autocomplete
          placeholder="请搜索出发城市"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
        />
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%"
          @change="handleDate"
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
    }
  },
  methods: {
    // tab切换时触发
    handleSearchTab (item, index) {

    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch (value, cb) {
      cb([
        { value: 1 },
        { value: 2 },
        { value: 3 },
      ])
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch (value, cb) {
      cb([
        { value: 1 },
        { value: 2 },
        { value: 3 },
      ])
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {

    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {

    },

    // 确认选择日期时触发
    handleDate (value) {

    },

    // 触发和目标城市切换时触发
    handleReverse () {

    },

    // 提交表单是触发
    handleSubmit () {

    }
  },
  mounted () {

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
