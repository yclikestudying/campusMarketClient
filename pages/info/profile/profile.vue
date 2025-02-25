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
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		request
	} from "/pages/common/util/request.js"
	
	// 数据
	let userProfile = ref('')
	let placeholder = ref('')
	
	onLoad((e) => {
		if (e.param !== 'null') {
			placeholder.value = e.param
		}	
	})
	
	const onSubmit = async () => {
		if (userProfile.value.length === 0) {
			uni.showToast({
				title: "内容不能为空",
				icon: "none"
			})
			return;
		}
		const res = await request("/userInfo/updateUser", "PUT", {
			'key': 'userProfile',
			'value': userProfile.value
		})
		if (res.data.code === 200) {
			uni.showToast({
				title: "修改成功"
			})
			// 重新查询用户信息
			const res = await request("/userInfo/getUserInfoByUserId", "GET", null)
			if (res.data.code === 200) {
				uni.setStorageSync("user", res.data.data)
			}
	
			uni.navigateBack()
		}
	}
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
