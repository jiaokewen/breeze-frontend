import { postJSON, putJSON, del } from '@/libs/http'

export default {
  search (param) {
    return postJSON('/api/breeze-user/sysRole/list', param)
  },
  add (param) {
    return postJSON('/api/breeze-user/sysRole/', param)
  },
  update (param) {
    return putJSON('/api/breeze-user/sysRole/', param)
  },
  del (id) {
    return del(`/api/breeze-user/sysRole/${id}`)
  }
}
