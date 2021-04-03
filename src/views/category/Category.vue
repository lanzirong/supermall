<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll class="tab-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <div>
          <tab-content :categoriesProduct="categoriesProduct"></tab-content>
          <tab-control :titles="['综合', '新品', '销量']"
                     @tabClick="tabClick"
          ></tab-control>
          <tab-content-detail :categoryDetail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import TabMenu from './childComps/TabMenu.vue'
import TabContent from './childComps/TabContent.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import TabContentDetail from './childComps/TabContentDetail.vue'

import {backTopMixin,tabControlMixin,itemListenerMixin} from 'common/mixin'
import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'

import Scroll from 'components/common/scroll/Scroll'






export default {
  components: { 
    Scroll,
    NavBar,
    TabMenu,
    TabContent,
    TabControl,
    TabContentDetail,
    },
  mixins:[backTopMixin,tabControlMixin,itemListenerMixin],
  data(){
    return {
      scroll: null,
      intervall: null,
      categories: [],
      categoriesProduct:[],
      categoryData:{},
      currentIndex: -1
    }
  },
  created(){
    this._getCategory();
  },
  mounted(){

  },
  computed:{
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      // console.log(this.currentType)
      // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType])
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods:{
    _getCategory(){
      getCategory().then(res => {
        //1.获取数据
        this.categories = res.data.category.list

        //2.初始化每个类别的子数据
        for(let i=0; i < this.categories.length; i++){
          this.categoryData[i] = {
            subcategories:[],
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[],
            }
          }
        }

        //3.请求第一个分类的数据
      this._getSubcategory(0)
      })
    },
    _getSubcategory(index){
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res=>{
        this.categoriesProduct = res.data.list;
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type){
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    selectItem(index){
      this._getSubcategory(index);
    },
    contentScroll(position){
      const positionY = -position.y
      //1.判断backTop是否显示
      this.listenShowBackTop(position)
      }
  }
}
</script>

<style scoped>
.category{
  height: 100vh;
}
 .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;

    
  }
.message-pass{
  white-space: nowrap;
  width: 375px;
}
.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    display: flex;
}
.tab-content{
  height: 100%;
  flex: 1;
}
</style>