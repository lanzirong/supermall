<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper'

export default {
  name: "Home",
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  components:{
    NavBar,
    HomeSwiper
  },
  created(){
    //1.请求多个数据
    getHomeMultidata().then(
      res => {
        this.banners = res.data.banner.list;
        console.log(this.banners)
        this.recommends = res.data.recommend.list;
      }
    )
  }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>