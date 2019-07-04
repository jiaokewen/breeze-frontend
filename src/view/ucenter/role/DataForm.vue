<template>
  <Form ref="dataForm" :model="dataModel" :rules="rules" :label-width="90">
        <FormItem label="角色名称:" prop="roleName">
          <Input
            v-model="dataModel.roleName"
            placeholder="请输入角色名称"
            style="width: 200px"
          ></Input>
        </FormItem>
        <FormItem label="角色编码:" prop="roleCode">
          <Input v-model="dataModel.roleCode" placeholder="请输入角色编码" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="描述:" prop="description">
          <Input v-model="dataModel.description" placeholder="请输入描述" style="width: 200px"></Input>
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
        roleId: "",
        roleName: "",
        roleCode: "",
        description: ""
      },
      typeList: [],
      rules: {
        // 更换规则
        roleName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            type: "string",
            max: 16,
            message: "角色名不能大于16",
            trigger: "blur"
          }
        ],
        roleCode: [{ required: true, message: "角色编码不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
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
      this.dataModel.roleId = initData.roleId;
      this.dataModel.roleName = initData.roleName;
      this.dataModel.roleCode = initData.roleCode;
      this.dataModel.description = initData.description;
    },
    reSetForm() {
      this.$refs.dataForm.resetFields();
      this.dataModel.roleId = "";
    },
  }
};
</script>
