<template>
  <Form ref="dataForm" :model="dataModel" :rules="rules" :label-width="90">
        <FormItem label="资源名称:" prop="resourcesName">
          <Input
            v-model="dataModel.resourcesName"
            placeholder="请输入资源名称"
            style="width: 200px"
          ></Input>
        </FormItem>
        <FormItem label="资源编码:" prop="resourcesCode">
          <Input v-model="dataModel.resourcesCode" placeholder="请输入资源编码" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="父级:" prop="parentId">
          <Select v-model="dataModel.parentId" style="width:200px" filterable>
            <Option v-for="item in list" :value="item.resourcesId" :key="item.resourcesId">{{ item.resourcesName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="类型:" prop="type">
          <RadioGroup v-model="dataModel.type">
            <Radio :label="'menu'">菜单</Radio>
            <Radio :label="'btn'">按钮</Radio>
          </RadioGroup>
        </FormItem>
  </Form>
</template>

<script>
/* eslint-disable */
export default {
  props: ["disabled","list"],
  data() {
    return {
      dataModel: {
        resourcesId: "",
        resourcesName: "",
        parentId: "",
        resourcesCode: "",
        type: ''
      },
      typeList: [],
      rules: {
        // 更换规则
        resourcesName: [
          { required: true, message: "资源名不能为空", trigger: "blur" },
          {
            type: "string",
            max: 16,
            message: "角色名不能大于16",
            trigger: "blur"
          }
        ],
        resourcesCode: [{ required: true, message: "资源编码编码不能为空", trigger: "blur" }]
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
      this.reSetForm()
      this.dataModel.resourcesId = initData.resourcesId
      this.dataModel.resourcesName = initData.resourcesName
      this.dataModel.resourcesCode = initData.resourcesCode
      this.dataModel.type = initData.type
      this.dataModel.parentId = initData.parentId
    },
    reSetForm() {
      this.$refs.dataForm.resetFields();
      this.dataModel.resourcesId = "";
    },
  }
};
</script>
