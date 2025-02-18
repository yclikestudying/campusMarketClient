<template>
	<view class="gender">
		<view class="item">
			<uni-data-checkbox v-model="radio1" :localdata="sex"></uni-data-checkbox>
		</view>
		<view style="margin: 16px;">
			<van-button round block type="primary" native-type="submit" color="#FEE802">
				提交
			</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	let radio1 = ref(0)

	const sex = [{
			text: '男',
			value: 0
		}, {
			text: '女',
			value: 1
		}, {
			text: '未知',
			value: 2
		}]
</script>

<style lang="less" scoped>
	.gender {
		width: 100vw;
		height: 100vh;
		
		.item {
			padding: 10px 0 10px 100px;
			width: 100%;
		}
	}
</style>