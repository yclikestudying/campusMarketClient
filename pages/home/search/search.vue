<template>
  <view style="padding-top: var(--status-bar-height);">
    <van-search v-model="searchContent" show-action placeholder="请输入用户关键字" @cancel="onCancel"/>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 数据
let searchContent = ref("");


const onCancel = () => {
	uni.navigateBack()
}



</script>

<style lang="less" scoped>

</style>