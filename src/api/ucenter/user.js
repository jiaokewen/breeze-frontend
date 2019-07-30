import { postJSON, putJSON, del, get, post } from '@/libs/http'

export default {
  search (param) {
    return postJSON('/api/breeze-user/sysUser/list', param)
  },
  add (param) {
    return postJSON('/api/breeze-user/sysUser/', param)
  },
  update (param) {
    return putJSON('/api/breeze-user/sysUser/', param)
  },
  del (id) {
    return del(`/api/breeze-user/sysUser/${id}`)
  },
  getRoleByUserId (id) {
    return get(`/api/breeze-user/sysRole/userId/${id}`)
  },
  saveUserRole (params) {
    return post('/api/breeze-user/sysRole/saveUserRole', params)
  }
}
