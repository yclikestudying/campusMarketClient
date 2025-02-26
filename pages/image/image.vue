<template>
	<view class="image" @click="back">
		<image :src="imageUrl" mode="widthFix"></image>
		<view v-if="permission === 'update' && type === 'avatar'" class="upload" @click.stop="upload">
			<van-button class="button" :loading="loading" type="primary" loading-type="spinner">上传图片</van-button>
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
		singleFile,
		request
	} from "/pages/common/util/request.js"

	// 数据
	let role = ref('')
	let permission = ref('')
	let type = ref('')
	let imageUrl = ref(uni.getStorageSync("image"));
	let loading = ref(false)

	onLoad((e) => {
		role.value = e.role
		permission.value = e.permission
		type.value = e.type
	})

	// 返回
	const back = () => {
		uni.navigateBack()
	}

	// 上传头像
	const upload = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: async (res) => {
				loading.value = true
				try {
					const res1 = await singleFile("/userInfo/updateAvatar", res.tempFilePaths[0])
					if (JSON.parse(res1.data).code === 200) {
						// 重新查询数据并更新 Redis 和本地缓存
						const res2 = await request("/userInfo/getUserInfoByUserId", "GET", null)
						if (res2.data.code === 200) {
							uni.setStorageSync("user", res2.data.data)
							imageUrl.value = res2.data.data.userAvatar
						}
					}
				} catch(err) {
					console.log(err)
				} finally {
					loading.value = false
				}
			}
		});
	}
</script>

<style lang="less" scoped>
	.image {
		width: 100vw;
		height: 100vh;
		background-color: black;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		image {
			width: 100%;
		}

		.upload {
			position: relative;
			top: 10px;
			width: 115px;

			.button {
				width: 100%;
			}
		}
	}
</style>