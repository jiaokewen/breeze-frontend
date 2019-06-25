<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :btnLoading="btnLoading"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { setToken } from '@/libs/util'

export default {
  components: {
    LoginForm
  },
  data () {
    return {
      btnLoading: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'setUserInfo'
    ]),
    handleSubmit ({ username, password }) {
      this.btnLoading = true
      this.handleLogin({ username, password }).then(res => {
        if (res.success) {
          setToken(res.data.nickName)
          this.setUserInfo({ res })
          this.$router.push({
            name: this.$config.homeName
          })
        } else {
          this.btnLoading = false
          this.$Message.warning('用户名或密码错误')
        }
      }).catch(err => {
        this.$Message.warning(err)
        this.btnLoading = false
      })
    }
  }
}
</script>

<style>

</style>
