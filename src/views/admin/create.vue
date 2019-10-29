<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="管理员邮箱" prop="email">
        <Input v-model="formValidate.email" placeholder="管理员邮箱"></Input>
      </FormItem>
      <FormItem label="管理员密码" prop="passWord">
        <Input v-model="formValidate.passWord" placeholder="管理员密码"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="passWord1">
        <Input v-model="formValidate.key" placeholder="确认密码"></Input>
      </FormItem>
      <FormItem label="管理员昵称" prop="nickName">
        <Input v-model="formValidate.nickName" placeholder="管理员昵称"></Input>
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      detail: null,
      formValidate: {
        email: "",
        passWord: "",
        nickName:""

      },
      ruleValidate: {
        email: [
          { required: true, message: "管理员邮箱不能为空", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "管理员密码不能为空", trigger: "blur" }
        ],
        passWord1:[
          { required: true, message: "管理员密码不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "管理员昵称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    ...mapActions({
      createCategory: "category/createCategory"
    }),
    // 创建
    async _createCategory() {
      this.formValidate.id = this.id;

      try {
        console.log(this.formValidate);
        await this.createCategory(this.formValidate);
        this.$Message.success("创建成功!");
        this.$router.push("/admin");
      } catch (e) {}
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this._createCategory();
        } else {
          this.$Message.error("请完成表单!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
