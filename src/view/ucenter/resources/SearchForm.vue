<template>
  <Form ref="searchForm" :model="searchForm" :label-width="80" inline> <!-- 更换表单 -->
    <FormItem class="form-item" label="资源名称:" prop="resourcesName">
      <Input v-model.trim="searchForm.resourcesName" placeholder="请输入资源名称"></Input>
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
        resourcesName: ''
      }
    }
  },
  methods: {
    doSearch () { // 更换表单内容
      let param = {
        resourcesName: ''
      }
      if (this.searchForm.resourcesName) {
        param.resourcesName = this.searchForm.resourcesName
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