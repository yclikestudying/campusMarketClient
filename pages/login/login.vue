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
			<van-button class="van-button" type="primary" size="large" round
				@click="onSubmit">{{currentState === "login" ? "登录" : "注册"}}</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue';
	import { request } from "/pages/common/util/request.js"
	
	// 数据变量
	let phoneNumber = ref('17823257046'); // 手机号码
	let password = ref('111111'); // 密码
	let checkPassword = ref(''); // 验证密码
	let currentState = ref("login"); // 当前状态处于登录
	let clearImageEl = null; // 清除手机号图标DOM元素
	let isClearImageShow = ref(true); // 清除图标是否显示

	// 对输入框进行侦听
	watch(phoneNumber, (value) => {
		// 清除图标是否显示
		value.length !== 0 ? isClearImageShow.value = false : isClearImageShow.value = true
	})

	// 清除手机号码
	const onClearPhoneNumber = () => {
		phoneNumber.value = ""
	}

	// 登录还是注册
	const onLogin = (state) => {
		state === "register" ? currentState.value = "register" : currentState.value = "login"
	}

	// 登录注册提交
	const onSubmit = () => {
		uni.switchTab({
			url: "/pages/tabbar/home/home"
		})
	}
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

	// 整个登录框
	.loginItem {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 80%;
		height: 280px;

		// 校园集市题目
		.title {
			font-size: 22px;
			text-align: center;
			font-weight: bold;
		}

		// 登录或注册
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

			// 滑块
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

	// 清除手机号图标是否显示
	.activeImage {
		display: none;
	}

	// 滑块是否滑动
	.activeSlider {
		transform: translateX(100%);
	}

	// 验证密码框是否显示
	.activeCheckPassword {
		display: none !important;
	}
</style>