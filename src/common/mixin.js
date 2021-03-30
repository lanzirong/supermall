import {debounce}  from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data(){
        return {
            itemListenerMixin:null,
            newrefresh:null
        }
    },
    mounted(){
        this.newrefresh = debounce(this.$refs.scroll.refresh,500)

        this.itemImgListener = () => {
            this.newrefresh()
        }

        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}
export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop: false
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0,700)
        },
        listenShowBackTop(position){
            this.isShowBackTop = (-position.y) >300
    }
    }
    
}