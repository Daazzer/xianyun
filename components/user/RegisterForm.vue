<template>
  <el-form class="form" ref="form" :model="form" :rules="rules">
    <el-form-item prop="username">
      <el-input
        placeholder="用户名/手机"
        v-model="form.username"
        @focus="clearValidate('username')"
      />
    </el-form-item>

    <el-form-item prop="captcha">
      <el-input
        placeholder="验证码"
        v-model="form.captcha"
        @focus="clearValidate('captcha')"
      >
        <template #append>
          <el-button @click="handleSendCaptcha" :disabled="isSendCaptcha">
            发送验证码
            <CaptchaCountDownTimer v-show="isSendCaptcha" ref="captchaCountDownTimer" />
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="nickname">
      <el-input
        placeholder="你的名字"
        v-model="form.nickname"
        @focus="clearValidate('nickname')"
      />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        placeholder="密码"
        type="password"
        v-model="form.password"
        @focus="clearValidate('password')"
      />
    </el-form-item>

    <el-form-item prop="checkPassword">
      <el-input
        placeholder="确认密码"
        type="password"
        v-model="form.checkPassword"
        @focus="clearValidate('checkPassword')"
      />
    </el-form-item>

    <el-button class="submit" type="primary" @click="register">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data () {
    const validatePass = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        cb(new Error('两次输入密码不一致!'))
      } else {
        cb()
      }
    }
    return {
      // 表单数据
      form: {
        username: '',
        password: '',
        checkPassword: '',
        nickname: '',
        captcha: ''
      },
      // 表单规则
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        checkPassword: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        captcha: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
      },
      isSendCaptcha: false,
    }
  },
  methods: {
    // 清空当前表单验证
    clearValidate (prop) {
      this.$refs.form.clearValidate(prop)
    },
    // 发送验证码
    async handleSendCaptcha () {
      // 函数节流
      if (this.isSendCaptcha) {
        return
      }
      const tel = this.form.username

      if (tel === '') {
        this.$alert('手机号不能为空', {
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
        this.form.captcha = captcha
        // 设置验证码发送间隔并且显示倒计时
        this.isSendCaptcha = true

        this.$refs.captchaCountDownTimer.setCountDownTimer(60, () => {
          this.isSendCaptcha = false
        })
      }).catch(err => err)
    },

    // 注册
    async register () {
      const isValidated = await this.$refs.form.validate().then(validated => validated).catch(inValidated => inValidated)

      if (!isValidated) {
        return
      }

      const {checkPassword, ...prop} = this.form

      const [err, res] = await this.$api.register(prop)

      if (err) {
        return this.$message.error('注册失败，发生错误')
      }

      this.$message.success('注册成功')
      this.$router.push('/user/login')
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 25px;

  &-text {
    font-size: 12px;
    color: #409eff;
    text-align: right;
    line-height: 1;
  }
}
.el-form-item {
  margin-bottom: 20px;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
