export const state = () => ({
  locationCity: '',
  hotelListParams: {
    city: undefined,  // 城市id
    enterTime: undefined,  // 入店时间
    leftTime: undefined,  // 离店时间
    // person: undefined, // 人数（暂时不用）
    price_in: undefined,  // 酒店价格
    hotellevel: [],  // 酒店等级
    hoteltype: [],  // 酒店类型
    hotelbrand: [],  // 酒店设施
    hotelasset: [],  // 酒店品牌
    _start: 0,  // 数据索引
    _limit: 6  // 返回数据的条数
  }
})

export const mutations = {
  setLocationCity (state, data) {
    state.locationCity = data
  },
  /**
   * 通过传入的 data 对象来修改酒店列表请求参数的数据，将传入的对象属性合并到已存在
   * 的字段中，如果原字段不存在则忽略
   * @param {Object} state vuex 中的 state
   * @param {Object} data 传入的数据对象
   */
  setHotelListParams (state, data) {
    const hotelListParams = state.hotelListParams
    for (const key in data) {
      if (hotelListParams.hasOwnProperty(key)) {
        hotelListParams[key] = data[key]
      }
    }
  }
}
