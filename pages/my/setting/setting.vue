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
	const toOtherPage = () => {
		uni.reLaunch({
			url: "/pages/login/login"
		})
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
