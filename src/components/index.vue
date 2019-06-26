<template>
  <div class="index">
    <router-view></router-view>
    <div style="height: 1rem;"></div>
    <van-tabbar route v-model="active" active-color="#00C957" inactive-color="#000">
      <van-tabbar-item name="home" icon="home-o" to="/home">发现</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item name="my" icon="user-o" @click="isJump">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "index",
  data() {
    return {
      active: 0
    };
  },
  methods: {},
  components: {
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem
  },
  mounted() {
    let path = this.$router.currentRoute.path;
    if (path == "/home") {
      this.active = 0;
    } else if (path == "/search") {
      this.active = 1;
    } else if (path == "/my") {
      this.active = 2;
    }
  },
  methods: {
    isJump() {
      let uid = this.$store.state.userId;
      if (uid) {
        this.$router.push({ path: "/my" });
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

