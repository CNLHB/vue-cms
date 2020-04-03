<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="email">
              <i-input v-model="form.email" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button :loading="buttonLoading" @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
             <FormItem>
              <Button :loading="buttonLoading" @click="handleRegister" type="primary" long>注册</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
  
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        buttonLoading: false,
        // 表单内容，email && 密码
        form: {
          email: '',
          password: ''
        },

        // 表单验证，email && 密码
        rules: {
          email: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        }
      };
    },
    created() {
      this.$Loading.finish();
    },
    methods: {
      ...mapActions({
        login: 'admin/login',
        register: 'admin/register'
      }),

      // 提交登录
      handleSubmit() {
        this.buttonLoading = true;
        // 表单验证
        var formLabel = this.$refs.loginForm;
        formLabel.validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            this.buttonLoading = false;
            return false
          }
          console.log('start')

          this.login(this.form).then(ret => {
            console.log('done')
            this.$ls.set('token', "user");
            // 跳转
            this.$Message.success("登录成功！");
                this.$router.push(`/`);
            // window.location.href = '/'

          }).catch(err => {
            console.log('err')
            //删除
            this.$ls.set('token', "suc");
            // 跳转
            this.$Message.error("登录失败！");
            // this.$router.push(`/`);
            // window.location.href = '/'
            //删除
            this.buttonLoading = false

          })
        })
      },
      handleRegister(){
           this.buttonLoading = true;
        // 表单验证
        var formLabel = this.$refs.loginForm;
        formLabel.validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            this.buttonLoading = false;
            return false
          }
          console.log('start')

          this.register(this.form).then(ret => {
            // 跳转
            if(ret.data.status == 0){
                this.$Message.success("用户名为空或已存在！");
                this.form.email = null
                this.form.password = null

            }else{
                this.$Message.success("注册成功！");
            }
            this.buttonLoading = false

          }).catch(err => {
            console.log('err')
            //删除
            // 跳转
            this.$Message.error("注册失败！");
            // this.$router.push(`/`);
            // window.location.href = '/'
            //删除
            this.buttonLoading = false

          })
        })
      }
    }
  };
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }

  .login {
    width: 100%;
    height: 100%;
    background-image: url('../assets/login_bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

  }

  .login-con {
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }

  .login-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
  }

  .form-con {
    padding: 10px 0 0;
  }

  .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
</style>

