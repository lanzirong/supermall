<template>
  <div>
    <h2>我的信息</h2>
    <scroll class="content" :probe-type="0">

    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Profile",
    components: {
      Scroll
    }
  }
</script>

<style scoped>
  .content {
    height: 300px;
    overflow: hidden;
  }
</style>
