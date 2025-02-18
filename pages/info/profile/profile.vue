<template>
	<view class="profile">
		<view class="content">
			<uni-easyinput type="textarea" v-model="userProfile" :placeholder="placeholder"></uni-easyinput>
		</view>
		<view style="margin: 16px;">
		  <van-button round block type="primary" native-type="submit" color="#FEE802" @click="onSubmit">
		    提交
		  </van-button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue"
	
	// 数据
	let userProfile = ref('')
	let placeholder = ref(uni.getStorageSync("userInfo").userProfile || '请输入内容')
</script>

<style lang="less" scoped>
	.profile {
		width: 100vw;
		height: 100vh;
		
		.content {
			padding: 10px;
		}
	} 
</style>
