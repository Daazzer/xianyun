<template>
  <el-form class="form" ref="form" :model="form" :rules="rules">
    <el-form-item prop="username">
      <el-input
        placeholder="用户名/手机"
        v-model="form.username"
        @focus="clearValidate('username')"
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

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    // 由于默认直接使用 rules 中的 required 与 message 属性，验证提示是英文的，所以在此自定义一个
    const checkUsername = (rule, value, cb) => {
      if (value === '') {
        return cb(new Error('用户名不能为空'))
      }
      if (!/^\w+$/.test(value)) {
        return cb(new Error('非法的用户名'))
      }
      cb()
    }
    const checkPassword = (rule, value, cb) => {
      if (value === '') {
        return cb(new Error('密码不能为空'))
      }
      cb()
    }

    return {
      form: {
        username: '',
        password: ''
      },
      // 表单规则
      rules: {
        username: [
          {
            validator: checkUsername,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    const userInfo = JSON.parse(localStorage.getItem('xianyun_userInfo'))

    console.log(userInfo)
  },
  methods: {
    // 提交登录
    async handleLoginSubmit () {
      // 通过 promise 验证表单
      const isValidate = await this.$refs.form.validate().then(validated => validated).catch(invalidated => invalidated)

      if (!isValidate) {
        return
      }

      const [err, res] = await this.$api.login(this.form)

      if (err) {
        console.log(err)
        return this.$message.error('登录失败，发生错误')
      }

      this.$store.commit('user/setUserInfo', res.data)

      this.$message.success('登录成功')

      // 跳转到首页
      setTimeout(() => this.$router.replace('/'), 1000)

      console.log(res)
    },
    // 清空当前表单验证
    clearValidate (prop) {
      this.$refs.form.clearValidate(prop)
    }
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
