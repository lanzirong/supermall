<template>
  <div id="detail">
      <detail-nav-bar class="nav-bar"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages" @swiperHasLoad="swiperHasLoad"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop} from "network/detail"
import {debounce} from 'common/utils'


export default {
    name: "Detail",
    data(){
        return {
            iid: null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
    },
    created(){
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(
            res => {
                console.log(res)
                //1.获取顶部的图片轮播数据
                const data = res.result;
                this.topImages = data.itemInfo.topImages;
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                this.shop = new Shop(data.shopInfo)
                this.detailInfo = data.detailInfo
            }
        )
    },
    methods:{
        swiperHasLoad(){
            debounce(this.$refs.scroll.refresh(),500)
        },
        imageLoad(){
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
    #detail{
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