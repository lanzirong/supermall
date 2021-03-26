<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index"
    :goodsItem="item"
    class="goods-item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
    props:{
        goods:{
            type: Array,
            default(){
                return []
            }
        }
    },
    components:{
        GoodsListItem,
    
    }
}
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
    }
    
</style>