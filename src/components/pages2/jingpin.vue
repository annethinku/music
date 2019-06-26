<template>
  <div>
    <my-head></my-head>
    <div class="common-title" style="margin-top:0.4rem;">精品歌单</div>
    <div class="c-list flexbox">
      <div v-for="(item,index) in jingpin" :key="index" style="width:33%;">
        <div class="listbox">
          <router-link :to="{path:'/list',query:{id:item.id}}">
            <div class="list-top">
              <img :src="item.coverImgUrl" alt="图片">
              <div class="lt-right">
                <van-icon name="service-o"/>
                <span>{{item.playCount | filterNum}}</span>
              </div>
            </div>
            <div class="list-bot">{{item.copywriter}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
import myhead from "../header/myhead";
export default {
  data() {
    return {
      jingpin: []
    };
  },
  components: {
    "my-head": myhead,
    "van-icon": Icon
  },
  filters: {
    filterNum(val) {
      if (val > 100000) {
        return Math.round(val / 10000) + "万";
      } else {
        return Math.round(val);
      }
    }
  },
  mounted() {
    // 获取精品歌单数据
    this.$axios({
      url:
        "http://120.78.128.49:3000/top/playlist/highquality?before=1503639064232&limit=30"
    }).then(res => {
      this.jingpin = res.data.playlists;
    });
  }
};
</script>
<style>
.common-title {
  font-size: 0.28rem;
  font-weight: bold;
  border-left: 0.1rem #00c957 solid;
  padding: 0 0 0 0.1rem;
  margin: 0 0.2rem;
}
.c-list {
  margin: 0.24rem 0;
  justify-content: center;
  flex-wrap: wrap;
}
.listbox {
  width: 100%;
  text-align: center;
  margin: 0 0 0.2rem;
}
.list-top {
  width: 2.2rem;
  height: 2.2rem;
  margin: 0 auto 0.1rem;
  border: 1px #e6e6e6 solid;
  position: relative;
}
.list-top > img {
  width: 100%;
  height: 100%;
}
.lt-right {
  font-size: 0.2rem;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.05rem 0.1rem;
  border-radius: 0.2rem;
  position: absolute;
  right: 0;
  top: 0;
}
.list-bot {
  text-align: left;
  font-size: 0.24rem;
}
</style>

