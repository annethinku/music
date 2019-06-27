<template>
  <div>
    <div class="playBG">
      <img :src="picUrl" alt="背景图" class="bg">
      <!-- <div class="greenbg"></div> -->
      <div class="play-head">
        <van-icon name="arrow-left" class="arrowL" size="2em" @click="$router.back(-1)"/>
        <p>{{name1}}</p>
        <span>{{name2}}</span>
      </div>
      <audio
        :src="url"
        id="audio"
        @canplay="getDuration"
        @timeupdate="updateTime"
        ref="audio"
        :loop="way=='way02'?true:false"
      ></audio>
      <!-- 圆形图片 -->
      <div
        :class="'play-center flexbox ' + pcAnima"
        v-if="songCi.length<=0"
        @click="showSongci"
        :style="'z-index:'+zindex"
      >
        <div class="play-center2 flexbox">
          <div class="play-in">
            <img :src="picUrl" alt="图">
          </div>
        </div>
      </div>
      <!-- 歌词 -->
      <div
        class="songCi"
        v-show="songCi"
        :style="'z-index:'+zindex02"
        @click="showCircle"
        ref="songbox"
      >
        <ul>
          <li
            v-for="(item,index) in songCi"
            :key="index"
            :class="currentTime<(songCi[index+1]?songCi[index+1].time:0) && currentTime>=item.time 
            || currentTime>=songCi[songCi.length-1].time && songCi[songCi.length-1].time==item.time?'d_jump on':'d_jump'"
          >{{item.ci}}</li>
        </ul>
      </div>
      <div class="controls flexbox">
        <van-icon name="like-o" size="1.5em" class="icon"/>
        <van-icon name="share" size="1.5em" class="icon"/>
        <van-icon name="chat-o" size="1.5em" info="1w+" class="icon" @click="jumpComment"/>
        <van-icon name="more-o" size="1.5em"/>
      </div>
      <div class="progress flexbox">
        <div class="p-left">{{currentTime}}</div>
        <div class="p-center" ref="progress">
          <div class="pc-in" ref="drag" :style="'width:'+proWidth+'%;'"></div>
          <div
            class="p-move"
            :style="'left:'+proWidth+'%'"
            @touchstart.prevent="touchStart"
            @touchmove.prevent="touchMove"
            @touchend.prevent="touchEnd"
          >
            <span></span>
          </div>
        </div>
        <div class="p-right">{{duration}}</div>
      </div>
      <div class="controls flexbox" style="bottom:3%;">
        <van-icon class-prefix="my-icon" :name="way" size="1.5em" class="icon" @click="changeIcon"/>
        <van-icon class-prefix="my-icon" name="prev" size="1.5em" class="icon" @click="prevAudio"/>
        <van-icon :name="pClass" size="3em" class="icon" @click="playAudio"/>
        <van-icon class-prefix="my-icon" name="next" size="1.5em" class="icon" @click="nextAudio"/>
        <van-icon name="bars" size="1.5em" class="icon" @click="getList"/>
      </div>
      <!-- 歌单列表遮罩层 -->
      <div class="listMask" v-show="playlist.tracks" @click="closeList"></div>
      <div class="list-botp" v-show="playlist.tracks">
        <div class="list-detail">
          <ul>
            <li
              v-for="(item,index) in playlist.tracks"
              :key="index"
              @click="jumpPlay(this,item.id)"
              :data-id="item.id"
              :class="item.id==id?'on':''"
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
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  data() {
    return {
      url: "",
      detail: [],
      songs: [],
      picUrl: "",
      name1: "",
      name2: "",
      pClass: "play-circle-o",
      pcAnima: "",
      duration: "00:00",
      currentTime: "00:00",
      proWidth: 0,
      move: false,
      privileges: 0,
      id: 0,
      way: "way",
      playlist: "",
      songCi: [],
      zindex: 13,
      zindex02: 11
    };
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
  components: {
    "van-icon": Icon
  },
  mounted() {
    let that = this;
    let id = that.$route.query.id;
    that.id = id;
    localStorage.setItem("playid",id);
    that.getAudioDetail();
  },
  methods: {
    // 获取歌曲详情
    getAudioDetail() {
      let that = this;
      //  获取音乐url
      that
        .$axios({
          url: "http://120.78.128.49:3000/song/url?id=" + that.id
        })
        .then(res => {
          that.url = res.data.data[0].url;
        });
      //  获取音乐详情
      that
        .$axios({
          url: "http://120.78.128.49:3000/song/detail?ids=" + that.id
        })
        .then(res => {
          that.detail = res.data.songs[0];
          that.picUrl = res.data.songs[0].al.picUrl;
          that.name1 = res.data.songs[0].al.name;
          that.name2 = res.data.songs[0].ar[0].name;
        });
    },
    // 上一首
    prevAudio() {
      let that = this;
      let arr = JSON.parse(sessionStorage.getItem("idArr"));
      Array.prototype.indexVf = function(arr2) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == arr2) {
            return i;
          }
        }
      };
      if (that.way == "way") {
        //循环列表播放
        if (arr[arr.indexVf(that.id) - 1]) {
          that.id = arr[arr.indexVf(that.id) - 1];
        } else {
          that.id = arr[arr.length - 1];
        }
      } else if (that.way == "way02") {
        //单曲循环播放
        that.id = arr[arr.indexVf(that.id)];
      } else if (that.way == "way03") {
        //随机播放
        that.id = arr[Math.floor(Math.random() * arr.length)];
      }
      that.getAudioDetail();
    },
    // 下一首
    nextAudio() {
      let that = this;
      let arr = JSON.parse(sessionStorage.getItem("idArr"));
      Array.prototype.indexVf = function(arr2) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == arr2) {
            return i;
          }
        }
      };
      // 清空上一首歌曲数据
      that.currentTime = "00:00";
      that.$refs.audio.currentTime = 0;
      that.playAudio();
      that.showCircle();
      if (that.way == "way") {
        //循环列表播放
        if (arr[arr.indexVf(that.id) + 1]) {
          that.id = arr[arr.indexVf(that.id) + 1];
        } else {
          that.id = arr[0];
        }
      } else if (that.way == "way02") {
        //单曲循环播放
        that.id = arr[arr.indexVf(that.id)];
      } else if (that.way == "way03") {
        //随机播放
        that.id = arr[Math.floor(Math.random() * arr.length)];
      }
      that.getAudioDetail();
    },
    // 播放暂停音频
    playAudio() {
      let audio = document.getElementById("audio");
      if (audio.paused) {
        audio.play();
        this.pClass = "pause-circle-o";
        this.pcAnima = "pcAnima";
      } else {
        audio.pause();
        this.pClass = "play-circle-o";
        this.pcAnima = "";
      }
    },
    // 获取音频总时间
    getDuration() {
      this.duration = this.zhSecond(this.$refs.audio.duration);
    },
    // 获取音频当前时间 实时监听
    updateTime(e) {
      let that = this;
      that.currentTime = e.target.currentTime
        ? that.zhSecond(e.target.currentTime)
        : "00:00"; //获取audio当前播放时间
      that.proWidth =
        (Math.floor(e.target.currentTime) /
          Math.floor(that.$refs.audio.duration)) *
        100;
      if (
        that.way != "way02" &&
        Math.floor(e.target.currentTime) ==
          Math.floor(that.$refs.audio.duration)
      ) {
        setTimeout(function(){that.nextAudio();},2000);
      }
      let arrs = that.songCi;
      if (arrs) {
        setTimeout(function() {
          for (var ab = 0; ab < arrs.length; ab++) {
            if (that.currentTime == arrs[ab].time) {
              that.jump(ab);
            }
          }
        }, 3000);
      }
    },
    // 转化音频时间格式 mm:ss
    zhSecond(s) {
      if (s <= 60) {
        return (
          "00:" + (Math.floor(s) < 10 ? "0" + Math.floor(s) : Math.floor(s))
        );
      } else {
        let m = Math.floor(s / 60);
        let ss = Math.floor(s % 60);
        return (m < 10 ? "0" + m : m) + ":" + (ss < 10 ? "0" + ss : ss);
      }
    },
    touchStart() {
      this.move = true; //触摸开始
    },
    touchEnd() {
      this.move = false; //触摸结束
    },
    touchMove(e) {
      const pageX = e.touches[0].pageX; //触摸点距离屏幕左边的距离
      const progressLeft = this.$refs.progress.getBoundingClientRect().left; //进度条距离屏幕左边的距离
      this.proWidth =
        ((pageX - progressLeft) / this.$refs.progress.clientWidth) * 100; //移动滑块距离进度条最左边的百分比
      if (this.proWidth <= 0) {
        this.proWidth = 0;
        0;
      } else if (this.proWidth >= 100) {
        this.proWidth = 100;
      }
      this.$refs.audio.currentTime =
        ((pageX - progressLeft) * Math.floor(this.$refs.audio.duration)) /
        this.$refs.progress.clientWidth;
      this.currentTime = this.zhSecond(this.$refs.audio.currentTime);
    },
    // 切换播放模式
    changeIcon() {
      let that = this;
      if (that.way == "way") {
        that.way = "way02";
      } else if (that.way == "way02") {
        that.way = "way03";
      } else if (that.way == "way03") {
        that.way = "way";
      }
    },
    // 获取歌单列表
    getList() {
      let that = this;
      let id = sessionStorage.getItem("listid");
      that
        .$axios({
          url: "http://120.78.128.49:3000/playlist/detail?id=" + id
        })
        .then(res => {
          that.playlist = res.data.playlist;
        });
    },
    // 关闭列表
    closeList() {
      this.playlist.tracks = "";
      this.playlist = "";
    },
    // 点击列表中歌曲
    jumpPlay(e, id) {
      this.id = id;
      this.getAudioDetail();
      this.closeList();
    },
    // 获取歌词
    getSongci() {
      let that = this;
      that
        .$axios({
          url: "http://120.78.128.49:3000/lyric?id=" + that.id
        })
        .then(res => {
          let songs = res.data.lrc.lyric;
          let arrs = [];
          let cis = songs.split("\n");
          for (var i = 0; i < cis.length; i++) {
            if (cis[i].split("]")[0].split("[")[1]) {
              arrs.push({
                time: cis[i]
                  .split("]")[0]
                  .split("[")[1]
                  .split(".")[0],
                ci: cis[i].split("]")[1]
              });
            }
          }
          that.songCi = arrs;
        });
    },
    // 滚动
    jump(index) {
      let that = this;
      // 用 class="d_jump" 添加锚点
      let jump = document.querySelectorAll(".d_jump");
      let total = jump[index].offsetTop;
      let distance = that.$refs.songbox.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          that.$refs.songbox.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          that.$refs.songbox.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          that.$refs.songbox.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          that.$refs.songbox.scrollTop = total;
        }
      }
    },
    // 显示歌词
    showSongci() {
      let that = this;
      that.zindex = 11;
      that.zindex02 = 13;
      that.getSongci();
    },
    // 显示圆形图片
    showCircle() {
      this.zindex = 13;
      this.zindex02 = 11;
      this.songCi = [];
    },
    // 跳转到评论页面
    jumpComment(){
      let that=this;
       that.$router.push({
         path:"/comment",
         query:{id:that.id}
       })
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "my-icon";
  src: url("./iconfont.ttf") format("truetype");
}
.my-icon {
  font-family: "my-icon";
}
.my-icon-way::before {
  content: "\e66c";
}
.my-icon-way02::before {
  content: "\e66d";
}
.my-icon-way03::before {
  content: "\e622";
}
.my-icon-prev::before {
  content: "\e6e1";
}
.my-icon-next::before {
  content: "\e718";
}
.playBG {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.playBG .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-filter: blur(10px); /* Chrome, Opera */
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
}
.greenbg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #00c957;
  opacity: 0.2;
}
.play-head {
  width: 100%;
  text-align: center;
  border-bottom: 1px rgba(255, 255, 255, 0.4) solid;
  padding: 0.2rem;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
}
.play-head p {
  font-size: 0.3rem;
}
.play-head span {
  font-size: 0.24rem;
}
.arrowL {
  color: white;
  position: absolute;
  left: 0.2rem;
  top: 0.3rem;
}
.songCi {
  width: 6rem;
  height: 6.5rem;
  position: fixed;
  top: 15%;
  left: 50%;
  margin-left: -3rem;
  z-index: 11;
  overflow: auto;
  font-size: 0.28rem;
  color: white;
  text-align: center;
}
.songCi ul li {
  margin-bottom: 0.1rem;
}
.songCi ul li.on {
  color: #00c957;
  font-weight: bold;
}
.play-center {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 20%;
  left: 50%;
  margin-left: -3rem;
  z-index: 11;
  justify-content: center;
  align-items: center;
}
.pcAnima {
  animation: mymove 10s linear 0s infinite;
}
@keyframes mymove {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.play-center2 {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
}
.play-in {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
}
.play-in img {
  width: 100%;
  height: 100%;
}
.controls {
  width: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  position: fixed;
  bottom: 18%;
  z-index: 11;
}
.controls .icon {
  margin-right: 1rem;
  font-style: normal;
}
.controls .icon:last-child {
  margin-right: 0;
}
.progress {
  width: 100%;
  font-size: 0.24rem;
  color: white;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10%;
  z-index: 11;
  margin: 0.2rem 0;
}
.p-center {
  width: 70%;
  height: 2px;
  background: white;
  margin: 0 0.2rem;
  position: relative;
}
.pc-in {
  /* width: 20%; */
  height: 100%;
  position: absolute;
  background: red;
  top: 0;
  left: 0;
  /* transition: all 0.3s ease-in; */
}
.p-move {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: -0.08rem;
  /* transition: all 1s ease-in; */
}
.p-move span {
  width: 0.05rem;
  height: 0.05rem;
  display: block;
  border-radius: 50%;
  background: red;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.listMask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 12;
}
.list-botp {
  width: 100%;
  height: 50%;
  overflow: auto;
  background: white;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 13;
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
.list-detail ul li.on {
  background: rgba(0, 201, 87, 0.1);
  color: #004f00;
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
</style>

