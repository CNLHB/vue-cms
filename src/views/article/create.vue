<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="物品名称" prop="name">
        <Input v-model="formValidate.name" placeholder="分类名称"></Input>
      </FormItem>
      <FormItem label="使用部门" prop="key">
        <Input v-model="formValidate.key" placeholder="使用部门"></Input>
      </FormItem>
      <FormItem label="物品分类" v-if="categoryList.length > 0">
        <Select v-model="formValidate.category_id">
          <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="使用人" prop="user">
        <Input v-model="formValidate.user" placeholder="使用人"></Input>
      </FormItem>
      <FormItem label="价格" prop="price">
        <Input v-model="formValidate.price" placeholder="价格"></Input>
      </FormItem>
      <FormItem label="规格型号" prop="model">
        <Input v-model="formValidate.model" placeholder="规格型号"></Input>
      </FormItem>
            <FormItem label="物品数量" prop="num">
        <Input v-model="formValidate.num" placeholder="规格型号"></Input>
      </FormItem>
      <FormItem label="状态" prop="status">
        <Input v-model="formValidate.status" placeholder="状态"></Input>
      </FormItem>
      <FormItem label="购买时间" prop="created_at">
        <Input v-model="formValidate.created_at" placeholder="购买时间"></Input>
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
import axios from 'axios'
export default {
  data() {
    return {
      id: this.$route.params.id,
      detail: null,
      categoryList: [
        {
          article_nums: 7,
          id: 1,
          key: "IT",
          name: "IT",
          parent_id: 0
        }
      ],
      formValidate: {
        name: "",
        key: "",
        user: "liaoxx",
        model: "联想",
        price: 6999,
        category_id: "4",
        department: "实验室",
        created_at: "2019-10-15",
        id: 42,
        nickName: "笔记本电脑",
        num: 3,
        status: "使用中"
      },
      ruleValidate: {
        name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        key: [
          { required: true, message: "分类关键字不能为空", trigger: "blur" }
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
        // axios.get('http://localhost:3000/json',{params:this.formValidate}).then(res=>{res.data})
        // axios.post('http://localhost:3000/string',this.formValidate).then(res=>{res.data})
      await this.createCategory(this.formValidate);
        this.$Message.success("创建成功!");
        this.$router.push("/goods");
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
