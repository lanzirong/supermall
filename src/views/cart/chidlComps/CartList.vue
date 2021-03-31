<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item
            v-for="(item,index) in cartList"
            :key="index"
            :product="item"
        ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'

import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'


export default {
    updated(){

    },
    components:{
        CartListItem,
        Scroll,
    },
    computed:{
        ...mapGetters({
            cartList: 'getCartList'
        })
    },
    methods:{

    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
    .cart-list{
        height: calc( 100% - 49px - 44px - 40px);
    }
    .content{
        overflow: hidden;

        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 89px;
    }
</style>