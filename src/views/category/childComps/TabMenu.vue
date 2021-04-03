<template>
		<scroll id="tab-menu"  ref="scroll" :probe-type="3">
			<div class="menu-list">
				<div class="menu-list-item"
						:class="{active: index===currentIndex}"
						v-for="(item, index) in categories"
						:key="index"
						@click="itemClick(index)">
					{{item.title}}
				</div>
			</div>
		</scroll>
</template>

<script>


import Scroll from 'components/common/scroll/Scroll.vue'


export default {
  components: {
		Scroll
	},
	props:{
		categories:{
			type: Array,
			default(){
				return []
			}
		}
	},
	data(){
		return {
			currentIndex: 0
		}
	},
	methods: {
		  itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
  },
	updated(){
		this.$refs.scroll.refresh()
	},
	activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
	.tan-menu{
		height: 100%;
		width: 20%;
	}
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
		overflow: hidden;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>