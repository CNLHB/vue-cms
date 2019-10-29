<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="物品名称" prop="assetName">
        <Input v-model="formValidate.assetName" placeholder="物品名称" />
      </FormItem>
      <FormItem label="规格型号" prop="brand">
        <Input v-model="formValidate.brand" placeholder="规格型号" />
      </FormItem>
      <FormItem label="备注信息" prop="remark">
        <Input v-model="formValidate.remark" placeholder="备注信息" />
      </FormItem>
      <FormItem label="物品分类" v-if="categoryList.length > 0">
        <Select v-model="formValidate.cateId">
          <Option
            v-for="(item, index) in categoryList"
            :value="item.cateId"
            :key="index"
          >{{item.cateName}}</Option>
        </Select>
      </FormItem>

      <FormItem label="价格" prop="price">
        <Input v-model="formValidate.price" placeholder="价格" />
      </FormItem>

      <FormItem label="物品数量" prop="count">
        <Input v-model="formValidate.count" placeholder="物品数量" />
      </FormItem>
      <FormItem label="状态" prop="status">
        <Input v-model="formValidate.status" placeholder="状态" />
      </FormItem>
      <FormItem label="购买时间" prop="payTime">
        <Input v-model="formValidate.payTime" placeholder="2019-10-08 19:16:02" />
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
      categoryList: [
        {
          cateId: "1",
          cateName: "IT",
          parent_id: 0
        }
      ],
      formValidate: {
        assetName: "",
        brand: "",
        remark: "",
        userId: "",
        price: "",
        payTime: "",
        count: "",
        status: "",
        image: "",
        cateId: ""
      },
      ruleValidate: {
        assetName: [
          { required: false, message: "物品名称不能为空", trigger: "blur" }
        ],
        remark: [
          { required: false, message: "备注信息不能为空", trigger: "blur" }
        ],
        brand: [
          { required: false, message: "规格型号关键字不能为空", trigger: "blur" }
        ],
        status: [
          { required: false, message: "状态关键字不能为空" }
        ],
        count: [
          { required: false, message: "物品数量关键字不能为空" }
        ],
        payTime: [
          { required: false, message: "购买时间关键字不能为空" }
        ],
        price: [
          { required: false, message: "价格关键字不能为空" }
        ]
      }
    };
  },
  async created() {
    let {
      data: { data }
    } = await this.getArticle({ id: this.$route.params.id });
    this.categoryList = [
      {
        cateId: data.category.cid,
        cateName: data.category.cateName,
        parent_id: 0
      }
    ];
    this.formValidate = {
      assetName: data.assetName,
      brand: data.brand,
      remark: data.remark,
      userId: data.userId,
      price: data.price,
      payTime: data.payTime,
      count: data.count,
      status: data.status,
      image: data.image,
      cateId: data.cateId,
      aid:data.aid
    };
  },
  methods: {
    ...mapActions({
      updateArticle: "article/updateArticle",
      getArticle: "article/getArticle"
    }),
    // 创建
    async _createCategory() {
      this.formValidate.id = this.id;
      try {
        await this.updateArticle(this.formValidate);
        this.$Message.success("更新成功!");
        this.$router.push("/category");
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
