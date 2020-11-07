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

`/nuxt.config.js`

```js
// ...
export default {
  // ...
  // 免去手动引入组件
  components: true,
  axios: {
    baseURL: "http://157.122.54.189:9095" // 在线数据接口
  },
  // ...
}
```



## 项目路由

| 描述     | URL           |
| -------- | ------------- |
| 首页     | `/`           |
| 机票     | `/air`        |
| 酒店     | `/hotel`      |
| 旅游攻略 | `/strategy`   |
| 登录     | `/user/login` |



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

