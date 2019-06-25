import { postJSON } from '@/libs/http'

export default {
  search (param) {
    return postJSON('/api/breeze-user/sysUser/list', param)
  }
}
