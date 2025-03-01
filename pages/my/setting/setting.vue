<template>
	<view class="setting">
		<view class="content">
			
		</view>
		<view class="logout" @click="toOtherPage">
			<text>退出登录</text>
		</view>
	</view>
</template>

<script setup>
	import {
		logout
	} from "/pages/common/util/api.js"
	
	let userId = uni.getStorageSync("user").userId
	let socket = getApp().globalData.sockets[`${userId}`];
	
	const toOtherPage = () => {
		uni.showModal({
			title: '温馨提示',
			content: '确认退出吗',
			success: async function(res) {
				if (res.confirm) {
					const res1 = await logout()
					if (res1.data.code === 200) {
						socket.close()
						delete getApp().globalData.sockets[`${userId}`]
						uni.reLaunch({
							url: "/pages/login/login"
						})
					}
				}
			}
		});
	}
</script>

<style lang="less" scoped>
	.setting {
		width: 100vw;
		height: 100vh;
		
		.content {
			width: 100%;
			height: calc(100% - 50px);
		}
		
		.logout {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			
			text {
				font-size: 18px;
			}
		}
	}
</style>
