<template>
  <div class="list">
    <my-head></my-head>
    <div class="list-top1">
      <img :src="playlist.coverImgUrl" alt="背景图" class="bg">
      <div class="o-contrls flexbox">
        <div class="ocbox">
          <van-icon name="chat-o" size="2em"/>
          <p>{{playlist.commentCount}}</p>
        </div>
        <div class="ocbox">
          <van-icon name="share" size="2em"/>
          <p>{{playlist.shareCount}}</p>
        </div>
      </div>
    </div>
    <div class="list-bot">
      <div class="list-pall">
        <van-icon name="play-circle-o"/>
        <b>
          播放全部
          <span>(共{{len}}首)</span>
        </b>
      </div>
      <div class="list-detail">
        <ul>
          <li
            v-for="(item,index) in playlist.tracks"
            :key="index"
            @click="jumpPlay(this,item.id)"
            :data-id="item.id"
          >
            <div class="ld-left">{{index+1 | buling}}</div>
            <div class="ld-right">
              <p>{{item.name}}</p>
              <span>{{item.ar[0].name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import myhead from "../header/myhead";
import { Icon } from "vant";
export default {
  name: "list",
  data() {
    return {
      playlist: [],
      len: 0
    };
  },
  components: {
    "my-head": myhead,
    "van-icon": Icon
  },
  filters: {
    buling(val) {
      if (val < 10) {
        return "0" + val;
      } else {
        return val;
      }
    }
  },
  methods: {
    jumpPlay: function(e, id) {
      this.$router.push({ path: "/play", query: { id: id } });
    }
  },
  mounted() {
    let that = this;
    if (that.$route.query.id) {
      // 获取歌单列表数据
      that
        .$axios({
          url:
            "http://120.78.128.49:3000/playlist/detail?id=" +
            that.$route.query.id
        })
        .then(res => {
          let arr = [];
          that.playlist = res.data.playlist;
          that.len = res.data.playlist.tracks.length;
          res.data.playlist.tracks.map((item, index) => {
            arr.push(item.id);
          });
          sessionStorage.setItem("listid", that.$route.query.id);
          sessionStorage.setItem("idArr", JSON.stringify(arr));
        });
    } else {
        // 获取榜单列表数据
      that
        .$axios({
          url:
            "http://120.78.128.49:3000/top/list?idx=" +
            that.$route.query.idx
        })
        .then(res => {
          let arr = [];
          that.playlist = res.data.playlist;
          that.len = res.data.playlist.tracks.length;
          res.data.playlist.tracks.map((item, index) => {
            arr.push(item.id);
          });
          sessionStorage.setItem("listid", that.$route.query.idx);
          sessionStorage.setItem("idArr", JSON.stringify(arr));
        });
    }
  }
};
</script>

<style scoped>
.list-top1 {
  width: 100%;
  position: relative;
}
.list-top1 .bg {
  width: 100%;
}
.list-bot {
  width: 96%;
  margin: -0.8rem auto 0;
  background: white;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  position: relative;
  z-index: 22;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
}
.list-pall {
  padding: 0.24rem;
  border-bottom: 1px #e6e6ee solid;
  font-size: 0.28rem;
}
.list-pall i {
  position: relative;
  top: 2px;
}
.list-pall span {
  color: #999;
  font-weight: normal;
  font-size: 0.26rem;
}
.list-detail {
  margin: 0.24rem;
}
.list-detail ul li {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px #e6e6ee solid;
  padding: 0.1rem 0;
}
.list-detail ul li:last-child {
  border-bottom: none;
}
.list-detail ul li:nth-child(1) .ld-left,
.list-detail ul li:nth-child(2) .ld-left,
.list-detail ul li:nth-child(3) .ld-left {
  color: #00c957;
}
.ld-left {
  width: 20%;
  text-align: center;
  font-size: 0.28rem;
}
.ld-right {
  width: 78%;
}
.ld-right p {
  font-size: 0.28rem;
  margin-bottom: 0.05rem;
}
.ld-right span {
  font-size: 0.24rem;
  color: #999;
}
.o-contrls {
  width: 100%;
  height: 2rem;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  justify-content: space-around;
}
</style>
