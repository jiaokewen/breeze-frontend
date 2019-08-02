<template>
  <div style="width: 100%;height: 500px;">
      <Form ref="searchForm" :model="dataFrom" :label-width="80" inline> <!-- 更换表单 -->
        <FormItem class="form-item" label="标题:" prop="title">
          <Input v-model.trim="dataFrom.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="状态:" prop="status">
          <RadioGroup v-model="dataFrom.status">
            <Radio :label="'public'">发布</Radio>
            <Radio :label="'draft'">草稿</Radio>
          </RadioGroup>
        </FormItem>
        <br>
        <FormItem label="标签:" class="form-item">
          <Tag checkable :checked="false" color="blue">Java</Tag>
          <Tag checkable :checked="false" color="yellow">JavaScript</Tag>
          <Tag checkable :checked="false" color="green">算法</Tag>
          <Tag checkable :checked="false" color="red">Spring Cloud</Tag>
          <Tag checkable :checked="false" color="purple">数据结构</Tag>
          <Tag checkable :checked="false" color="cyan">数据库</Tag>
          <Tag checkable :checked="false" color="orange">TCP/IP</Tag>
          <Tag checkable :checked="false" color="volcano">设计模式</Tag>
          <Tag checkable :checked="false" color="geekblue">并发编程</Tag>
          <Tag checkable :checked="false" color="magenta">JVM</Tag>
          <Tag checkable :checked="false" color="gold">其他</Tag>
        </FormItem>
        <FormItem class="form-item">
          <Button @click="add" type="success" style="margin-left: 8px">保存</Button>
        </FormItem>
      </Form>
      <mavon-editor
        style="height: 100%;width: 100%;"
        v-model = 'dataFrom.blogContent'
        :ishljs="true"
        :codeStyle="code_style"
        ref=md @imgAdd="imgAdd"
        @save="save"
      />
  </div>
</template>
<script>
/* eslint-disable */
import axios from '@/libs/api.request'

export default {
  data () {
    return {
      dataFrom: {
        blogContent: '',
        title: '',
        tags: '',
        status: 'public'
      }
    }
  },
  mounted () {

  },
  methods: {
    imgAdd (pos, file) {
      let formdata = new FormData()
      formdata.append('file', file)
      axios.request({
          url: '/api/breeze-file/file/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
        if (res.success) {
          this.$refs.md.$img2Url(pos, res.data)
        } else {
          this.$Message.error(`图片上传失败`)
        }
      })
    },
    save () {
      console.log(this.blogContent)
    }
  }
}
</script>
<style lang="less">
</style>