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
	@import url("./login.css");
</style>