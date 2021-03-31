<template>
  <div class="bottom-bar">
    <div class="check-content">
        <check-button
            :isChecked="isSelectAll"
            class="check-btn"
            @click.native="cancelSelectAll"
        ></check-button>
        <span>全选</span>
    </div>
    <div class="total-price">
        合计: ￥{{totalPrice.toFixed(2)}}
    </div>
    <div class="calculate">
        去结算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
      CheckButton,
    },
  computed:{
      ...mapGetters({
          totalPrice: 'getCartTotalPrice',
          cartLength: 'getCartLength'
      }),
      checkLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
          if(this.cartLength === 0) return false;
          return this.$store.state.cartList.filter( item => item.checked ).length === this.cartLength
      }
  },
  methods:{
      cancelSelectAll(){
          this.$store.dispatch('cancelAll',{
              isSelectAll: this.isSelectAll
          })
      }
  }

}
</script>

<style scoped>
    .bottom-bar{
        position: relative;
        height: 40px;
        left: 0;
        right: 0;
        background-color: #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .check-content{
        display: flex;
        justify-content: flex-start;
        width: 33%;
    }
    .check-content .check-btn{
        width: 20px;
        height: 20px;
        margin: 0 10px 0;
    }
    .total-price{
        text-align: center;
        width: 33%
    }
    .calculate{
        line-height: 40px;
        height: 100%;
        width: 34%;
        text-align: center;
        background-color: rgb(248, 126, 78);
        border-radius: 8px;
    }
</style>