<template>
  <div class="head-1">
    <div class="leftJ" @click="back" v-show="isShow">
      <van-icon name="arrow-left"/>
    </div>
    <span>COOL MUSIC</span>
    <div class="h-r-icon" @click="jumpPlay">
      <img src="../../../static/images/paihang.png" alt="图标">
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: ["dataBack", "login"],
  data() {
    return {
      isShow: false
    };
  },
  components: {
    "van-icon": Icon
  },
  methods: {
    back() {
      if (this.login) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    },
    jumpPlay(){
      var id=localStorage.getItem("playid")?localStorage.getItem("playid"):1368725399;
      this.$router.push({path:'/play',query:{id:id}});
    }
  },
  mounted() {
    let that = this;
    // 是否显示返回箭头
    if (that.dataBack == 1) {
      that.isShow = false;
    } else {
      that.isShow = true;
    }
  }
};
</script>

<style scoped>
.head-1 {
  background: #00c957;
  height: 0.8rem;
  line-height: 0.8rem;
  color: white;
  font-size: 0.3rem;
  letter-spacing: 0.05rem;
  font-weight: bold;
  text-align: center;
  position: relative;
}

.h-r-icon {
  width: 0.5rem;
  position: absolute;
  right: 0.1rem;
  top: 0;
}

.h-r-icon image {
  width: 100%;
}
.leftJ {
  position: absolute;
  left: 2%;
  top: 2px;
  font-size: 0.4rem;
}
</style>
