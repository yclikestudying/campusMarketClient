<template>
	<view class="express" @click="cancelShow">
		<view class="text">
			<uni-easyinput type="textarea" autoHeight v-model="text" placeholder="请输入内容"></uni-easyinput>
		</view>
		<view class="price" @click.stop="showkeyBoard">
			<van-cell title="价格" is-link :value="`￥${price}`" size="large" />
		</view>
		<view class="image">
			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
			</view>
		</view>
		<view style="margin: 16px;">
			<van-button round block type="primary" native-type="submit" color="#FEE802">
				发布
			</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";

	// 数据
	let text = ref(''); // 文字内容
	let price = ref('0'); // 价格
	
	const onSubmit = (value) => {
		show.value = false
	}
</script>

<style lang="less" scoped>
	.express {
		width: 100vw;
		height: 100vh;

		.text {
			padding: 10px;
		}

		.price {
			padding: 10px;
			--van-cell-value-color: red;
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