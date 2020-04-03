<template>
  <section>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
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
            >{{ item.cateName }}</Option
          >
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

      <FormItem label="物品数量">
        <InputNumber
          :min="1"
          v-model="formValidate.count"
          prop="count"
        ></InputNumber>
      </FormItem>
      <FormItem label="状态">
        <!-- <Input v-model="formValidate.status" placeholder="状态: 1可用 其他不可用" /> -->
        <Select v-model="formValidate.status" style="width:200px" prop="status">
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="价格" prop="price">
        <Input v-model="formValidate.price" placeholder="价格" number/>
      </FormItem>
      <FormItem label="图片上传">
        <div class="demo-upload-list" v-for="item in uploadList" :key="item">
          <template v-if="item.status === 'finished'">
            <img :src="currentImage + item.url" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="handleView(item.name)"
              ></Icon>
              <Icon
                type="ios-trash-outline"
                @click.native="handleRemove(item)"
              ></Icon>
            </div>
          </template>
          <template v-else>
            <Progress
              v-if="item.showProgress"
              :percent="item.percentage"
              hide-info
            ></Progress>
          </template>
        </div>
        <Upload
          ref="upload"
          multiple
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          type="drag"
          :action= "url"
          style="display: inline-block;width:58px;"
        >
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
          <img
            :src="imgName"
            v-if="visible"
            style="width: 100%"
          />
        </Modal>
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button
          type="primary"
          @click="handleSubmit('formValidate')"
          style="margin-left: 8px"
          >提交</Button
        >
      </FormItem>
    </Form>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import config from "../../config/config"
// let URL="http://47.101.196.193:8088"
//http://47.101.196.193:8088/users/total
 export default {
  data() {
    return {
      id: this.$route.params.id,
      url: config.URL + "/asset/batch/",
      detail: null,
      model1: "",
      currentImage: config.URL + "/asset/download/1?url=",
      defaultList: [
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      cityList: [
        {
          value: 1,
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
        count: [
          {
            required: false,
            message: "物品数量关键字不能为空",
            trigger: "blur"
          }
        ],
        payTime: [
          { required: true, message: "购买时间关键字不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格关键字不能为空且必须为数字", trigger: "blur" ,type: "number"}
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
    },
    handleView(name) {
       console.log(name)
      this.imgName =this.currentImage + name
      
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
       console.log(res)
      file.url = res.url;
      file.name = res.url;
      this.formValidate.image = ""
      this.uploadList.forEach((item, index)=>{
        if(this.formValidate.image.length == 0){
            this.formValidate.image =  item.url
            
        }else{
            this.formValidate.image =  this.formValidate.image + "&"+  item.url
        }
        
      })
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
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style>
    .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
