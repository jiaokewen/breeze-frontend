import { postJSON, putJSON, del, get } from '@/libs/http'

export default {
  search (param) {
    return postJSON('/api/breeze-user/sysResources/list', param)
  },
  add (param) {
    return postJSON('/api/breeze-user/sysResources/', param)
  },
  update (param) {
    return putJSON('/api/breeze-user/sysResources/', param)
  },
  del (id) {
    return del(`/api/breeze-user/sysResources/${id}`)
  },
  list () {
    return get('/api/breeze-user/sysResources/')
  }
}
