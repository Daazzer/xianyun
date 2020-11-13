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
  }
}
