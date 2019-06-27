import { postJSON, putJSON, del } from '@/libs/http'

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
  }
}
