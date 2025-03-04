<template>
	<view class="goodsMarket" @click="cancelShow">
		<view class="text">
			<uni-easyinput type="textarea" autoHeight v-model="text" placeholder="请输入内容"></uni-easyinput>
		</view>
		<view class="price" @touchstart="show = true">
			<van-cell title="价格" is-link :value="`￥${price}`" size="large" />
		</view>
		<view class="image">
			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片" @select="onSelect" @delete="onDelete"></uni-file-picker>
			</view>
		</view>
		<view style="margin: 16px;">
			<van-button :loading="loading" loading-type="spinner" round block type="primary" native-type="submit"
				color="#FEE802" @click="onSubmit">
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
		uploadGoods,
		uploadText
	} from "/pages/common/util/api.js"

	// 数据
	let text = ref(''); // 文字内容
	let price = ref('0'); // 价格
	let fileLists = ref([]); // 图片
	let loading = ref(false); // 加载动画
	const show = ref(false);

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
	// 选择图片后触发
	const onSelect = (event) => {
		event.tempFiles.forEach(tempFile => {
			fileLists.value.push(tempFile.file.path)
		})
	}
	// 图片从列表中删除
	const onDelete = (event) => {
		fileLists.value.splice(event.index, 1)
	}
	// 上传内容
	const onSubmit = async () => {
		if (text.value === '' && fileLists.value.length === 0) {
			uni.showToast({
				title: "内容不能为空",
				icon: "none"
			})
		} else {
			loading.value = true
			try {
				// 单独上传文本和价格
				if (text.value !== '' && fileLists.value.length === 0) {
					const res = await uploadText(text.value, price.value)
					if (res.data.code === 200) {
						uni.navigateBack()
						uni.showToast({
							title: "上传成功"
						})
						text.value = ''
						price.value = '0'
					}
					return;
				}

				// 上传图片和价格
				// 上传图片、文本和价格
				const files = fileLists.value.map((file, index) => {
					return {
						name: `file${index}`,
						uri: file
					}
				})
				const res = await uploadGoods(files, text.value, price.value)
				console.log(res)
				if (JSON.parse(res.data).code === 200) {
					uni.navigateBack()
					uni.showToast({
						title: "上传成功"
					})
					text.value = ''
					price.value = '0'
					fileLists.value.length = 0
				}
			} catch (err) {
				console.log(err)
			} finally {
				loading.value = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.goodsMarket {
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