<template>
<div>
  <Modal :styles="{top: '30px'}" v-model="modal1" title="用户信息" width="650px" :mask-closable='false'>
    <data-form ref="dataForm" :disabled="disabled" @onSave="save"></data-form>
    <div slot="footer">
      <Button @click="submit" type="info" v-if="btn" :loading="loading">提交</Button>
      <Button @click="close" type="info">关闭</Button>
    </div>
  </Modal>
  <Modal :styles="{top: '30px'}" v-model="modal2" title="角色配置" width="520px" :mask-closable='false'>
    <Transfer
        :data="roleList"
        :list-style="{width: '210px',height: '400px'}"
        :target-keys="targetKeys"
        :render-format="renderRoleName"
        filterable
        @on-change="onChange"
        ></Transfer>
    <div slot="footer">
      <Button @click="saveUserRole" type="info" v-if="btn" :loading="loading">提交</Button>
      <Button @click="() => modal2 = false" type="info">关闭</Button>
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

import api from '@/api/ucenter/user'
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
      modal2: false,
      roleList: [],
      targetKeys: [],
      userId: ''
    }
  },
  mounted () {
    this.loadData()
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
        api.add(item).then(resp => {
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
          api.del(item.userId).then(resp => {
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
    },
    roleConfig ({ userId }) {
      this.modal2 = true
      this.userId = userId
      api.getRoleByUserId(userId).then(resp => {
        if (resp.success) {
          this.roleList = []
          this.targetKeys = []
          resp.data.allRole.forEach(item => {
            this.roleList.push({key: item.roleId,label: item.roleName})
          })
          resp.data.userRole.forEach(item => {
            this.targetKeys.push(item.roleId)
          })
        }
      }).catch(err => {
        this.$Message.error(`删除失败(${err.message || ''})`)
      })
    },
    renderRoleName (item) {
      return item.label
    },
    onChange (newTargetKeys) {
      this.targetKeys = newTargetKeys
    },
    saveUserRole () {
      this.loading = true
      const params = {
        userId: this.userId,
        roleIds: this.targetKeys.join(',')
      }
      api.saveUserRole(params).then(resp => {
        if (resp.success) {
          this.$Notice.success({ title: resp.message })
        } else {
          this.$Notice.error({ title: '操作失败', desc: resp.message })
        }
        this.loading = false
        this.modal2 = false
      }).catch(err => {
        this.$Message.error(`(${err.message || ''})`)
        this.loading = false
        this.modal2 = false
      })
    }
  },
  components: {
    SearchForm, ManageTable, DataForm
  }
}
</script>