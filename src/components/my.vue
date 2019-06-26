<template>
  <div>
    <div class="my-top">
      <img :src="myinfo.backgroundUrl" alt="背景图" class="bg">
    </div>
    <div class="h-r-icon" @click="jumpPlay">
      <img src="../../static/images/paihang.png" alt="图标">
    </div>
    <div class="user-circle">
      <img :src="myinfo.avatarUrl" alt="头像">
    </div>
    <div class="user-name">{{myinfo.nickname}}</div>
    <div class="user-follow">关注 {{myinfo.follows}} | 粉丝 {{myinfo.followeds}} | V{{level}}</div>
    <div class="mywhite">
      <ul>
        <li v-for="(item,index) in songs" :key="index">
          <router-link :to="{path:'/list',query:{id:item.id}}">
            <div class="flexbox">
              <div class="mw-left">
                <img :src="item.coverImgUrl" alt="图片">
              </div>
              <div class="mw-right">
                <p>{{item.name}}</p>
                <span>{{item.trackCount}}首，播放{{item.playCount}}次</span>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div style="height:1rem;"></div>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      myinfo: "",
      level: "",
      songs: []
    };
  },
  components: {},
  mounted() {
    let that = this;
    // 获取用户信息
    that
      .$axios({
        url:
          "http://120.78.128.49:3000/user/detail?uid=" +
          that.$store.state.userId
      })
      .then(res => {
        that.myinfo = res.data.profile;
        that.level = res.data.level;
      });
    // 获取用户歌单
    that
      .$axios({
        url:
          "http://120.78.128.49:3000/user/playlist?uid=" +
          that.$store.state.userId
      })
      .then(res => {
        that.songs = res.data.playlist;
      });
  },
  methods: {
    jumpPlay() {
      var id = localStorage.getItem("playid")
        ? localStorage.getItem("playid")
        : 1368725399;
      this.$router.push({ path: "/play", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.h-r-icon {
  width: 0.5rem;
  position: fixed;
  right: 0.4rem;
  top: 0.4rem;
  z-index: 99;
}

.h-r-icon image {
  width: 100%;
}
.my-top {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.my-top .bg {
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
.user-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  margin: 2rem auto 0.5rem;
  box-shadow: 0 0 0.1rem grey;
}
.user-circle img {
  width: 100%;
  height: 100%;
}
.user-name {
  text-align: center;
  color: white;
  font-size: 0.35rem;
  text-shadow: 0 0 0.1rem #000;
  letter-spacing: 0.05rem;
}
.user-follow {
  font-size: 0.28rem;
  color: white;
  text-align: center;
  margin-top: 0.2rem;
  text-shadow: 0 0 0.1rem #000;
  letter-spacing: 0.05rem;
}
.mywhite {
  width: 100%;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0.1rem grey;
  padding: 0.24rem;
  box-sizing: border-box;
  margin-top: 0.4rem;
}
.mywhite ul li .flexbox {
  padding: 0.24rem;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
}
.mw-left {
  width: 1rem;
  height: 1rem;
  border-radius: 0.1rem;
  overflow: hidden;
}
.mw-left img {
  width: 100%;
  height: 100%;
}
.mw-right {
  margin-left: 0.2rem;
}
.mw-right p {
  font-size: 0.3rem;
  margin-bottom: 0.05rem;
}
.mw-right span {
  font-size: 0.24rem;
  color: #999;
}
</style>
