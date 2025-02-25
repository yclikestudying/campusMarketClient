<template>
	<view class="username">
		<view class="content">
			<uni-easyinput v-model="userName" :placeholder="placeholder"></uni-easyinput>
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
		placeholder,
		userName,
		onSubmit
	} from "./username.js"
	
	onLoad((e) => {
		placeholder.value = e.param
	})
</script>

<style lang="less" scoped>
	@import url('./username.css');
</style>