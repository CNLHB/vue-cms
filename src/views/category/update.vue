<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="分类名称" prop="cateName">
        <Input v-model="formValidate.cateName" placeholder="分类名称"></Input>
      </FormItem>
      <!-- <FormItem label="分类描述" prop="key">
        <Input v-model="formValidate.key" placeholder="分类描述"></Input>
      </FormItem> -->
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        detail: null,
        formValidate: {
          cateName: '',
          key: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '分类名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      ...mapActions({
        getCategory: 'category/getCategory',
        updateCategory: 'category/updateCategory'
      }),
      async _getCategory() {
        try {
          const res = await this.getCategory({
            cid: this.id
          });
          const category = res.data.data;
          console.log(res.data)
          this.formValidate.cateName = category.cateName;
        //   this.formValidate.key = category.key;

        } catch (e) {

        }
      },
      // 更新
      async _updateCategory() {
        this.formValidate.id = this.id;
        console.log(this.formValidate)
        try {
          await this.updateCategory(this.formValidate);
          this.$Message.success('更新成功!');
          this.$router.push('/category');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._updateCategory();

          } else {
            this.$Message.error('请完成表单!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
