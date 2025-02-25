<template>
	<view class="gender">
		<view class="item">
			<uni-data-checkbox v-model="radio" :localdata="sex"></uni-data-checkbox>
		</view>
		<view style="margin: 16px;">
			<van-button round block type="primary" native-type="submit" color="#FEE802" @click="onSubmit">
				提交
			</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		request
	} from "/pages/common/util/request.js"

	// 数据
	let radio = ref(0)
	const sex = [{
		text: '男',
		value: 1
	}, {
		text: '女',
		value: 0
	}, {
		text: '保密',
		value: 2
	}]

	onLoad((e) => {
		radio.value = Number(e.param)
	})

	const onSubmit = async () => {
		const res = await request("/userInfo/updateUser", "PUT", {
			'key': 'userGender',
			'value': radio.value
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
	.gender {
		width: 100vw;
		height: 100vh;

		.item {
			padding: 10px 0 10px 100px;
			width: 100%;
		}
	}
</style>