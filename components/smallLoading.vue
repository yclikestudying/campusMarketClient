<template>
	<view class="loading">
		<van-loading vertical color="#0094ff">
		  <template #icon>
		    <van-icon name="star-o" size="30" />
		  </template>
		</van-loading>
	</view>
</template>

<script setup>
	import { ref, defineProps } from 'vue';
</script>

<style lang="less" scoped>
	.loading {
		position: absolute;
		z-index: 999;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>