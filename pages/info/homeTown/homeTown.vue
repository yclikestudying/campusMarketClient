<template>
	<view class="hometown">
		<view>
			<van-cell title="家乡" is-link :value="hometown" size="large" />
		</view>
		<view class="content">
			<uni-data-picker placeholder="请选择所在家乡" popup-title="请选择所在家乡" :localdata="dataTree" v-model="hometown">
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
	import dataTree from "../location/city.js"
	import { ref } from "vue"
	
	// 数据
	let hometown = ref(uni.getStorageSync("userInfo").userHometown)
	
</script>

<style lang="less" scoped>
	.hometown {
		width: 100vw;
		height: 100vh;
		
		.content {
			padding: 10px;
		}
	} 
</style>
