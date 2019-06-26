<template>
  <div>
    <my-head login='1'></my-head>
    <div class="logo">
      <img src="../../../static/images/logo.png" alt="logo">
    </div>
    <div class="formGroup">
      <div class="form-li flexbox">
        <label for="username">用户名：</label>
        <input type="text" placeholder="请输入手机号/邮箱" id="username" v-model="username">
      </div>
      <div class="form-li flexbox">
        <label for="pwd">密码：</label>
        <input type="password" placeholder="请输入密码" id="pwd" v-model="password">
      </div>
      <div class="form-btn" @click="login">
        <button>登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import myhead from "../header/myhead";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    "my-head": myhead,
    Toast
  },
  mounted() {},
  methods: {
    login() {
      let that = this;
      const regP = /^1[3|4|5|8][0-9]\d{4,8}$/;
      const regE = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let urls = "";
      if (!that.username) {
        Toast.fail("请输入手机号或邮箱");
        return false;
      }
      if (!regP.test(that.username) && !regE.test(that.username)) {
        Toast.fail("手机号或邮箱格式不正确");
        return false;
      }
      if (!that.password) {
        Toast.fail("请输入密码");
        return false;
      }
      if (regP.test(that.username)) {
        urls =
          "http://120.78.128.49:3000/login/cellphone?phone=" +
          that.username +
          "&password=" +
          that.password;
      } else {
        urls =
          "http://120.78.128.49:3000/login?email=" +
          that.username +
          "&password=" +
          that.password;
      }
      that
        .$axios({
          url: urls
        })
        .then(res => {
          that.$store.dispatch("changeUser", res.data.profile.nickname);
          that.$store.dispatch("changeImg", res.data.profile.avatarUrl);
          that.$store.dispatch("changeUserid", res.data.profile.userId);
          Toast.success("登录成功");
          setTimeout(function() {
            that.$router.go(-1);
          }, 1000);
        })
        .catch(error => {
          if (!error.response.data.msg) {
            Toast.fail('账号或密码不正确');
          } else {
            Toast.fail(error.response.data.msg);
          }
        });
    }
  }
};
</script>
<style>
.logo {
  width: 2rem;
  height: 2rem;
  margin: 0.6rem auto;
}
.logo image {
  width: 100%;
  height: 100%;
}
.formGroup {
  width: 90%;
  margin: 0 auto;
}
.form-li {
  border-bottom: 1px #e6e6e6 solid;
  padding: 0.2rem 0;
  align-items: center;
}
.form-li label {
  width: 20%;
  display: block;
  text-align: right;
  font-size: 0.28rem;
}
.form-li input {
  width: 60%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.28rem;
  border: none;
  margin-left: 0.2rem;
}
.form-btn {
  width: 100%;
  margin-top: 0.8rem;
}
.form-btn button {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #00c957;
  color: white;
  font-size: 0.28rem;
  border-radius: 0.1rem;
}
</style>

