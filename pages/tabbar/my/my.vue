<template>
	<view class="my">
		<view class="background">
			<image src="/static/my/backgroundImage.jpg" mode=""></image>
			<view class="user" @click="toOtherPage('主页')">
				<view class="avatar">
					<image src="/static/初始化头像.jpg" mode=""></image>
				</view>
				<view class="right">
					<view class="name">
						<text>coderyc</text>
					</view>
					<view>
						<uni-icons type="right" size="30" color="#ffffff"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="data">
				<view class="data-item">
					<text>0</text>
					<text>动态</text>
				</view>
				<view class="data-item">
					<text>0</text>
					<text>互关</text>
				</view>
				<view class="data-item">
					<text>0</text>
					<text>关注</text>
				</view>
				<view class="data-item">
					<text>0</text>
					<text>粉丝</text>
				</view>
			</view>
			<view class="function">
				<van-cell title="隐私" icon="closed-eye" is-link>
				</van-cell>
				<van-cell title="访客" icon="eye-o" is-link>
				</van-cell>
				<van-cell title="邀请" icon="friends-o" is-link>
				</van-cell>
				<van-cell title="活动" icon="shop-o" is-link>
				</van-cell>
				<van-cell title="扫一扫" icon="scan" is-link>
				</van-cell>
				<van-cell title="帮助与客服" icon="service-o" is-link>
				</van-cell>
				<van-cell title="设置" icon="setting-o" is-link>
				</van-cell>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { toOtherPage } from './my';
</script>

<style lang="less" scoped>
	@import url("./my.css");
</style>