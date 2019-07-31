<template>
<div>
  <Modal :styles="{top: '100px'}" v-model="modal1" title="资源信息" width="350px" :mask-closable='false'>
    <data-form ref="dataForm" :disabled="disabled" @onSave="save" :list="list"></data-form>
    <div slot="footer">
      <Button @click="submit" type="info" v-if="btn" :loading="loading">提交</Button>
      <Button @click="close" type="info">关闭</Button>
    </div>
  </Modal>
  <search-form @doSearch="doSearch" @add="add" class="search-form">
  </search-form>
  <manage-table :data="data" :total="total" :currentPage="currentPage" @edit="edit" @pageChange="pageChange" @del="del" :loading="tableLoading"
  @roleConfig="roleConfig">
  </manage-table>
</div>
</template>

<script>
import SearchForm from './SearchForm'
import ManageTable from './Table'
import DataForm from './DataForm'

import api from '@/api/ucenter/resources'
/* eslint-disable */
export default {
  data () {
    return {
      params: {},
      data: [],
      total: 1,
      currentPage: 1,
      pageSize: 10,
      modal1: false,
      loading: false,
      tableLoading: false,
      btn: true,
      disabled: false,
      isEdit: true,
      list: []
    }
  },
  mounted () {
    this.loadData()
    this.getResourcesList()
  },
  methods: {
    loadData () {
      this.tableLoading = true
      api.search(Object.assign(this.params,{
        page: this.currentPage,
        rows: this.pageSize
      })).then(resp => {
        if (resp.success) {
          this.total = resp.total
          this.data = resp.data
          this.tableLoading = false
        } else {
          this.$Message.error('加载数据失败')
          this.tableLoading = false
        }
      }).catch(err => {
        this.$Notice.error({ title: '加载数据失败', desc: err })
        this.tableLoading = false
      })
    },
    doSearch (params) {
      this.currentPage = 1
      this.params = params
      this.loadData()
    },
    save (item) {
      this.loading = true
      if (this.isEdit) {
        api.update(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '更新资源成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '更新资源失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '更新资源失败', desc: err })
          this.loading = false
          this.modal1 = false
        })
      } else {
        api.add(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '新增资源成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '新增资源失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '新增资源失败', desc: err })
          this.loading = false
          this.modal1 = false
        })
      }
    },
    add () {
      this.$refs.dataForm.reSetForm(true)
      this.isEdit = false
      this.modal1 = true
      this.btn = true
      this.disabled = false
    },
    edit (item) {
      this.$refs.dataForm.initData(item)
      this.isEdit = true
      this.modal1 = true
      this.btn = true
      this.disabled = true
    },
    del (item) {
      this.$Modal.confirm({
        title: '删除确认',
        content: `确认要删除吗?`,
        onOk: () => {
          api.del(item.resourcesId).then(resp => {
            if (resp.success) {
              this.$Notice.success({ title: '删除成功' })
              this.loadData()
              this.getResourcesList()
            }
          }).catch(err => {
            this.$Message.error(`删除失败(${err.message || ''})`)
          })
        }
      })
    },
    submit () {
      this.$refs.dataForm.submit()
    },
    close () {
      this.modal1 = false
      this.$refs.dataForm.reSetForm()
    },
    pageChange (page) {
      this.currentPage = page
      this.loadData()
    },
    getResourcesList () {
      api.list().then(resp => {
        if (resp.success) {
          this.list = resp.data
        }
      })
    }
  },
  components: {
    SearchForm, ManageTable, DataForm
  }
}
</script>