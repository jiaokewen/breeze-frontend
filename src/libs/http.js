import axios from '@/libs/api.request'
import qs from 'qs'

/**
 * 发送post请求
 * @param {*} api
 * @param {*} param
 */
export const postJSON = (api, param) => {
  return new Promise((resolve, reject) => {
    var promise = axios.request({
      url: api,
      data: JSON.stringify(param),
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset:utf-8'
      }
    })
    promise.then(resp => {
      if (resp.code === 200) {
        resolve(resp)
      } else if (resp.code === 500) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 430) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 401) {
        reject(new Error('服务器错误,请联系管理员'))
      } else {
        reject(new Error('服务器错误,请联系管理员'))
      }
    }, resp => {
      reject(resp)
    })
  })
}

export const putJSON = (api, param) => {
  return new Promise((resolve, reject) => {
    var promise = axios.request({
      url: api,
      data: JSON.stringify(param),
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset:utf-8'
      }
    })
    promise.then(resp => {
      if (resp.code === 200) {
        resolve(resp)
      } else if (resp.code === 500) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 430) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 401) {
        reject(new Error('服务器错误,请联系管理员'))
      } else {
        reject(new Error('服务器错误,请联系管理员'))
      }
    }, resp => {
      reject(resp)
    })
  })
}

export const del = (api) => {
  return new Promise((resolve, reject) => {
    var promise = axios.request({
      url: api,
      method: 'delete'
    })
    promise.then(resp => {
      if (resp.code === 200) {
        resolve(resp)
      } else if (resp.code === 500) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 430) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 401) {
        reject(new Error('服务器错误,请联系管理员'))
      } else {
        reject(new Error('服务器错误,请联系管理员'))
      }
    }, resp => {
      reject(resp)
    })
  })
}

export const get = (api) => {
  return new Promise((resolve, reject) => {
    var promise = axios.request({
      url: api,
      method: 'get'
    })
    promise.then(resp => {
      if (resp.code === 200) {
        resolve(resp)
      } else if (resp.code === 500) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 430) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 401) {
        reject(new Error('服务器错误,请联系管理员'))
      } else {
        reject(new Error('服务器错误,请联系管理员'))
      }
    }, resp => {
      reject(resp)
    })
  })
}

export const post = (api, param) => {
  return new Promise((resolve, reject) => {
    var promise = axios.request({
      url: api,
      data: qs.stringify(param),
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    promise.then(resp => {
      if (resp.code === 200) {
        resolve(resp)
      } else if (resp.code === 500) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 430) {
        reject(new Error('服务器错误,请联系管理员'))
      } else if (resp.code === 401) {
        reject(new Error('服务器错误,请联系管理员'))
      } else {
        reject(new Error('服务器错误,请联系管理员'))
      }
    }, resp => {
      reject(resp)
    })
  })
}
