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

