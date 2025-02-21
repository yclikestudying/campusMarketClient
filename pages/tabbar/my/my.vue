<template>
	<view class="my">
		<view class="background">
			<image src="/static/my/backgroundImage.jpg" mode=""></image>
			<view class="user" @click="toOtherPage('myIndex')">
				<view class="avatar">
					<image :src="userAvatar" mode=""></image>
				</view>
				<view class="right">
					<view class="name">
						<text>{{ userName }}</text>
						<view v-if="isAdmin === 1" class="image">
							<image src="/static/my/administrater.png" mode=""></image>
						</view>
					</view>
					<view>
						<uni-icons type="right" size="30" color="#ffffff"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="data">
				<view class="data-item" @click="toOtherPage('article')">
					<text>{{ articleCount }}</text>
					<text>动态</text>
				</view>
				<view class="data-item" @click="toOtherPage('attentionFans')">
					<text>{{ attentionFansCount }}</text>
					<text>互关</text>
				</view>
				<view class="data-item" @click="toOtherPage('attention')">
					<text>{{ attentionCount }}</text>
					<text>关注</text>
				</view>
				<view class="data-item" @click="toOtherPage('fans')">
					<text>{{ fansCount }}</text>
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
				<van-cell title="设置" icon="setting-o" is-link @click="toOtherPage('setting')">
				</van-cell>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		userAvatar,
		userName,
		isAdmin,
		articleCount,
		attentionFansCount,
		attentionCount,
		fansCount
	} from './my';
	import {
		toOtherPage,
		getArticleCount,
		getAttentionFansCount,
		getAttentionCount,
		getFansCount
	} from './my';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"

	onLoad(async (e) => {
		// 本地缓存获取用户信息
		const user = uni.getStorageSync("user")
		userAvatar.value = user.userAvatar
		userName.value = user.userName
		isAdmin.value = user.isAdmin

		const [res1, res2, res3, res4] = await Promise.all([
			getArticleCount(),
			getAttentionFansCount(),
			getAttentionCount(),
			getFansCount()
		])
		articleCount.value = res1
		attentionFansCount.value = res2
		attentionCount.value = res3
		fansCount.value = res4
	})
</script>

<style lang="less" scoped>
	@import url("./my.css");
</style>