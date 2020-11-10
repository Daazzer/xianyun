export const state = () => ({
  queryAirsHistory: [],
  orderAside: {
    usersAmount: 0,
    insurances: []
  }
})

export const mutations = {
  setQueryAirsHistory (state, data) {
    state.queryAirsHistory.push(data)
  },
  removeQueryAirsHistory (state) {
    state.queryAirsHistory = []
  },
  setUsersAmount (state, data) {
    state.orderAside.usersAmount = data
  },
  setInsurances (state, data) {
    state.orderAside.insurances = data
  }
}
