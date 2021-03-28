<template>
  <div>
      <swiper class="detail-swiper">
          <swiper-item
            v-for="(item,index) in topImages" :key="index"
            class="swiper-item"
          >
              <img :src="item" alt="" @load="swiperLoad">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'
import {debounce} from 'common/utils'

export default {
    props:{
        topImages:{
            type: Array,
            default(){
                return []
            } 
        }
        
    },
    components:{
        Swiper,
        SwiperItem,
    },
    methods:{
        swiperLoad(){
            this.$emit('swiperHasLoad')
        }
    }
}
</script>

<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>