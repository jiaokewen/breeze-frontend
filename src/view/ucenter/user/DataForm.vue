<template>
  <Form ref="dataForm" :model="dataModel" :rules="rules" :label-width="90">
    <Row>
      <Col span="11">
        <FormItem label="用户名:" prop="loginName">
          <Input
            v-model="dataModel.loginName"
            :disabled="disabled"
            placeholder="请输入用户名"
            style="width: 200px"
          ></Input>
        </FormItem>
      </Col>
      <Col span="11">
        <FormItem label="昵称:" prop="nickName">
          <Input v-model="dataModel.nickName" placeholder="请输入昵称" style="width: 200px"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="11">
        <FormItem label="密码:" prop="password">
          <Input :disabled="disabled" type="password" v-model="dataModel.password" placeholder="请输入密码" style="width: 200px"></Input>
        </FormItem>
      </Col>
      <Col span="11">
        <FormItem label="邮箱:" prop="email">
          <Input v-model="dataModel.email" placeholder="请输入邮箱" style="width: 200px"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="11">
        <FormItem label="电话号码:" prop="phoneNumber">
          <Input v-model="dataModel.phoneNumber" placeholder="请输入电话号码" style="width: 200px"></Input>
        </FormItem>
      </Col>
      <Col span="11">
        <FormItem label="年龄:" prop="age">
          <Input v-model="dataModel.age" type="number" placeholder="请输入年龄" style="width: 200px"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="11">
        <FormItem label="性别:" prop="sex">
          <RadioGroup v-model="dataModel.sex">
            <Radio :label="1">男</Radio>
            <Radio :label="2">女</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col span="11">
        <FormItem label="状态:" prop="state">
          <RadioGroup v-model="dataModel.state">
            <Radio :label="1">启用</Radio>
            <Radio :label="0">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <FormItem label="头像:">
      <div style="display: inline-block" v-if="editAvatar.status === 'finished'">
        <div class="demo-upload-list">
          <template>
            <img :src="editAvatar.url" />
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(editAvatar.url)"></Icon>
            </div>
          </template>
        </div>
      </div>
      <div v-else v-for="(item, index) in uploadList" :key="index" style="display: inline-block">
        <div
          class="demo-upload-list"
          v-if="(uploadList.length === 1 && index === 1) || index === (uploadList.length - 1)"
        >
          <template v-if="item.status === 'finished'">
            <img :src="item.url" />
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="/api/breeze-file/file/upload"
        style="display: inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="查看大图" :styles="{top: '10px'}" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%" />
      </Modal>
    </FormItem>
  </Form>
</template>

<script>
/* eslint-disable */
export default {
  props: ["disabled"],
  data() {
    return {
      dataModel: {
        userId: "",
        loginName: "",
        nickName: "",
        password: "",
        email: "",
        phoneNumber: "",
        sex: "",
        age: "",
        avatarUrl: "",
        state: ""
      },
      typeList: [],
      rules: {
        // 更换规则
        loginName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            type: "string",
            max: 16,
            message: "用户名不能大于16",
            trigger: "blur"
          }
        ],
        nickName: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" },{type: 'email',message: "请输入正确的邮箱格式",trigger: "blur"}],
        sex: [{ required: true, message: "请选择性别" }],
        state: [{ required: true, message: "请选择状态" }],
        phoneNumber: [{pattern: /^1[3456789]\d{9}$/, message: '请输入有效电话号码'}]
      },
      defaultList: [],
      imgUrl: "",
      visible: false,
      uploadList: [],
      editAvatar: {}
    };
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    submit() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$emit("onSave", this.dataModel);
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    cancel() {
      this.$emit("onCancel");
    },
    initData(initData) {
      this.reSetForm();
      this.dataModel.userId = initData.userId;
      this.dataModel.loginName = initData.loginName;
      this.dataModel.nickName = initData.nickName;
      this.dataModel.phoneNumber = initData.phoneNumber;
      this.dataModel.email = initData.email;
      this.dataModel.age = initData.age;
      this.dataModel.sex = initData.sex;
      this.dataModel.state = initData.state;
      this.dataModel.avatarUrl = initData.avatarUrl;
      this.dataModel.password = initData.password;
      this.editAvatar.status = "finished";
      this.editAvatar.url = initData.avatarUrl;
    },
    reSetForm() {
      this.$refs.dataForm.resetFields();
      this.dataModel.userId = "";
      this.editAvatar = {};
    },
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
    handleRemove(index) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(index, 1);
    },
    handleSuccess(res, file) {
      file.url = res.data;
      file.name = res.data;
      this.dataModel.avatarUrl = res.data;
    },
    handleError() {
      this.$Message.error(`头像上传失败`);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      this.editAvatar = {};
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  margin-top: 30px;
  width: 500px;
}
.btn {
  width: 100px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>