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
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		request
	} from "/pages/common/util/request.js"

	// 数据
	let location = ref('')

	onLoad((e) => {
		if (e.param !== 'null') {
			location.value = e.param
		}	
	})

	const onSubmit = async () => {
		if (location.value.length === 0) {
			uni.showToast({
				title: "所在地不能为空",
				icon: "none"
			})
			return;
		}
		const res = await request("/userInfo/updateUser", "PUT", {
			'key': 'userLocation',
			'value': location.value
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
	.location {
		width: 100vw;
		height: 100vh;

		.content {
			padding: 10px;
		}
	}
</style>