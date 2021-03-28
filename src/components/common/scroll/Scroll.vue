<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
    props:{
        probeType:{
            type: Number,
            default: 0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll: null,
            option:{
                probeType: this.probeType,
                click: true,
                tap: true,
                pullUpLoad: this.pullUpLoad
            }
        }
    },
    mounted(){
        // setTimeout(() => {
            this.scroll = new BScroll(this.$refs.wrapper,this.option)

            this.scroll.on('scroll',(position) => {
            // 监听滚动的位置
            this.$emit('scroll',position)
            })
            if(this.pullUpLoad){
              this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
              }) 
            }
            this.scroll.refresh()
        // }, 500);
        
    },
    methods:{//返回顶部
        scrollTo(x, y, time=300){
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp(){//到达底部,上拉加载更多
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style>

</style>