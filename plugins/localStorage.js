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
