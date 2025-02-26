<template>
	<view class="loading">
		<van-loading class="van-loading" vertical color="#0094ff">
		  <template #icon>
		    <van-icon name="star-o" size="30" />
		  </template>
		  {{ prop.des }}
		</van-loading>
	</view>
</template>

<script setup>
	import { ref, defineProps } from 'vue';
	
	const prop = defineProps({
		des: {
			type: String,
			default: "加载中..."
		}
	})
</script>

<style lang="less" scoped>
	.loading {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		display: flex;
		justify-content: center;
		background-color: white;
		
		.van-loading {
			position: absolute;
			top: 20px;
		}
	}
</style>