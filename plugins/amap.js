/**
 * 渲染标记添加信息窗体
 * @param {Object} option 配置对象
 * @param {Object} option.map 渲染所在的地图
 * @param {string} option.icon 标记的图标
 * @param {string} option.title 标记悬停时的显示内容
 * @param {string} option.content 标记文本
 * @param {Object} option.position 标记位置
 * @param {Object} option.moveToMarker 是否开启地图镜头移动到悬停的标记上
 */
export function renderMarker (option) {
  const marker = new AMap.Marker(option)

  const infoWindow = new AMap.InfoWindow({
    offset: new AMap.Pixel(0, -35),
    content: option.title
  })

  marker.on('mouseover', e => {
    const position = e.target.getPosition()
    infoWindow.open(option.map, position)
    if (option.moveToMarker) {
      option.map.setCenter(position)
    }
  })

  marker.on('mouseout', () => {
    infoWindow.close()
  })

  option.map.setFitView()

  return marker
}

export function getMarkerContent (content) {
  return `<span class="custom-marker">${content}</span>`
}

export function searchScenics (keyword) {
  const p = new Promise(rv => {
    AMap.plugin('AMap.PlaceSearch', () => {
      // 构造地点查询类
      const placeSearch = new AMap.PlaceSearch({
        type: '风景名胜',
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      })
      placeSearch.search(keyword, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          rv(result)
        }
      })
    })
  })
  return p
}

/**
 * 根据关键字返回 10 条公交数据
 * @param {string} keyword 搜索关键字
 * @returns {Promise} 公交数据的 promise 结果
 */
export function searchStation (keyword) {
  const p = new Promise(rv => {
    AMap.plugin('AMap.StationSearch', () => {
      const station = new AMap.StationSearch({ pageSize: 10 })
      station.search(keyword, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          rv(result)
        }
      })
    })
  })
  return p
}

/**
 * 通过地图定位城市
 * @returns {Promise} 加载地图后的 promise 结果
 */
export function locatingCity () {
  const p = new Promise(rv => {
    AMap.plugin('AMap.CitySearch', () => {
      const citySearch = new AMap.CitySearch()
      citySearch.getLocalCity((status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          rv(result.city)
        }
      })
    })
  })
  return p
}
