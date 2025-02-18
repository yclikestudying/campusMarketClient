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
			<van-button round block type="primary" native-type="submit" color="#FEE802" @click="onSubmit">
				提交
			</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		Form
	} from "vant";
	import {
		ref
	} from "vue";

	// 数据
	let fileLists = ref([])
	let text = ref('')
	const token = uni.getStorageSync("token")

	// 返回上一页
	const back = () => {
		uni.navigateBack()
	}

	// 上传图片或者图片和文本
	const uploadImage = (url, upload, count, textContent) => {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: url,
				files: upload,
				formData: {
					"count": count,
					"text": textContent
				},
				header: {
					"Authorization": token
				},
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					console.log(`失败${err}`)
					reject(err)
				}
			})
		})
	}

	// 上传文本
	const uploadText = (url, method, text) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: method,
				data: text,
				header: {
					"Authorization": token
				},
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					console.log(`失败${err}`)
					reject(err)
				}
			})
		})
	}

	// 提交
	const onSubmit = async () => {
		if (text.value !== '' || fileLists.value.length !== 0) {
			try {
				// 1. 只发文本
				if (text.value !== '' && fileLists.value.length === 0) {
					const res = await uploadText("http://192.168.128.28:8080/article/publish", "POST", text.value)
					if (res.data.code === 200) {
						uni.navigateBack()
						uni.showToast({
							title: "上传成功"
						})
					}
					return;
				}

				// 2. 并发上传图片
				const length = fileLists.value.length
				const uploadPromises = fileLists.value.map(file => {
					return uploadImage("http://192.168.128.28:8080/article/publish", [{
						name: "file",
						uri: file
					}], length, text.value);
				});

				if (text.value === '' && fileLists.value.length !== 0) {
					// 并发上传所有文件
					const result = await Promise.all(uploadPromises);
					result.forEach(res => {
						console.log(res)
						if (JSON.parse(res.data).code === 200) {
							uni.navigateBack()
							uni.showToast({
								title: "上传成功"
							})
						}
					})
					return;
				}

				// 3. 上传文本和并发上传图片
				if (text.value !== '' && fileLists.value.length !== 0) {
					const result = await Promise.all(uploadPromises);
					result.forEach(res => {
						console.log(res)
						if (JSON.parse(res.data).code === 200) {
							uni.navigateBack()
							uni.showToast({
								title: "上传成功"
							})
						}
					})
				}
			} catch (error) {
				console.log(`错误信息${error}`)
			} finally {

			}
		} else {
			uni.showToast({
				title: "文本和图片不能同时为空",
				icon: 'none'
			})
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