<template>
    <div class="check-button" :class="{check: isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
    props:{
        isChecked:{
            type: Boolean,
            default(){
                return false
            }
        }
    }
}
</script>

<style scoped>
    .check-button{
        border-radius: 50%;
        border: 2px solid #aaa;
    }
    .check{
        border-color: var(--color-high-text);
        background-color: var(--color-high-text);
    }
</style>