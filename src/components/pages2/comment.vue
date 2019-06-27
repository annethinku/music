<template>
  <div>
    <my-head></my-head>
    <div class="comment-top flexbox">
      <div class="ct-left">
        <img :src="img" alt="图片">
      </div>
      <div class="ct-center">
        <h4>{{name1}}</h4>
        <p>{{name2}}</p>
      </div>
      <div class="ct-right">
        <van-icon name="arrow"/>
      </div>
    </div>
    <div class="common-title">热门评论</div>
    <div class="comment-list">
      <ul>
        <li v-for="(item,index) in hotComments" :key="index">
          <div class="cl-left">
            <img :src="item.user.avatarUrl" alt="头像">
          </div>
          <div class="cl-center">
            <h4>{{item.user.nickname}}</h4>
            <p>{{item.content}}</p>
            <span>{{item.time | filterTime}}</span>
          </div>
          <div class="cl-right">
            <img src="../../../static/images/zan.png" alt="图标">
            <p>{{item.likedCount}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-title">全部评论</div>
    <div class="comment-list">
      <ul>
        <li v-for="(item,index) in allComments" :key="index">
          <div class="cl-left">
            <img :src="item.user.avatarUrl" alt="头像">
          </div>
          <div class="cl-center">
            <h4>{{item.user.nickname}}</h4>
            <p>{{item.content}}</p>
            <span>{{item.time | filterTime}}</span>
          </div>
          <div class="cl-right">
            <img src="../../../static/images/zan.png" alt="图标">
            <p>{{item.likedCount}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import myhead from "../header/myhead";
import { Icon } from "vant";
export default {
  data() {
    return {
      detail: "",
      img: "",
      name1: "",
      name2: "",
      hotComments: "",
      allComments: ""
    };
  },
  components: {
    "my-head": myhead,
    "van-icon": Icon
  },
  filters: {
    filterTime(val) {
      return timestampToTime(val);
    }
  },
  mounted() {
    let that = this;
    //  获取音乐详情
    that
      .$axios({
        url: "http://120.78.128.49:3000/song/detail?ids=" + that.$route.query.id
      })
      .then(res => {
        that.detail = res.data.songs[0];
        that.img = res.data.songs[0].al.picUrl;
        that.name1 = res.data.songs[0].al.name;
        that.name2 = res.data.songs[0].ar[0].name;
      });
    // 获取歌曲评论
    that
      .$axios({
        url:
          "http://120.78.128.49:3000/comment/music?id=" + that.$route.query.id
      })
      .then(res => {
        that.hotComments = res.data.hotComments;
        that.allComments = res.data.comments;
      });
  }
};
/**
 * 处理时间[时间戳转化为时间格式]
 */
function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  // var m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ':';
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  // return Y + M + D + h + m + s;
  return Y + M + D;
}
</script>
<style scoped>
.comment-top {
  margin: 0.24rem;
  align-items: center;
}
.ct-left {
  width: 2rem;
  height: 2rem;
  border-radius: 0.1rem;
  overflow: hidden;
}
.ct-center {
  margin-left: 0.24rem;
}
.ct-center h4 {
  font-weight: normal;

  font-size: 0.3rem;
}
.ct-center p {
  font-size: 0.24rem;
  color: #00c957;
  margin-top: 0.2rem;
}
.ct-right {
  margin-left: auto;
  font-size: 0.3rem;
  font-weight: bold;
  color: #999;
}
.comment-list ul li {
  margin: 0.24rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px #e6e6e6 solid;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
}
.cl-left {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  overflow: hidden;
}
.cl-left img {
  width: 100%;
  height: 100%;
}
.cl-center {
  width: 70%;
  font-size: 0.28rem;
}
.cl-center p {
  margin: 0.2rem 0;
  font-size: 0.24rem;
}
.cl-center span {
  font-size: 0.24rem;
  color: #999;
}
.cl-right {
  font-size: 0.24rem;
  color: #999;
  text-align: center;
}
.cl-right img {
  width: 0.4rem;
  height: 0.4rem;
}
.common-title {
  font-weight: bold;
  font-size: 0.3rem;
  margin: 0.6rem 0.2rem 0.3rem;
  border-left: 0.1rem #00c957 solid;
  padding: 0.1rem 0 0.1rem 0.2rem;
  box-shadow: 0 0 0.1rem #e6e6e6;
  /* border-bottom: 1px #00c957 solid;
  border-right: 1px #00c957 solid;
  border-top: 1px #00c957 solid; */
}
</style>
