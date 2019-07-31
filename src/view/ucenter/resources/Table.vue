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
  props: ['data', 'total', 'currentPage','loading', 'list'],
  data () {
    return {
      columns: [{
        title: '资源名称',
        key: 'resourcesName',
        align: 'center'
      }, {
        title: '资源编码',
        key: 'resourcesCode',
        align: 'center'
      }, {
        title: '类型',
        key: 'type',
        align: 'center',
        width: 180
      }, {
        title: '父级',
        key: 'parentId',
        align: 'center'
      }, {
        title: '操作',
        align: 'center',
        width: 250,
        render: (h, params) => {
          let item = this.data[params.index]
          return h('div', [
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