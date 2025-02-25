<template>
	<view class="login" safe-area-inset-top="true">
		<view class="backgroundImg">
			<image src="/static/login/校园集市登录背景.jpg" mode=""></image>
		</view>

		<view class="loginItem">
			<view class="title">
				<text>校园集市</text>
			</view>
			<view class="option">
				<view class="optionItem" @click="onLogin('login')">
					<text>学生登录</text>
				</view>
				<view class="optionItem" @click="onLogin('register')">
					<text>新生注册</text>
				</view>
				<view :class="{slider: true, activeSlider: currentState === 'register'}"></view>
			</view>
			<view class="phoneNumber">
				<view class="type">
					<text>+86</text>
				</view>
				<view class="line"></view>
				<view class="number">
					<input type="number" placeholder="手机号码" v-model="phoneNumber" />
					<image :class="{activeImage: isClearImageShow}" src="/static/清除.svg" mode=""
						@click="onClearPhoneNumber"></image>
				</view>
			</view>
			<view class="phoneNumber">
				<view class="type">
					<text>密码</text>
				</view>
				<view class="line"></view>
				<view class="number">
					<input type="password" placeholder="密码" v-model="password" />
				</view>
			</view>
			<view :class="{phoneNumber: true, activeCheckPassword: currentState !== 'register'}">
				<view class="type">
					<text>验证</text>
				</view>
				<view class="line"></view>
				<view class="number">
					<input type="password" placeholder="验证密码" v-model="checkPassword" />
				</view>
			</view>
			<van-button class="van-button" :loading="loading" loading-type="spinner" type="primary" size="large" round
				@click="onSubmit">{{currentState === "login" ? "登录" : "注册"}}</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		phoneNumber,
		password,
		checkPassword,
		currentState,
		clearImageEl,
		isClearImageShow,
		loading,
		onClearPhoneNumber,
		onLogin,
		onSubmit
	} from "./login.js"
</script>

<style lang="less" scoped>
	.backgroundImg {
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
			object-fit: contain;
			opacity: .3;
		}
	}

	.loginItem {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 80%;
		height: 280px;

		.title {
			font-size: 22px;
			text-align: center;
			font-weight: bold;
		}

		.option {
			position: relative;
			margin-top: 10px;
			width: 100%;
			display: flex;
			text-align: center;
			font-size: 16px;
			font-weight: bold;

			.optionItem {
				width: 50%;
				padding: 5px 0;
				border: 1px solid white;
			}

			.slider {
				position: absolute;
				left: 0;
				top: 0;
				width: 50%;
				height: 100%;
				background-color: skyblue;
				opacity: .5;
				transition: all .2s;
			}
		}

		.phoneNumber {
			margin-top: 10px;
			width: 100%;
			height: 35px;
			border-radius: 50px;
			font-size: 18px;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.type {
				flex: 2;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				border-top-left-radius: 50px;
				border-bottom-left-radius: 50px;
				font-weight: bold;
			}

			.line {
				width: 1px;
				height: 60%;
				background-color: black;
			}

			.number {
				flex: 7;
				height: 100%;
				display: flex;
				align-items: center;
				padding-left: 10px;
				border-top-right-radius: 50px;
				border-bottom-right-radius: 50px;

				image {
					position: relative;
					right: 10px;
					width: 20px;
					height: 20px;
				}
			}
		}

		.van-button {
			margin-top: 10px;
		}
	}

	.activeImage {
		display: none;
	}

	.activeSlider {
		transform: translateX(100%);
	}

	.activeCheckPassword {
		display: none !important;
	}
</style>