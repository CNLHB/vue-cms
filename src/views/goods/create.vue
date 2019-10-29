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
      <FormItem label="购买时间" prop="payTime">
        <DatePicker
          type="datetime"
          @on-change="playTimeChange"
          placeholder="Select date and time"
          style="width: 200px"
        ></DatePicker>
      </FormItem>

      <FormItem label="物品数量" >
        <InputNumber :min="1" v-model="formValidate.count" prop="count"></InputNumber>
      </FormItem>
      <FormItem label="状态">
        <!-- <Input v-model="formValidate.status" placeholder="状态: 1可用 其他不可用" /> -->
        <Select v-model="formValidate.status" style="width:200px"  prop="status">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="价格" prop="price">
        <Input v-model="formValidate.price" placeholder="价格" />
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
      model1: "",
      cityList: [
        {
          value:1,
          label: "可用"
        },
         {
          value: 0,
          label: "不可用"
        }
      ],

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
        count: 1,
        status: 1,
        image: "",
        cateId: ""
      },
      ruleValidate: {
        assetName: [
          { required: true, message: "物品名称不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注信息不能为空", trigger: "blur" }
        ],
        brand: [
          { required: true, message: "规格型号关键字不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态关键字不能为空", trigger: "blur" }
        ],
        count: [{ required: false, message: "物品数量关键字不能为空" ,trigger: "blur"}],
        payTime: [
          { required: true, message: "购买时间关键字不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格关键字不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getCateList({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    ...mapActions({
      createArticle: "article/createArticle",
      getCategoryList: "category/getCategoryList"
    }),
    // 创建
    async _createCategory() {
      this.formValidate.id = this.id;
      this.formValidate.userId = 8;
      try {
        let d = await this.createArticle(this.formValidate);
        this.$Message.success("创建成功!");
        this.$router.push("/goods");
      } catch (e) {}
    },
    async getCateList(params) {
      const { data } = await this.getCategoryList(params);
      this.categoryList = data.data.list.map(item => {
        return {
          cateId: item.cid,
          IemNum: item.assets.length,
          cateName: item.cateName,
          parent_id: 0
        };
      });
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
    },
    playTimeChange(time) {
      this.formValidate.payTime = time;
    }
  }
};
</script>
