<template>
  <div>
    <Table :loading="loading" :data="data" height="350" :columns="columns" stripe>
    </Table>
    <div v-if="total > 0" style="margin: 10px; overflow: hidden;">
      <div style="float: right; ">
          <Page :total="total" :current="currentPage" show-elevator show-total
            @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: ['data', 'total', 'currentPage','loading'],
  data () {
    return {
      columns: [{
        title: '用户名',
        key: 'loginName',
        align: 'center'
      }, {
        title: '昵称',
        key: 'nickName',
        align: 'center'
      }, {
        title: '邮箱地址',
        key: 'email',
        align: 'center',
        width: 180
      }, {
        title: '微信',
        key: 'wechatNumber',
        align: 'center'
      }, {
        title: '电话',
        key: 'phoneNumber',
        align: 'center'
      }, {
        title: '年龄',
        key: 'age',
        align: 'center',
        width: 80
      }, {
        title: '操作',
        align: 'center',
        width: 250,
        render: (h, params) => {
          let item = this.data[params.index]
          return h('div', [
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  window.open(item.id)
                }
              }
            }, '角色配置'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                icon: 'md-create'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$emit('edit', item)
                }
              }
            },'编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small',
                icon: 'ios-trash'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$emit('del', item)
                }
              }
            },'删除')
          ])
        }
      }]
    }
  },
  methods: {
    pageChange (page) {
      this.$emit('pageChange', page)
    }
  }
}
</script>