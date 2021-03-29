import {debounce}  from './utils'

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