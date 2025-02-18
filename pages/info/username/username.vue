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
		ref
	} from "vue";

	// 数据
	let load = ref(false)
	let placeholder = ref('输入新用户名')
	let userName = ref('')

</script>

<style lang="less" scoped>
	.username {
		width: 100vw;
		height: 100vh;

		.content {
			padding: 10px;
		}
	}
</style>