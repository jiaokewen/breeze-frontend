<template>
  <Form ref="dataForm" :model="dataModel" :rules="rules" :label-width="110"> <!-- 更换表单 -->
    <FormItem label="用户名:" prop="loginName">
      <Input v-model="dataModel.loginName"  :disabled="disabled" placeholder="请输入用户名" style="width: 230px"></Input>
    </FormItem>
    <FormItem label="昵称:" prop="nickName">
      <Input v-model="dataModel.nickName" placeholder="请输入昵称" style="width: 230px"></Input>
    </FormItem>
    <FormItem v-if="showPassword" label="密码:" prop="password">
      <Input v-model="dataModel.password" placeholder="请输入密码" style="width: 230px"></Input>
    </FormItem>
    <FormItem label="邮箱:" prop="email">
      <Input v-model="dataModel.email" placeholder="请输入邮箱" style="width: 230px"></Input>
    </FormItem>
    <FormItem label="电话号码:" prop="phoneNumber">
      <Input v-model="dataModel.phoneNumber"  placeholder="请输入电话号码" style="width: 230px"></Input>
    </FormItem>
    <FormItem label="性别:" prop="sex">
      <RadioGroup v-model="dataModel.sex">
        <Radio :label="1">男</Radio>
        <Radio :label="2">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="年龄:" prop="age">
      <Input v-model="dataModel.age" type="number" placeholder="请输入年龄" style="width: 230px"></Input>
    </FormItem>
  </Form>
</template>

<script>
// import TargetApi from '@/api/ContentType'
/* eslint-disable */
export default {
  props: ['disabled'],
  data () {
    return {
      dataModel: {
        userId: '',
        loginName: '',
        nickName: '',
        password: '',
        email: '',
        phoneNumber: '',
        sex: '',
        age: ''
      },
      showPassword: true,
      typeList: [],
      rules: { // 更换规则
        loginName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', max: 16, message: '用户名不能大于16', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    submit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$emit('onSave', this.dataModel)
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    cancel () {
      this.$emit('onCancel')
    },
    initData (initData) {
      this.reSetForm(false)
      this.dataModel.userId = initData.userId
      this.dataModel.loginName = initData.loginName
      this.dataModel.nickName = initData.nickName
      this.dataModel.phoneNumber = initData.phoneNumber
      this.dataModel.email = initData.email
      this.dataModel.age = initData.age
      this.dataModel.sex = initData.sex
    },
    reSetForm (flag) {
      this.showPassword = flag
      this.$refs.dataForm.resetFields()
      this.dataModel.userId = ''
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  margin-top: 30px;
  width: 500px;
}
.btn {
  width: 100px;
}
</style>