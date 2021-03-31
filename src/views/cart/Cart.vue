<template>
  <div class='cart'>
    <nav-bar class="nav-bar">
      <div slot='center'>购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartBottomBar from './chidlComps/CartBottomBar.vue'

import CartList from './chidlComps/CartList.vue'

import { mapGetters } from 'vuex'


export default {
  updated(){
    
  },
  components: { 
    NavBar,
    CartList,
    CartBottomBar,
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
  },
  methods:{
    
  }

}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    
  }
</style>