<template>
  <div class="toast" v-show="isShow" >
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    // props:{
    //     message:{
    //         type: String,
    //         default(){
    //             return ''
    //         }
    //     },
    //     isShow:{
    //         type: Boolean,
    //         default(){
    //             return false
    //         }
    //     }
    // },
    data(){
        return {
            message: '',
            isShow: false
        }
    },
    methods:{
        show(message="默认文字",duration=1500){
            this.isShow = true
            this.message = message

            setTimeout(()=>{
                this.isShow = false
                this.message = ''
            },duration)
        }
    }
}
</script>

<style scoped>
    .toast{
        position: fixed;
        color: #fff;
        padding: 13px 17px;
        background-color: rgba(0,0,0,.5);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 13px;

        z-index: 999;
    }
</style>