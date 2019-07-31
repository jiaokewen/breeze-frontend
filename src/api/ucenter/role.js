import { postJSON, putJSON, del, get, post } from '@/libs/http'

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
  },
  getResourcesTree () {
    return get(`/api/breeze-user/sysResources/getTree`)
  },
  selectByRoleId (roleId) {
    return get(`/api/breeze-user/sysResources/roleId/${roleId}`)
  },
  saveRoleResources (params) {
    return post('/api/breeze-user/sysRole/saveRoleResources', params)
  }
}
