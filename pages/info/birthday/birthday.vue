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
		ref
	} from "vue";

	// 数据
	let birthday = ref(uni.getStorageSync("userInfo").userBirthday);
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