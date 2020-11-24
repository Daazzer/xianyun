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

    <el-button class="submit" type="primary" @click="login">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\w+$/,
            message: '非法的用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 提交登录
    async login () {
      // 通过 promise 验证表单
      const isValidate = await this.$refs.form.validate().then(validated => validated).catch(invalidated => invalidated)

      if (!isValidate) {
        return
      }

      const [err, res] = await this.$api.login(this.form)

      if (err) {
        return
      }

      this.$store.commit('user/setUserInfo', res.data)

      this.$message.success('登录成功')

      // 跳转到首页
      setTimeout(() => this.$router.back(), 1000)
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
