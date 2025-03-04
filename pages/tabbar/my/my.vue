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
				<SmallLoading v-if="isLoading"></SmallLoading>
				<view class="data-item" @click="toOtherPage('article')">
					<text>{{ article ? article.length : 0 }}</text>
					<text>动态</text>
				</view>
				<view class="data-item" @click="toOtherPage('attentionFans')">
					<text>{{ attentionFans ? attentionFans.length : 0 }}</text>
					<text>互关</text>
				</view>
				<view class="data-item" @click="toOtherPage('attention')">
					<text>{{ attention ? attention.length : 0 }}</text>
					<text>关注</text>
				</view>
				<view class="data-item" @click="toOtherPage('fans')">
					<text>{{ fans ? fans.length : 0 }}</text>
					<text>粉丝</text>
				</view>
			</view>
			<view class="function">
				<van-cell title="隐私" icon="closed-eye" is-link>
				</van-cell>
				<van-cell title="访客" icon="eye-o" :value="visitCount" is-link @click="toOtherPage('visit')">
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
		ref
	} from 'vue';
	import {
		toOtherPage,
		getArticle,
		getAttentionFans,
		getAttention,
		getFans
	} from './my';
	import {
		onShow,
		onLoad,
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	import {
		queryVisit,
		queryUnReadMessage
	} from "/pages/common/util/api.js"

	// 数据
	let userAvatar = ref(''); // 用户头像
	let userName = ref(''); // 用户名称
	let isAdmin = ref(0); // 管理员
	let article = ref(0); // 动态
	let attentionFans = ref(0); // 互关
	let attention = ref(0); // 关注
	let fans = ref(0); // 粉丝
	let isLoading = ref(false); // 是否加载
	let visitCount = ref(null); // 访客数量

	onLoad(async (e) => {
		try {
			isLoading.value = true
			const [res1, res2, res3, res4, res5] = await Promise.all([
				getArticle(),
				getAttention(),
				getFans(),
				getAttentionFans(),
				// 查询访客记录
				queryVisit()
			])
			article.value = res1
			attention.value = res2
			fans.value = res3
			attentionFans.value = res4
			visitCount.value = res5 ? res5.length : ''
		} catch (err) {
			console.log(err)
		} finally {
			isLoading.value = false
		}
	})

	onShow(async () => {
		// 本地缓存获取用户信息
		const user = uni.getStorageSync("user")
		userAvatar.value = user.userAvatar
		userName.value = user.userName
		isAdmin.value = user.isAdmin
		try {
			const [res1, res2, res3, res4] = await Promise.all([
				getArticle(),
				getAttention(),
				getFans(),
				getAttentionFans()
			])
			article.value = res1
			attention.value = res2
			fans.value = res3
			attentionFans.value = res4
		} catch (err) {
			console.log(err)
		}
		
		const count = await queryUnReadMessage()
		if (count !== 0) {
			uni.setTabBarBadge({
				index: 2,
				text: `${count}`
			})
		} else {
			uni.removeTabBarBadge({
				index: 2
			})
		}
	})
</script>

<style lang="less" scoped>
	.my {
		width: 100vw;
		height: 100vh;

		.background {
			position: relative;
			width: 100%;
			height: 210px;
			border: 1px solid black;

			image {
				width: 100%;
				height: 100%;
			}

			.user {
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				bottom: 60px;
				width: 90%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.avatar {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					width: calc(100% - 60px);
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.name {
						font-size: 22px;
						color: #ffffff;
						display: flex;
						align-items: center;

						.image {
							width: 50px;
							height: 100%;

							image {
								width: 50px;
								height: 20px;
							}
						}
					}
				}
			}
		}

		.content {
			position: relative;
			width: 100%;
			height: calc(100% - 210px);

			.data {
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				top: -30px;
				width: 80%;
				height: 60px;
				background-color: #ffffff;
				display: flex;
				border-radius: 10px;
				overflow: hidden;

				.data-item {
					width: 25%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 14px;
				}
			}

			.function {
				padding-top: 40px;
			}
		}
	}
</style>