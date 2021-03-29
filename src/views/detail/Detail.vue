<template>
  <div id="detail">
      <detail-nav-bar class="nav-bar"
        @titleClick="titleClick"
      ></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages" @swiperHasLoad="swiperHasLoad"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :params-info="paramsInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'


export default {
    name: "Detail",
    data(){
        return {
            iid: null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramsInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTops:null
        }
    },
    mixins:[itemListenerMixin],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
    },
    created(){
        //1.获取iid
        this.iid = this.$route.params.iid
        
        //2.获取详情数据
        getDetail(this.iid).then(
            res => {
                // console.log(res)
                //1.去取出数据
                const data = res.result;
                //2.获取顶部的图片轮播数据
                this.topImages = data.itemInfo.topImages;
                
                //3.创建商品对象
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                
                //4.取出店铺信息
                this.shop = new Shop(data.shopInfo)
                
                //5.取出详情信息
                this.detailInfo = data.detailInfo
                
                //6.取出参数信息
                this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //7.取出评论信息    
                this.commentInfo = data.rate.list[0]

                //8.获取各个组题的offsetTop
                this.getThemeTops = debounce(() =>{
                    this.themeTopYs = []
                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
                    this.themeTopYs = this.themeTopYs.slice(-4)
                },100)
            },
            //3.获取推荐数据
            getRecommend().then( res => {
                // console.log(res.data.list)
                this.recommends = res.data.list
            } )
        )
    },
    mounted(){

    },
    updated(){
            
    },
    destroyed(){
        this.$bus.$off('itemImgListener',this.itemImgListener)
    },
    methods:{
        swiperHasLoad(){
            //newrefresh在mixin[itemListernerMixin]
            this.newrefresh()
        },
        imageLoad(){
            this.getThemeTops()
            this.newrefresh()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],500)
        }
    }
}
</script>

<style scoped>
    #detail{
        margin: 0;
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px)
    }
    .nav-bar{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>