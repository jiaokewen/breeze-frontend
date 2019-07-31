<template>
<div>
  <Modal :styles="{top: '100px'}" v-model="modal1" title="角色信息" width="350px" :mask-closable='false'>
    <data-form ref="dataForm" :disabled="disabled" @onSave="save"></data-form>
    <div slot="footer">
      <Button @click="submit" type="info" v-if="btn" :loading="loading">提交</Button>
      <Button @click="close" type="info">关闭</Button>
    </div>
  </Modal>
  <search-form @doSearch="doSearch" @add="add" class="search-form">
  </search-form>
  <manage-table :data="data" :total="total" :currentPage="currentPage" @permConfig="permConfig" @edit="edit" @pageChange="pageChange" @del="del" :loading="tableLoading">
  </manage-table>
  <Modal :styles="{top: '30px'}" v-model="modal2" title="权限配置" width="520px" :mask-closable='false'>
    <Tree :data="resourcesData" show-checkbox multiple style="height: 400px"></Tree>
    <div slot="footer">
      <Button @click="savePerm" type="info" v-if="btn" :loading="loading">提交</Button>
      <Button @click="() => modal2 = false" type="info">关闭</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import SearchForm from './SearchForm'
import ManageTable from './Table'
import DataForm from './DataForm'

import api from '@/api/ucenter/role'
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
      resourcesData: [],
      roleId: ''
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
            this.$Notice.success({ title: '更新角色成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '更新角色失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '更新角色失败', desc: err })
          this.loading = false
          this.modal1 = false
        })
      } else {
        api.add(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '新增角色成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '新增角色失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '新增角色失败', desc: err })
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
          api.del(item.roleId).then(resp => {
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
    savePerm () {
      this.loading = true
      let ids = []
      this.getCheckIds(null, ids)
      const params = {
        roleId: this.roleId,
        resourcesIds: ids.join(',')
      }
      api.saveRoleResources(params).then(resp => {
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
    },
    permConfig ({roleId}) {
      this.modal2 = true
      this.roleId = roleId
      api.getResourcesTree().then(resp => {
        if (resp.success) {
          api.selectByRoleId(roleId).then(resp1 => {
            if (resp1.success) {
              let data = resp.data
              this.treeData(data)
              resp1.data.forEach(item => {
                this.addTreeSelect(item.resourcesId,data)
              })
              this.resourcesData = data
            } else {
              this.$Message.error(`(${resp1.message || ''})`)
              this.resourcesData = []
            }
          }).catch(err => {
            this.$Message.error(`(${err.message || ''})`)
            this.resourcesData = []
          })
        } else {
          this.$Message.error(`(${resp.message || ''})`)
          this.resourcesData = []
        }
      }).catch(err => {
        this.$Message.error(`(${err.message || ''})`)
        this.resourcesData = []
      })
    },
    treeData (data) {
      data.forEach(item => {
        item.title = item.resourcesName
        if (item.children.length > 0) {
          item.expand = true
          this.treeData(item.children)
        }
      })
    },
    addTreeSelect (resourcesId,data) {
      for (let item of data) {
        if (item.resourcesId === resourcesId) {
          item.checked = true
          return
        }
        if (item.children.length > 0) {
          this.addTreeSelect(resourcesId,item.children)
        }
      }
    },
    getCheckIds (data, ids) {
      if (!data) data = this.resourcesData
      data.forEach(item => {
        if (item.checked) {
          ids.push(item.resourcesId)
        }
        if (item.children.length > 0) {
          this.getCheckIds(item.children, ids)
        }
      })
    }
  },
  components: {
    SearchForm, ManageTable, DataForm
  }
}
</script>
<style lang="less">
  .ivu-tree {
    overflow: auto
  }
</style>