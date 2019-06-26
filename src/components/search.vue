<template>
  <div>
    <div class="search-top flexbox">
      <input type="text" placeholder="请输入搜索内容" v-model="keyword" @keyup.enter="searchEnter">
      <button @click="cancelEnter">取消</button>
    </div>
    <div class="hot-search" v-if="searchR[0].content.length<=0">
      <h4>热门搜索</h4>
      <ul>
        <li v-for="(item,index) in hotlist" :key="index" @click="searchHot">{{item.first}}</li>
      </ul>
    </div>
    <div class="search-result" v-if="searchR[0].content.length>0">
      <van-tabs title-active-color="#00c957" :line-height="2" color="#00c957" @click="changeTitle">
        <van-tab v-for="(item,index) in searchR" :title="item.title" :key="index">
          <ul>
            <li v-for="(item2,index2) in item.content" :key="index2">
              <router-link :to="{path:'/play',query:{id:item2.id}}">
                <p>{{item2.name}}</p>
                <span>{{item2.artists[0].name}}-{{item2.album.name}}</span>
              </router-link>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Toast } from "vant";
export default {
  name: "search",
  data() {
    return {
      hotlist: [],
      keyword: "",
      searchR: [
        { title: "单曲", content: [] },
        { title: "视频", content: [] },
        { title: "歌手", content: [] },
        { title: "专辑", content: [] },
        { title: "歌单", content: [] },
        { title: "主播电台", content: [] }
      ]
    };
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    Toast
  },
  mounted() {
    let that = this;
    that
      .$axios({
        url: "http://120.78.128.49:3000/search/hot"
      })
      .then(res => {
        that.hotlist = res.data.result.hots;
      });
  },
  methods: {
    changeTitle(e) {
      if (e == 0) {
      } else {
        //  Toast('暂未开放');
      }
    },
    searchEnter() {
      this.$axios({
        url: "http://120.78.128.49:3000/search?keywords=" + this.keyword
      }).then(res => {
        this.searchR[0].content = res.data.result.songs;
      });
    },
    cancelEnter() {
      this.keyword = "";
      this.searchR[0].content = "";
    },
    searchHot(e) {
      this.keyword = e.toElement.innerHTML;
      this.searchEnter();
    }
  }
};
</script>

<style scoped>
.search-top {
  width: 100%;
  align-items: center;
  height: 1rem;
  background: #00c957;
  justify-content: center;
}
.search-top input {
  width: 80%;
  border: none;
  height: 60%;
  margin-right: 0.2rem;
  border-radius: 0.4rem;
  font-size: 0.28rem;
  padding-left: 0.3rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.5);
}
.search-top button {
  color: white;
  font-size: 0.28rem;
  background: transparent;
}
.hot-search {
  margin: 0.24rem;
}
.hot-search h4 {
  font-size: 0.3rem;
  margin-bottom: 0.2rem;
}
.hot-search ul {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.hot-search ul li {
  background: #eee;
  padding: 0.05rem 0.3rem 0.1rem;
  border-radius: 0.3rem;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  font-size: 0.24rem;
}
.search-result ul li {
  padding: 0.24rem;
  border-bottom: 1px #e6e6e6 solid;
}
.search-result ul li p {
  font-size: 0.28rem;
}
.search-result ul li span {
  font-size: 0.24rem;
  color: #999;
}
</style>
