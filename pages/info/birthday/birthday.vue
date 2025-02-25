<template>
	<view class="birthday">
		<view>
			<van-cell title="出生日期" is-link :value="birthday" size="large" />
		</view>
		<view class="example-body">
			<uni-datetime-picker type="date" v-model="birthday" start="1908-1-1" end="2030-1-1" />
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
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";
	import {
		request
	} from "/pages/common/util/request.js"

	// 数据
	let birthday = ref('');
	
	onLoad((e) => {
		if (e.param !== 'null') {
			birthday.value = e.param
		}
	})
	
	const onSubmit = async () => {
		if (birthday.value.length === 0) {
			uni.showToast({
				title: "出生日期不能为空",
				icon: "none"
			})
			return;
		}
		
		const res = await request("/userInfo/updateUser", "PUT", {
			'key': 'userBirthday',
			'value': birthday.value
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
	.birthday {
		width: 100vw;
		height: 100vh;

		.example-body {
			background-color: #fff;
			padding: 10px;
		}
	}
</style>