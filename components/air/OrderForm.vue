<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <el-row
          v-for="(user, index) in users"
          :key="index"
          class="member-info-item"
        >
          <el-form-item label="乘机人类型">
            <el-input
              placeholder="姓名"
              class="input-with-select"
              v-model="user.username"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              placeholder="证件号码"
              class="input-with-select"
              v-model="user.id"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true" />
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </el-row>
      </el-form>

      <el-button
        class="add-member"
        type="primary"
        @click="handleAddUsers"
      >添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <el-row
          v-for="(insurance, index) in insurancesData"
          :key="insurance.id"
          class="insurance-item"
        >
          <el-checkbox
            :label="`${insurance.type}：￥${insurance.price}/份×${users.length}  最高赔付${insurance.compensation}`"
            :checked="insurance.isSelected"
            border
            @change="handleInsurance(insurance.id, index)"
          />
        </el-row>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha" />
          </el-form-item>
        </el-form>
        <el-button
          type="warning"
          class="submit"
          @click="handleSubmit"
        >提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderForm',
  props: {
    infoData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      users: [{
        username: '',
        id: ''
      }],
      insurances: [], // 保险数据
      contactName: '', // 联系人名字
      contactPhone: '', // 联系人电话
      captcha: '000000', // 验证码
      invoice: false   // 发票
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers () {
      this.users.push({
        username: '',
        id: ''
      })
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.users.splice(index, 1)
    },

    handleInsurance (id, index) {
      // 根据选中状态来添加/删除保险数据
      this.insurancesData[index].isSelected = !this.insurancesData[index].isSelected

      const isSelected = this.insurancesData[index].isSelected
      const delIndex = this.insurances.indexOf(id)

      // 如果没有选中并且存在这个保险则删除
      if (!isSelected && delIndex > -1) {
        this.insurances.splice(delIndex, 1)
      } else if (delIndex === -1) {
        // 如果不存在，则将当前选中的放到保险 id 集合中，并且去重
        this.insurances = [...new Set([...this.insurances, id])]
      }
    },

    // 发送手机验证码
    handleSendCaptcha () {

    },

    // 提交订单
    handleSubmit () {
      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.data.seat_infos.seat_xid,
        air: this.data.id
      }

      console.log(orderData)
    }
  },
  computed: {
    // 改造保险数据，添加选中状态属性
    insurancesData () {
      return this.infoData.insurances.map(v => {
        v.isSelected = false
        return v
      })
    }
  },
  mounted () {
    // 如果默认选择了保险则显示选中状态
    const insurancesIdSet = new Set(this.insurancesData.filter(v => {
      if (v.isSelected) {
        return v.id
      }
    }))
    this.insurances = [...insurancesIdSet]
  }
}
</script>

<style scoped lang="scss">
.air-column {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px #ddd dashed;

  h2 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: normal;
  }
}

::v-deep .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
  ::v-deep .el-input-group__prepend {
    background-color: #fff;
  }
}
.member-info {
  ::v-deep .el-form-item {
    margin-bottom: 0;
  }

  &-item {
    border-bottom: 1px #eee dashed;
    padding-bottom: 20px;
    position: relative;

    &:first-child {
      .delete-user {
        display: none;
      }
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
  &-item {
    margin-bottom: 20px;
  }
}

.contact {
  ::v-deep .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
