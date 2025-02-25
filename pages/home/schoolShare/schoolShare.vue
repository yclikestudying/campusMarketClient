<template>
	<view class="schoolShare">	
		<view class="text">
			<uni-easyinput type="textarea" autoHeight v-model="text" placeholder="请输入内容"></uni-easyinput>
		</view>
		<view class="image">
			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片" @select="onSelect" @delete="onDelete"></uni-file-picker>
			</view>
		</view>
		<view style="margin: 16px;">
			<van-button :loading="isLoading" type="primary" loading-type="spinner" round block native-type="submit" color="#FEE802" @click="onSubmit">
				提交
			</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		fileLists,
		text,
		onSelect,
		onDelete,
		onSubmit,
		isLoading
	} from "./schoolShare.js"
</script>

<style lang="less" scoped>
	.schoolShare {
		width: 100vw;
		height: 100vh;

		.text {
			padding: 10px;
		}

		.image {
			padding: 10px;

			.example-body {
				padding: 10px;
				padding-top: 0;
			}
		}
	}
</style>