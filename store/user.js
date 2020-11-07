export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  }
})

export const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data
  },
  removeUserInfo (state) {
    state.userInfo = {
      token: '',
      user: {}
    }
  }
}

export const actions = {}
