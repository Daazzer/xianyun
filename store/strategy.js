export const state = () => ({
  strategicalArticles: [],
  recommendCities: []
})

export const mutations = {
  setStrategicalArticles (state, data) {
    state.strategicalArticles = data
  },
  setRecommendCities (state, data) {
    state.recommendCities = data
  }
}
