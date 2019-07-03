<template>
<div>
  <Modal :styles="{top: '30px'}" v-model="modal1" title="用户信息" width="650px" :mask-closable='false'>
    <data-form ref="dataForm" :disabled="disabled" @onSave="save"></data-form>
    <div slot="footer">
      <Button @click="submit" type="info" v-if="btn" :loading="loading">提交</Button>
      <Button @click="close" type="info">关闭</Button>
    </div>
  </Modal>
  <search-form @doSearch="doSearch" @add="add" class="search-form">
  </search-form>
  <manage-table :data="data" :total="total" :currentPage="currentPage" @edit="edit" @pageChange="pageChange" @del="del" :loading="tableLoading">
  </manage-table>
</div>
</template>

<script>
import SearchForm from './SearchForm'
import ManageTable from './Table'
import DataForm from './DataForm'

import Api from '@/api/ucenter/user'
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
      isEdit: true
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.tableLoading = true
      Api.search(Object.assign(this.params,{
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
        Api.update(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '更新用户成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '更新用户失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '更新用户失败', desc: err })
          this.loading = false
          this.modal1 = false
        })
      } else {
        Api.add(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '新增用户成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '新增用户失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '新增用户失败', desc: err })
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
          Api.del(item.userId).then(resp => {
            if (resp.success) {
              this.$Notice.success({ title: '删除成功' })
              this.loadData()
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
    }
  },
  components: {
    SearchForm, ManageTable, DataForm
  }
}
</script>