<template>
	<scroll-view scroll-y="true" class="myIndex" @scroll="scroll">
		<view class="background">
			<image src="/static/my/backgroundImage.jpg" mode=""></image>
		</view>
		<view class="content">
			<view class="info">
				<view class="avatar">
					<view class="left">
						<image :src="user.userAvatar" mode=""></image>
					</view>
					<view class="right">
						<van-icon name="edit" size="20" />
						<text @click="toOtherPage('edit')">资料待完善<text style="color: #FEE802;">{{ userInfoProgress() }}</text></text>
					</view>
				</view>
				<view class="name">
					<text>{{ user.userName }}</text>
					<view v-if="user.isAdmin === 1" class="image">
						<image src="/static/my/administrater.png" mode=""></image>
					</view>
				</view>
				<view class="data">
					<view class="data-item">
						<text>{{ attentionCount }}</text>
						<text>关注</text>
					</view>
					<view class="data-item">
						<text>{{ fansCount }}</text>
						<text>粉丝</text>
					</view>
					<view class="data-item">
						<text>4</text>
						<text>访客</text>
					</view>
				</view>
				<view class="tag">
					<text>标签:</text>
					<template v-for="(tag, index) in JSON.parse(user.userTags)">
						<view class="tag-item">
							<van-tag type="primary" size="mini">
								{{ tag.text }}
							</van-tag>
						</view>
					</template>
				</view>
				<view class="date">
					<text>注册时间:{{ formatDate(user.createTime) }}</text>
				</view>
				<view class="IP">
					<text>IP属地:重庆</text>
				</view>
				<view class="profile">
					<text>简介:{{ user.userProfile }}</text>
				</view>
			</view>
			<view class="option">
				<view class="option-item" @click="setCurrentOption(0)">
					<text :class="{'active-option-name': currentOption === 0}">主页</text>
					<view class="underline active-underline"
						:style="{transform: `translateX(${currentOption * (100 / 4)}vw)`}">

					</view>
				</view>
				<view class="option-item" @click="setCurrentOption(1)">
					<text :class="{'active-option-name': currentOption === 1}">动态</text>
					<view class="underline">

					</view>
				</view>
				<view class="option-item" @click="setCurrentOption(2)">
					<text :class="{'active-option-name': currentOption === 2}">商品</text>
					<view class="underline">

					</view>
				</view>
				<view class="option-item" @click="setCurrentOption(3)">
					<text :class="{'active-option-name': currentOption === 3}">代取</text>
					<view class="underline">

					</view>
				</view>
			</view>
			<view scroll-y="true" class="detail">
				<swiper class="swiper" :current="currentOption" @change="onSwiperChange">
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
								主页
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
								<template v-for="(article, index) in articles" :key="article.articleId">
									<view class="article">
										<view class="userInfo">
											<view class="avatar">
												<image :src="user.userAvatar" mode=""></image>
											</view>
											<view class="right">
												<view class="top">
													<text>{{ user.userName }}</text>
													<van-button
														v-if="permission === 'read'"
														style="width: 40px;background-color: #FEE802;border: none;color: black;"
														type="primary" size="mini">关注</van-button>
													<uni-icons v-else type="trash" size="25"></uni-icons>
												</view>
												<view class="bottom">
													<text>{{ formatDate(article.createTime) }}</text>
												</view>
											</view>
										</view>
										<view class="text">
											<text>{{ article.articleContent }}</text>
										</view>
										<view class="image">
											<template v-for="(photo, index) in JSON.parse(article.articlePhotos)">
												<view class="photo">
													<image :src="photo" mode=""></image>
												</view>
											</template>
										</view>
										<view class="function">
											<uni-icons type="hand-up" size="25"></uni-icons>
											<text>{{ likeMap[`${article.articleId}`] }}</text>
											<uni-icons type="chat" size="25"></uni-icons>
											<text>99+</text>
										</view>
									</view>
								</template>
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
								商品
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
								代取
							</scroll-view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</scroll-view>
</template>
<script setup>
	import {
		formatDate,
		userInfoProgress
	} from "../../common/util/common.js"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		role,
		permission,
		currentOption,
		isScroll,
		user,
		articles,
		attentionCount,
		fansCount,
		likeMap
	} from "./myIndex.js"
	import {
		setCurrentOption,
		onSwiperChange,
		scroll,
		toOtherPage,
		getArticle,
		getAttentionCount,
		getFansCount,
		getArticleLike
	} from "./myIndex.js"

	onLoad(async (e) => {
		// 获取角色和权限
		role.value = e.role
		permission.value = e.permission

		if (role.value === 'me') {
			// 获取用户信息
			user.value = uni.getStorageSync("user")
			uni.setNavigationBarTitle({
				title: user.value.userName
			})
			// 并发请求
			const [res1, res2, res3, res4] = await Promise.all([
				// 获取动态
				getArticle("/article/queryArticleByUserId"),
				// 获取关注数量
				getAttentionCount("/friend/attentionCount"),
				// 获取粉丝数量
				getFansCount("/friend/fansCount"),
				// 获取动态点赞数
				getArticleLike("/likes/queryLikesOfUser")
			])
			articles.value = res1.reverse()
			attentionCount.value = res2
			fansCount.value = res3
			likeMap.value = res4
		}

	})
</script>
<style lang="less" scoped>
	@import url("./myIndex.css");
</style>