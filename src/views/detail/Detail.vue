<template>
  <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'


import {getDetail} from "network/detail"
import DetailSwiper from './childComps/DetailSwiper.vue'

export default {
    name: "Detail",
    data(){
        return {
            iid: null,
            topImages:[]
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
    },
    created(){
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(
            res => {
                console.log(res)
                //1.获取顶部的图片轮播数据
                this.topImages = res.result.itemInfo.topImages
            }
        )
    },
    methods:{

    }
}
</script>

<style scoped>

</style>