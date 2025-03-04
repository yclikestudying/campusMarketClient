<template>
	<view class="express" @click="cancelShow">
		<view class="text">
			<uni-easyinput type="textarea" autoHeight v-model="text" placeholder="快递代取或者资料代打印"></uni-easyinput>
		</view>
		<view class="price" @touchstart="show = true">
			<van-cell title="价格" is-link :value="`￥${price}`" size="large" />
		</view>
		<view style="margin: 16px;" @click="onSubmit">
			<van-button :loading="loading" loading-type="spinner" round block type="primary" native-type="submit" color="#FEE802">
				发布
			</van-button>
		</view>
	</view>
	<van-number-keyboard :show="show" theme="custom" extra-key="." close-button-text="完成" @input="onInputNumber"
		@delete="onDeleteNumber" @blur="show = false">
		<template #delete>
			<van-icon name="delete" />
		</template>
	</van-number-keyboard>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		uploadExpress
	} from "/pages/common/util/api.js"

	// 数据
	let text = ref(''); // 文字内容
	let price = ref('0'); // 价格
	let show = ref(false);
	let loading = ref(false);

	// 数字键盘输入内容
	const onInputNumber = (value) => {
		price.value === '0' ? price.value = `${value}` : price.value += value
	}
	// 数字键盘删除内容
	const onDeleteNumber = () => {
		price.value = price.value.substring(0, price.value.length - 1)
		if (price.value.length === 0) {
			price.value = '0'
		}
	}

	// 发布
	const onSubmit = async () => {
		if (text.value === '') {
			uni.showToast({
				title: "内容不能为空",
				icon: "none"
			})
		} else {
			try {
				loading.value = true
				const res = await uploadExpress(text.value, price.value)
				if (res.data.code === 200) {
					uni.navigateBack()
					uni.showToast({
						title: "发布成功"
					})
				}
			} catch(err) {
				console.log(err)
			} finally {
				loading.value = false
			}
		}
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
	}
</style>