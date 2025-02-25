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
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		request
	} from "/pages/common/util/request.js"
	
	// 数据
	let hometown = ref('')
	
	onLoad((e) => {
		if (e.param !== 'null') {
			hometown.value = e.param
		}
	})
	
	const onSubmit = async () => {
		if (hometown.value.length === 0) {
			uni.showToast({
				title: "家乡不能为空",
				icon: "none"
			})
			return;
		}
		const res = await request("/userInfo/updateUser", "PUT", {
			'key': 'userHomeTown',
			'value': hometown.value
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
	.hometown {
		width: 100vw;
		height: 100vh;
		
		.content {
			padding: 10px;
		}
	} 
</style>
