# 闲云旅游项目

## 使用方法

```bash
# 安装依赖
$ npm install

# 项目开发服务器
$ npm run dev

# 打包编译并运行服务器
$ npm run build
$ npm run start

# 生成静态项目
$ npm run generate
```



## 项目技术

- 服务端渲染框架：[nuxt.js](https://nuxtjs.org/)
- UI 框架：[element-ui](https://element.eleme.cn/#/)
- 预编译样式语言：[sass](https://sass-lang.com/)
- http 库：[@nuxtjs/axios](https://github.com/nuxt-community/axios-module#readme)
- vuex 状态与本地存储动态数据更插件：[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)



## 项目目录结构

```bash
.
├─assets
├─components
│  ├─air # 机票页对应组件
│  ├─hotel # 酒店页对应组件
│  ├─strategy # 旅游攻略页对应组件
│  └─user # 用户对应组件
├─layouts
├─middleware
├─pages # 页面路由目录
│  ├─air # 机票页
│  ├─hotel # 酒店页
│  ├─strategy # 旅游攻略页
│  └─user # 用户
├─plugins
│  └─api # 封装的 api 方法
├─static
└─store
```



## 项目配置

```js
// /nuxt.config.js
// ...
export default {
  // ...
  // 免去手动引入组件
  components: true,
  // 项目插件
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    // 本地存储插件，在客户端渲染
    { src: '@/plugins/localStorage', ssr: false }
  ],
  // ...
}
```



## 项目路由

| 描述       | URL            |
| ---------- | -------------- |
| 首页       | `/`            |
| 机票页     | `/air`         |
| 航班列表页 | `/air/flights` |
| 酒店页     | `/hotel`       |
| 旅游攻略页 | `/strategy`    |
| 登录页     | `/user/login`  |



## 页面总结构

1. 在 `components` 中新建应用统一的头部组件和页脚组件。
2. 在默认布局中 `/layouts/default.vue` 中导入公共组件。

`/layouts/default.vue`

```vue
<!--
	...
-->
<template>
  <div id="app">
    <SiteHeader />
    <!-- 相当于 <router-view /> -->
    <Nuxt />
    <SiteFooter />
  </div>
</template>
<!--
	...
-->
```



### 头部菜单栏

`/components/SiteHeader.vue`

```vue
<!-- 菜单栏 -->
<el-row type="flex" class="navs">
  <nuxt-link to="/">首页</nuxt-link>
  <nuxt-link to="/strategy">旅游攻略</nuxt-link>
  <nuxt-link to="/hotel">酒店</nuxt-link>
  <nuxt-link to="/air">国内机票</nuxt-link>
</el-row>
```



## 封装 API 方法

默认 @nuxt/axios 安装以后，会在全局的 nuxt 上下文注册一个 $axios 原生对象。同时也会集成原生的 `axios` 模块，可以直接全局引入。

参考文档发现，可以使用插件函数访问 Nuxt 上下文对象进行 `$axios` 访问。

所有的 Nuxt 插件会在 vue 执行前执行

在此，尝试基于 @nuxt/axios 的封装。

技术实现：

- 自定义 nuxt 插件文件
- 在插件文件中定义一个插件函数
- 在 `nuxt.config.js` 文件进行插件配置



重新配置 `axios`

`$axios` 是在安装配置好 @nuxt/axios 以后默认注入在 nuxt 对象中的，只能在局部函数中访问

```js
// plugins/axios.js
// 注意，@nuxtjs/axios 默认就集成了原生 axios，可以直接 import axios from 'axios'
import api from './api'

export default ({ $axios }, inject) => {
  /**
   * @see {@link http://157.122.54.189:9095} 在线数据库
   * @see {@link http://localhost:1337} 本地数据库
   */
  $axios.setBaseURL('http://157.122.54.189:9095')

  // 可以设置请求拦截器

  // 通过 inject 将 $api 注入到 Vue 实例原型
  inject('api', api($axios))
}

```



基于上述的机制，我们需要先定义 api 的工厂函数

- 默认导出一个工厂函数，接收一个 axios 参数
- 封装一个统一处理 axios 请求的响应和错误函数

```js
// plugins/api/index.js
import index from './_index'
import hotel from './_hotel'
import account from './_account'

/**
 * 集中处理 axios 的响应与错误
 * @param {Promise} axios axios Promise 对象
 * @returns {Promise<Response>}
 */
export const handleAxiosRequest = axios => (
  axios.then(res => [null, res]).catch(err => [err])
)

export default axios => ({
  ...index(axios),
  ...hotel(axios),
  ...account(axios)
})
```



具体 api 方法实现

以首页的轮播图为例：

```js
// plugins/api/_index.js
import { handleAxiosRequest } from './index'

export default axios => ({
  getBanners: () => handleAxiosRequest(axios.get('/scenics/banners'))
})
```



最后在 nuxt.config.js 修改配置

```js
// ...
plugins: [
  '@/plugins/axios',
],

// === 需要删掉 ====
// axios: {
//   // baseURL: "http://localhost:1337" 
// },
```



[@nuxt/axios 文档参考](https://axios.nuxtjs.org/extend)

[nuxt 文档参考](https://zh.nuxtjs.org/docs/2.x/directory-structure/plugins)



## 首页

### 技术实现

- `Row` 布局组件

- `Carousel` 组件实现轮播图

- tab 栏切换样式

  - C3 的 `transform` 设置梯形标签

    - `perspective()` 设置 3D 视距
    - `transform-origin` 设置变形基准原点 

    ```vue
    <!-- @pages/index.vue -->
    <style lang="scss" scoped>
    // ...
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-bottom: none;
      transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
      transform-origin: bottom left;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 1px 2px 0 0;
      box-sizing: border-box;
    }
    // ...
    </style>
    ```

- tab 栏的切换

  - 利用当前的点击索引变量切换 tab 栏的样式

    ```vue
    <template>
    <!-- 
    ...
    -->
    <!-- tab栏 -->
    <el-row type="flex" class="search-tab">
      <span
            v-for="(item, index) in options"
            :key="index"
            :class="{ active: index === currentOption }"
            @click="handleOption(index)"
            >
        <i>{{ item.name }}</i>
      </span>
      </el-row>
    <!-- 
    ...
    -->
    </template>
    
    <script>
    data () {
    	return {
      // ...
        options: [    // 搜索框tab选项
          {
            name: '攻略',
            placeholder: '搜索城市',
            pageUrl: '/strategy?city='
          },
          {
            name: '酒店',
            placeholder: '请输入城市搜索酒店',
            pageUrl: '/hotel?city='
          },
          {
            name: '机票',
            placeholder: '请输入出发地',
            pageUrl: '/air'
          }
        ],
       // ...
      }
    },
    methods: {
    	// ...
      handleOption (index) {
        // 设置当前tab
        this.currentOption = index
    
        // 如果切换的机票tab，那么直接跳转到机票首页
        const optionItem = this.options[index]
    
        if (optionItem.name === '机票') {
          return this.$router.push(optionItem.pageUrl)
        }
      },
      // ...
    }
    </script>
    ```

    

- `Input` 组件实现搜索功能

- 发送请求获取轮播图数据



## 用户登录页

### 技术实现

- `Container` 、`Row`组件布局

- 表单头部切换标签，通过当前点击索引判断改变样式，切换到登录表单或注册表单

- `LoginForm` 与 `RegisterForm` 的自定义封装

- `LoginForm` 组件实现登录功能

  - `Form`、`FormItem`、`Input` 组件实现用户登录数据存储和校验

    ```vue
    <!-- 校验规则 -->
    <script>
    // ...
    data () {
      return {
        // ...
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
        // ...
      }
    }
    // ...
    </script>
    ```

  - 输入框聚焦时清除校验规则，提升体验
  - 登录后将用户信息存储到 `vuex`
  - 利用 `vuex-persistedstate`  将 `vuex`  中的数据与 `localStorage` 同步更新，实现数据持久化
  - 登录成功后的页面跳转，并且将用户数据提交 `vuex` 进行数据更新
  - [`vuex-persistedstate` 的部分 `vuex` 数据存储](#使用 vuex-persistedstate 存储部分 vuex 数据到本地)

- `RegisterForm` 组件实现注册功能

  - `Form`、`FormItem`、`Input`  组件实现用户登录数据存储和校验

  - 密码确认校验

    ```vue
    <script>
    // ...
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
        // ...
        rules: {
          // ...
          checkPassword: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          // ...
        }
        // ...
      }
    }
    // ...
    </script>
    ```

  - 验证码发送

    ```js
    // 发送验证码
    async handleSendCaptcha () {
      const tel = this.form.username
    
      if (tel === '') {
        this.$alert('手机号不能为空', {
          type: 'warning'
        }).catch(err => err)
        return
      }
      if (!/^1[35789]\d{9}$/.test(tel)) {
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
        this.setSendCaptchaInterval(60)
        this.isSendCaptcha = true
      }).catch(err => err)
    },
    ```

  - 验证码发送倒计时

    ```vue
    <script>
    data () {
      return {
        isSendCaptcha: false,
        sendCaptchaCountDown: 0
      }
    },
    methods: {
     /**
     	* 设置验证码发送倒计时
     	* @param {number} interval 验证码再次发送的间隔
     	*/
      setSendCaptchaInterval (interval) {
        // 记录点击时刻
        const clickTime = Date.now()
        this.sendCaptchaCountDown = interval
        let countTime = setInterval(() => {
          // 每隔一秒获取当前时刻
          const nowTime = Date.now()
          // 对比两个时间间隔
          const diffTime = parseInt((nowTime - clickTime)/1000)
          // 给页面显示倒计时
          this.sendCaptchaCountDown--
          if (diffTime >= interval) {
            clearInterval(countTime)
            // 改变发送状态
            this.isSendCaptcha = false
          }
        }, 1000)
      }
    }
    </script>
    ```

    

 

### 使用 vuex-persistedstate 存储部分 vuex 数据到本地

`vuex-persistedstate` 默认会将所有 `vuex` 的数据存到本地，但是如果部分存储的话需要[配置](https://github.com/robinvdvleuten/vuex-persistedstate#createpersistedstateoptions)多一个 `paths` 属性

`createPersistedState([options])`

- `key <String>`：存储持久化数据的键名
- `paths <Array>`：一个可以传入路径字符串的数组，如果不设置这个属性，则整个 `vuex` 数据都会存到本地。如果传入一个空数组，则不会保存数据。路径语法必须使用点语法。如果 `vuex` 使用了 `modules` 模式，则需要包含模块名，例如`"auth.user"`。（Nuxt 默认就是使用 `vuex` 的  `modules` 模式）。默认值为 `undefined`

```js
// @/plugins/localStorage.js
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'xianyun', // 读取本地存储的数据到 vuex
      /**
       * 利用 paths 保存部分状态到本地
       * @see {@link https://github.com/robinvdvleuten/vuex-persistedstate#example-with-vuex-modules Github@vuex-persistedstate}
       */
      paths: ['user.userInfo']
    })(store)
  })
}
```



## 机票搜索页

### 技术实现

- `SearchForm` 组件封装

  - `Form`、`FormItem` 组件实现搜索数据的存储与展示

  - `AutoComplete` 组件实现自动匹配搜索建议，补全搜索

  - `DatePicker` 组件实现出发日期选择，`value-format` 属性实现日期数据的格式化

  - 出发城市的输入联想

  - 目的地城市的输入联想

  - 如果输入的城市名与匹配建议完全一致，则补全搜索数据

    ```vue
    <script>
    // ...
    methods: {
      // ...
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
      // ...
    }
    </script>
    ```

    

  - 出发城市与目的地城市之间的数据切换

  - 机票数据搜索提交前的校验功能

- 机票推荐数据获取
