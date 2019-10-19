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
  list(root) {
    return fetch.Util.ajax({
            method: 'get',
            url: "/admin/list",
            params: {
                type: root
            }
    })
  },
  delete(id) {
    return fetch.Util.ajax({
            method: 'get',
            url: "/admin/delete",
            params: {
                id: id
            }
    })
  }
}
