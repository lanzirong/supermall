<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" 
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>


import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'


export default {
  name: "Home",
  data(){
    return {
      banners:[],
      recommends:[],
      goods: {
        'pop': { page:0 ,list: [] },
        'new': { page:0 ,list: [] },
        'sell': { page:0 ,list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    /**
     * 事件监听
     */
    tabClick(index){
      switch (index){
        case 0: 
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,700)
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y) >300
    },
    loadMore(){
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.refresh()
    },


    /**
     * 网络请求
     */
    getHomeMultidata(){
        getHomeMultidata().then(
        res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }
      )
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(
        res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        }
      )
    }
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;/* vh(0~100)->viewport height视口 */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 43px;
    z-index: 9;
    box-shadow: 0 3px 3px rgba(100,100,100,.1) ;
  }
  .content{
    margin-top: 44px;
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>