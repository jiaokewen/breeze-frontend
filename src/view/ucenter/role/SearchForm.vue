<template>
  <Form ref="searchForm" :model="searchForm" :label-width="80" inline> <!-- 更换表单 -->
    <FormItem class="form-item" label="昵称:" prop="roleName">
      <Input v-model.trim="searchForm.roleName" placeholder="请输入角色名称"></Input>
    </FormItem>
    <FormItem class="form-item">
      <Button @click="doSearch" type="primary" icon="ios-search">搜索</Button>
      <Button @click="doReset" type="default" icon="md-refresh" style="margin-left: 8px">重置</Button>
      <Button @click="add" type="warning" icon="ios-add" style="margin-left: 8px">添加</Button>
    </FormItem>
  </Form>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      searchForm: { // 更换表单内容
        roleName: ''
      }
    }
  },
  methods: {
    doSearch () { // 更换表单内容
      let param = {
        roleName: ''
      }
      if (this.searchForm.roleName) {
        param.roleName = this.searchForm.roleName
      }
      this.$emit('doSearch', param)
    },
    doReset () {
      this.$refs.searchForm.resetFields()
      this.$emit('doSearch', {})
    },
    add () {
      this.$emit('add')
    }
  }
}
</script>