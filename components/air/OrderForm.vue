<template>
  <div class="main" id="orderForm">
    <div class="air-column">
      <h2>乘机人</h2>
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
          v-for="(insurance, index) in infoData.insurances"
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
        <el-form label-width="80px">
          <el-form-item label="姓名" required>
            <el-input placeholder="请输入姓名" v-model="contactName" />
          </el-form-item>

          <el-form-item label="手机" required>
            <el-input placeholder="请输入手机号" v-model="contactPhone" />
          </el-form-item>

          <el-form-item label="验证码" required>
            <el-input placeholder="请输入验证码" v-model="captcha">
              <template slot="append">
                <el-button
                  @click="handleSendCaptcha"
                  :disabled="isSendCaptcha"
                >发送验证码 <CaptchaCountDownTimer v-show="isSendCaptcha" ref="captchaCountDownTimer" /></el-button>
              </template>
            </el-input>
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
      isSendCaptcha: false,
      insurances: [], // 保险数据
      contactName: '', // 联系人名字
      contactPhone: '', // 联系人电话
      captcha: '', // 验证码
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
      this.$store.commit('air/setUsersAmount', this.users.length)
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.users.splice(index, 1)
      this.$store.commit('air/setUsersAmount', this.users.length)
    },

    handleInsurance (id, index) {
      // 修改选中状态
      this.$emit('select-insurance', index)

      const isSelected = this.infoData.insurances[index].isSelected
      const delIndex = this.insurances.indexOf(id)

      /*
      根据选中状态来添加/删除保险数据
      如果没有选中并且存在这个保险则删除
       */
      if (!isSelected && delIndex > -1) {
        this.insurances.splice(delIndex, 1)
      } else if (delIndex === -1) {
        // 如果不存在，则将当前选中的放到保险 id 集合中，并且去重
        this.insurances = [...new Set([...this.insurances, id])]
      }
      this.$store.commit('air/setInsurances', [...this.insurances])
    },

    // 发送手机验证码
    async handleSendCaptcha () {
      // 函数节流
      if (this.isSendCaptcha) {
        return
      }

      const tel = this.contactPhone

      if (tel === '') {
        this.$alert('手机号码不能为空', '提示', {
          type: 'warning'
        }).catch(err => err)
        return
      }

      if (!/^1[3456789]\d{9}$/.test(tel)) {
        this.$alert('手机号格式错误', {
          type: 'warning'
        }).catch(err => err)
        return
      }

      const [err, res] = await this.$api.getCaptchas({ tel })
      if (err) {
        return this.$message.error('手机验证码获取失败，发生错误')
      }

      const captcha = res.data.code

      this.$alert(`获取验证码成功，模拟验证码为：${captcha}`, {
        type: 'success'
      }).then(() => {
        this.captcha = captcha
        // 设置验证码发送间隔并且显示倒计时
        this.isSendCaptcha = true
        this.$refs.captchaCountDownTimer.setCountDownTimer(60, () => {
          this.isSendCaptcha = false
        })
      }).catch(err => err)
    },

    // 提交订单
    async handleSubmit () {
      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.infoData.seat_infos.seat_xid,
        air: this.infoData.id
      }

      const loadingInstance = this.$loading({
        target: '#orderForm',
        text: '正在生成订单！请稍等'
      })

      const [err, res] = await this.$api.submitAirOrders(orderData)

      if (err) {
        loadingInstance.close()
        this.$message.error('生成订单失败，发生错误')
        return
      }

      loadingInstance.close()
      this.$router.push('/air/pay')
      console.log(res)
    }
  },
  mounted () {
    // 如果默认选择了保险则显示选中状态
    const insurancesIdSet = new Set(this.infoData.insurances.filter(v => {
      if (v.isSelected) {
        return v.id
      }
    }))
    this.insurances = [...insurancesIdSet]
    this.$store.commit('air/setUsersAmount', this.users.length)
    this.$store.commit('air/setInsurances', [...this.insurances])
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
