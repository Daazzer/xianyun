export const state = () => ({
  queryAirsHistory: []
})

export const mutations = {
  setQueryAirsHistory (state, data) {
    state.queryAirsHistory.push(data)
  },
  removeQueryAirsHistory (state) {
    state.queryAirsHistory = []
  }
}
