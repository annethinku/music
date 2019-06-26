<template>
  <div class="home">
    <my-head data-back="1"></my-head>
    <van-swipe @change="onChange" :autoplay="3000" :width="swWidth">
      <van-swipe-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="banner" style="width: 100%;">
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{banners.length}}</div>
    </van-swipe>
    <div class="navF flexbox">
      <div class="navbox">
        <router-link :to="{path:'/jingpin'}">
          <div class="green-bg flexbox">
            <van-icon name="music-o" size="2em"/>
          </div>
          <p>歌单</p>
        </router-link>
      </div>
      <div class="navbox" @click="dayTj">
        <div class="green-bg flexbox">
          <van-icon name="like-o" size="2em"/>
        </div>
        <p>每日推荐</p>
      </div>
      <div class="navbox">
        <router-link :to="{path:'/phb'}">
          <div class="green-bg flexbox">
            <van-icon name="bar-chart-o" size="2em"/>
          </div>
          <p>排行</p>
        </router-link>
      </div>
    </div>
    <div class="common-title">推荐歌单</div>
    <div class="c-list flexbox">
      <div v-for="(item,index) in tuijArr" :key="index" style="width:33%;">
        <div class="listbox" v-if="index<9">
          <router-link :to="{path:'/list',query:{id:item.id}}">
            <div class="list-top">
              <img :src="item.picUrl" alt="图片">
              <div class="lt-right">
                <van-icon name="service-o"/>
                <span>{{item.playCount | filterNum}}</span>
              </div>
            </div>
            <div class="list-bot">{{item.name}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="common-title">最新音乐</div>
    <div class="c-list flexbox">
      <div v-for="(item,index) in newSong" :key="index" style="width:33%;">
        <div class="listbox" v-if="index<6">
          <router-link :to="{path:'/play',query:{id:item.id}}">
            <div class="list-top">
              <img :src="item.song.album.picUrl" alt="图片">
            </div>
            <div class="list-bot diff">
              <p>{{item.name}}</p>
              <p>{{item.song.artists[0].name}}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon } from "vant";
import myhead from "./header/myhead";
export default {
  name: "home",
  data() {
    return {
      banners: [],
      current: 0,
      swWidth: 0,
      tuijArr: [],
      newSong: []
    };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-icon": Icon,
    "my-head": myhead
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
    let that = this;
    that.swWidth = document.body.clientWidth;
    // 获取banner数据
    that
      .$axios({
        url: "http://120.78.128.49:3000/banner"
      })
      .then(res => {
        that.banners = res.data.banners;
      });
    // 获取推荐歌单数据
    that
      .$axios({
        url: "http://120.78.128.49:3000/personalized"
      })
      .then(res => {
        that.tuijArr = res.data.result;
      });
    // 获取最新音乐数据
    that
      .$axios({
        url: "http://120.78.128.49:3000/personalized/newsong"
      })
      .then(res => {
        that.newSong = res.data.result;
      });
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    dayTj() {
      let uid = this.$store.state.userId;
      if (uid) {
        this.$router.push({ path: "/day" });
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

<style scoped>
.custom-indicator {
  padding: 0.05rem 0.2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.1rem;
  position: absolute;
  right: 0.1rem;
  bottom: 0.1rem;
  color: white;
  font-size: 0.24rem;
}

.navF {
  justify-content: center;
  margin: 0.4rem 0;
}

.navbox {
  width: 33%;
  text-align: center;
  font-size: 0.28rem;
  font-weight: bold;
}

.green-bg {
  width: 1rem;
  height: 1rem;
  margin: 0 auto 0.1rem;
  border-radius: 50%;
  background: #00c957;
  color: white;
  justify-content: center;
  align-items: center;
}
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
.list-bot.diff p {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
</style>
