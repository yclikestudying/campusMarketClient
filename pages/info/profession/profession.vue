<template>
	<view class="profession">
		<view>
			<van-cell title="职业" is-link :value="userProfession" size="large" />
		</view>
		<van-tree-select class="select" v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="profession" />
		<view style="margin: 16px;">
		  <van-button round block type="primary" native-type="submit" color="#FEE802" @click="onSubmit">
		    提交
		  </van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from "vue";
	import {profession, getProfession} from "./data.js"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		request
	} from "/pages/common/util/request.js"

	// 数据
	const activeId = ref(0);
	const activeIndex = ref(0);
	let userProfession = ref('')
	
	watch(activeId, (value) => {
		userProfession.value = getProfession(value)
	})
	
	onLoad((e) => {
		if (e.param !== 'null') {
			const data = JSON.parse(e.param)
			userProfession.value = data.text
			activeIndex.value = data.activeIndex
			activeId.value = data.activeId
		}
	})
	
	const onSubmit = async () => {
		if (userProfession.value.length === 0) {
			uni.showToast({
				title: "职业不能为空",
				icon: "none"
			})
			return;
		}
		const res = await request("/userInfo/updateUser", "PUT", {
			'key': 'userProfession',
			'value': JSON.stringify({'text': userProfession.value, 'activeIndex': activeIndex.value, 'activeId': activeId.value})
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
	.profession {
		width: 100vw;
		height: 100vh;
	}
</style>