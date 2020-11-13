export const state = () => ({
  strategicalArticles: [],
  recommendCities: [],
  currentPage: 1,
  pageSize: 2,
  totalPage: 0
})

export const mutations = {
  setStrategicalArticles (state, data) {
    state.strategicalArticles = data
  },
  setRecommendCities (state, data) {
    state.recommendCities = data
  },
  setTotalPage (state, data) {
    state.totalPage = data
  },
  resetPagination (state) {
    state.currentPage = 1
    state.pageSize = 2
  }
}

export const actions = {
  async searchRecommendArticles ({ commit, state }, recommendCity) {
    commit('resetPagination')

    const [err, res] = await this.$api.getStrategicalArticles({
      _start: state.currentPage,
      _limit: state.pageSize,
      city: recommendCity
    })

    if (err) {
      return this.$message.error('获取文章失败，发生错误')
    }

    commit('setStrategicalArticles', res.data.data)
    commit('setTotalPage', res.data.total)
  }
}
