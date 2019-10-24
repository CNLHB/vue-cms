import fetch from './fetch';

export default {
  // 登录
  login(params) {
    return fetch.post('/admin/login', params)
  },

  // 验证管理员token
  auth(params) {
    return fetch.get('/admin/auth', params)
  },
  list(root,pageNum,pageSize) {
    return fetch.Util.ajax({
            method: 'get',
            url: "/users",
            params: {
                type: root,
                pageNum,
                pageSize
            }
    })
  },
  delete(id) {
    return fetch.Util.ajax({
            method: 'delete',
            url: "/users",
            params: {
                id: id
            }
    })
  }
}
