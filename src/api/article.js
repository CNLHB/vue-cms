import fetch from './fetch';

export default {
  // 获取物品列表
  list(params) {
    return fetch.get('/asset/', params)
  },

  // 搜索物品列表
  search(params) {
    return fetch.get('/search/asset', params)
  },

  // 获取物品详情
  detail(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/asset/' + id, params);
  },

  // 更新物品
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/asset/', params)
  },

  // 删除物品
  destroy(id) {
    return fetch.delete('/asset/' + id)
  },

  // 创建物品
  create(params) {
    return fetch.post('/asset', params);
  }
}
