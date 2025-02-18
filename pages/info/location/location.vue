<template>
	<view class="location">
		<view>
			<van-cell title="所在地" is-link :value="location" size="large" />
		</view>
		<view class="content">
			<uni-data-picker placeholder="请选择所在地区" popup-title="请选择所在地区" :localdata="dataTree" v-model="location">
			</uni-data-picker>
		</view>
		<view style="margin: 16px;">
			<van-button round block type="primary" native-type="submit" color="#FEE802" @click="onSubmit">
				提交
			</van-button>
		</view>
	</view>
</template>

<script setup>
	import dataTree from "./city.js"
	import {
		ref
	} from "vue"

	// 数据
	let location = ref(uni.getStorageSync("userInfo").userLocation)

</script>

<style lang="less" scoped>
	.location {
		width: 100vw;
		height: 100vh;

		.content {
			padding: 10px;
		}
	}
</style>