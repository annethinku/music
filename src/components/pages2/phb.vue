<template>
  <div>
    <my-head></my-head>
    <div class="common-title">音乐官方榜</div>
    <div class="phb-list">
      <ul>
        <li v-for="(item,index) in list" :key="index" v-if="index<4" @click="jumpList(item.idx)">
          <div class="plist-left">
            <img :src="item.coverImgUrl" alt="图片">
          </div>
          <div class="plist-right">
            <div v-for="(item2,index2) in item.tracks" :key="index2" class="dp">
              <span>{{item2.first}} -</span>
              <span>{{item2.second}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-title">音乐全球榜</div>
    <div class="c-list flexbox">
      <div v-for="(item,index) in list" :key="index" style="width:33%;" v-if="index>3">
        <div class="listbox">
          <!-- <router-link :to="{path:'',query:{id:item.idx}}"> -->
          <div class="list-top">
            <img :src="item.coverImgUrl" alt="图片">
          </div>
          <div class="list-bot diff">
            <p>{{item.name}}</p>
          </div>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myhead from "../header/myhead";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
 
  },
  components: {
    "my-head": myhead
  },
  mounted() {
    let that = this;
    // 获取排行榜数据
    that
      .$axios({
        url: "http://120.78.128.49:3000/toplist/detail"
      })
      .then(res => {
        let arr = [3, 0, 2, 1];
        res.data.list.map((item, index) => {
          item.idx = arr[index];
        });
        that.list = res.data.list;
      });
  },
  methods: {
    jumpList(idx) {
      this.$router.push({ path: "/list", query: { idx: idx } });
    }
  }
};
</script>
<style>
.phb-list ul li {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  margin: 0.24rem;
}
.plist-left {
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
  overflow: hidden;
  margin-right: 0.2rem;
}
.plist-left img {
  width: 100%;
  height: 100%;
}
.plist-right{
  width: 70%;
}
.plist-right .dp {
  font-size: 0.24rem;
  margin-bottom: 0.1rem;
  color: #333;
}
.common-title {
  font-size: 0.28rem;
  font-weight: bold;
  border-left: 0.1rem #00c957 solid;
  padding: 0 0 0 0.1rem;
  margin: 0.2rem;
}
.c-list {
  margin: 0.24rem 0;
  justify-content: space-between;
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
  border-radius: 0.2rem;
  overflow: hidden;
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
