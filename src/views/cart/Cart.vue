<template>
  <div class='cart'>
    <nav-bar class="nav-bar">
      <div slot='center'>购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
export default {
  components: { 
    NavBar,
  },
  computed:{
    // cartLength(){
    //   return this.$store.getters.getCartLength
    // }
    //两种直接引用vuex中getters中的值
    // ...mapGetters(['getCartLength','getCartList'])
    ...mapGetters({//mapGetters辅助函数,从vuex框架中导入
      length: 'getCartLength',
      list: 'getCartList'
    })
  }

}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    
  }
</style>