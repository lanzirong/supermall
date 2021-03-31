<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    class="tab-control"
                    v-show="isTabShow"
        ></tab-control>
    <scroll class="content" ref="scroll" 
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"
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

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
      saveY:0
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
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
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    
  },
  mounted(){

    

    //console.log(this.$refs.tabControl.$el.offsetTop)
    
  },
  methods:{
    /**
     * 事件监听
     */
    tabClick(index){//确定用户点击的控制栏选项,对currentType的值重新赋值
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position){//通过获取滚动条的位置信息来改变一些flag
      //1.判断backTop是否显示
      this.listenShowBackTop(position),

      //2.决定tabControl是否吸顶
      this.isTabShow = (-position.y) > this.tabOffsetTop

    },
    loadMore(){//上拉加载更多
      this.getHomeGoods(this.currentType)
      const refresh = debounce(this.$refs.scroll.refresh,500)
      refresh()
    },
    swiperImageLoad(){//获取控制栏相对上层控件的高度差
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      this.$refs.scroll.refresh()
    },

    /**
     * 网络请求
     */
    getHomeMultidata(){//请求获取首页基本信息(如:轮播图)
        getHomeMultidata().then(
        res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }
      )
    },
    getHomeGoods(type){//请求加载商品信息
      const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(
        res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        }
      )
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
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
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    /* height: calc(100% - 93px);
    overflow: hidden; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
</style>