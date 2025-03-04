<template>
	<view class="background" :style="background">

	</view>
	<scroll-view scroll-y="true" class="home" @scroll="scroll">
		<view class="title">
			<view class="title-item">
				<view class="image">
					<image src="/static/home/重庆文理学院校徽.png" mode=""></image>
				</view>
				<view class="text">
					<view class="name">
						<text>校园集市</text>
					</view>
					<view class="number">
						<text>7.9k动态</text>
						<text>&emsp;</text>
						<text>1w吃瓜群众</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="top">
				<view class="option">
					<view class="option-item" @click="setCurrentMenu(0)">
						<text :class="{'active-optionName': currentMenu === 0}">校园动态</text>
						<view class="underline active-underline"
							:style="{transform: `translateX(${currentMenu * 100}px)`}">

						</view>
					</view>
					<view class="option-item" @click="setCurrentMenu(1)">
						<text :class="{'active-optionName': currentMenu === 1}">二手集市</text>
						<view class="underline">

						</view>
					</view>
					<view class="option-item" @click="setCurrentMenu(2)">
						<text :class="{'active-optionName': currentMenu === 2}">跑腿服务</text>
						<view class="underline">

						</view>
					</view>
				</view>
				<view class="search" @click="toOtherPage('search')">
					<image src="/static/home/搜索.svg" mode=""></image>
				</view>
			</view>
			<view class="share">
				<swiper class="swiper" :current="currentMenu" @change="onSwiperChange">
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page" :refresher-enabled="articleEnabled"
								:refresher-triggered="isRefreshing" @refresherpulling="onPulling"
								@refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
								<SmallLoading v-if="isLoading"></SmallLoading>
								<van-empty v-if="articles?.length === 0" description="这里空空如也~" />
								<template v-else v-for="(article, index) in articles" :key="article">
									<view class="article">
										<view class="userInfo">
											<view class="avatar"
												@click="toOtherPage('myIndex', 'other', 'read', article.publishUser.userId)">
												<image :src="article.publishUser.userAvatar" mode=""></image>
											</view>
											<view class="right">
												<view class="top">
													<text>{{ article.publishUser.userName }}</text>
												</view>
												<view class="bottom">
													<text>{{ formatWeChatTime(article.createTime, 'other') }}</text>
												</view>
											</view>
										</view>
										<view class="text" @click="toOtherPage('article', role, permission, article)">
											<text>{{ article.articleContent }}</text>
										</view>
										<view class="image" @click="toOtherPage('article', role, permission, article)">
											<template v-for="(photo, index) in JSON.parse(article.articlePhotos)">
												<view class="photo"
													@click.stop="toOtherPage('image', role, permission, photo, 'photo')">
													<image :src="photo" mode=""></image>
												</view>
											</template>
										</view>
										<view class="function">
											<uni-icons v-if="isLikeInList(articles, article.articleId, myId)"
												type="hand-up-filled" color="red" size="25"
												@click="onUnLike(article.articleId, article.publishUser.userId)"></uni-icons>
											<uni-icons v-else type="hand-up" size="25"
												@click="onLike(article.articleId, article.publishUser.userId)"></uni-icons>
											<text>{{ article.like.count || 0 }}</text>
											<uni-icons type="chat" size="25"></uni-icons>
											<text>{{ article.comment.count || 0 }}</text>
										</view>
									</view>
								</template>
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isGoodsScroll" class="page" :refresher-enabled="goodsEnabled"
								:refresher-triggered="isGoodsRefreshing" @refresherrefresh="onRefresh1"
								@refresherrestore="onRestore1" @refresherabort="onAbort1">
								<SmallLoading v-if="isLoading"></SmallLoading>
								<van-empty v-if="goods?.length === 0" description="这里空空如也~" />
								<template v-for="(good, index) in goods" :key="good.id">
									<view class="article">
										<view class="userInfo">
											<view class="avatar"
												@click="toOtherPage('myIndex', 'other', 'read', good.userId)">
												<image :src="good.userAvatar" mode=""></image>
											</view>
											<view class="right">
												<view class="top">
													<text>{{ good.userName }}</text>
												</view>
												<view class="bottom">
													<text>{{ formatWeChatTime(good.createTime) }}</text>
												</view>
											</view>
										</view>
										<view class="text" @click="toOtherPage('goods', null, null, good.id)">
											<text>{{ good.goodsContent }}</text>
										</view>
										<view class="image" @click="toOtherPage('goods', null, null, good.id)">
											<template v-for="(photo, index) in JSON.parse(good.goodsPhotos)">
												<view class="photo"
													@click.stop="toOtherPage('image', role, permission, photo, 'photo')">
													<image :src="photo" mode=""></image>
												</view>
											</template>
										</view>
										<view class="function">
											<view class="price">
												<text>￥{{ good.goodsPrice }}</text>
											</view>
											<view>
												<van-button
													style="width: 40px;background-color: #FEE802;border: none;color: black;"
													type="primary" size="mini"
													@click="toOtherPage('chat', 'me', 'update', {userId:good.userId, userName:good.userName, userAvatar:good.userAvatar}, null, good.id)">联系我</van-button>
											</view>
										</view>
									</view>
								</template>
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isExpressScroll" class="page" :refresher-enabled="expressEnabled"
								:refresher-triggered="isExpressRefreshing" @refresherrefresh="onRefresh2"
								@refresherrestore="onRestore2" @refresherabort="onAbort2">
								<SmallLoading v-if="isLoading"></SmallLoading>
								<van-empty v-if="express?.length === 0" description="这里空空如也~" />
								<template v-for="(item, index) in express" :key="item.id">
									<view class="article">
										<view class="userInfo">
											<view class="avatar"
												@click="toOtherPage('myIndex', 'other', 'read', item.userId)">
												<image :src="item.userAvatar" mode=""></image>
											</view>
											<view class="right">
												<view class="top">
													<text>{{ item.userName }}</text>
												</view>
												<view class="bottom">
													<text>{{ formatWeChatTime(item.createTime) }}</text>
												</view>
											</view>
										</view>
										<view class="text">
											<text>{{ item.expressContent }}</text>
										</view>
										<view class="function">
											<view class="price">
												<text>￥{{ item.expressPrice }}</text>
											</view>
											<view>
												<van-button
													style="width: 40px;background-color: #FEE802;border: none;color: black;"
													type="primary" size="mini"
													@click="toOtherPage('chat', 'me', 'update', {userId:item.userId, userName:item.userName, userAvatar:item.userAvatar})">联系我</van-button>
											</view>
										</view>
									</view>
								</template>
							</scroll-view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</scroll-view>
	<uni-fab class="uni-fab" :popMenu="isExtend" :pattern="pattern" :content="content" :horizontal="horizontal"
		:vertical="vertical" :direction="direction" @trigger="trigger" @fabClick="fabClick" />
</template>

<script setup>
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref,
		computed
	} from "vue"
	import {
		getSchoolArticle,
		isLikeInList,
		like,
		unlike,
		likeAfter,
		unlikeAfter,
		queryAllGoods,
		queryAllExpress
	} from "/pages/common/util/api.js"
	import {
		relativeTime,
		formatWeChatTime
	} from "/pages/common/util/common.js"
	import {
		toOtherPage
	} from "./home.js"

	/**
	 * 数据
	 */
	let opacity = ref(0)
	let isScroll = ref(false); // 动态页面开始禁止滑动
	let isGoodsScroll = ref(false); // 商品页面开始禁止滑动
	let isExpressScroll = ref(false); // 跑腿页面开始禁止滑动
	let currentMenu = ref(0) // 菜单
	const background = computed(() => {
		return {
			opacity: `${opacity.value}`
		}
	})
	let isExtend = ref(false)
	let horizontal = ref('right')
	let vertical = ref('bottom')
	let direction = ref('horizontal')
	let pattern = ref({
		color: '#7A7E83',
		backgroundColor: '#fff',
		selectedColor: '#007AFF',
		buttonColor: '#FEE802',
		iconColor: '#fff'
	})
	let content = ref([{
			iconPath: '/static/home/校园圈子.png',
			text: '校园动态',
			active: false
		},
		{
			iconPath: '/static/home/商品.png',
			text: '二手集市',
			active: false
		},
		{
			iconPath: '/static/home/快递.png',
			text: '跑腿服务',
			active: false
		}
	])
	let articles = ref(null); // 动态集合
	let goods = ref(null); // 商品集合
	let express = ref(null); // 跑腿服务
	let isLoading = ref(false); // 是否开启加载动画
	let myId = ref(uni.getStorageSync("user").userId); // 我的id
	let myInfo = ref({
		userId: uni.getStorageSync("user").userId,
		userAvatar: uni.getStorageSync("user").userAvatar,
		userName: uni.getStorageSync("user").userName
	})
	let isRefreshing = ref(false); // 动态页面是否开启下拉刷新动画
	let isGoodsRefreshing = ref(false); // 商品页面是否开启下拉刷新动画
	let isExpressRefreshing = ref(false); // 跑腿页面是否开启下拉刷新动画
	let articleEnabled = ref(true); // 动态页面是否允许下拉刷新
	let goodsEnabled = ref(true); // 商品页面是否允许下拉刷新
	let expressEnabled = ref(true); // 跑图页面是否允许下拉刷新

	onLoad(async (e) => {
		try {
			isLoading.value = true
			// 并发处理
			const [res1, res2, res3] = await Promise.all([
				// 获取动态
				getSchoolArticle(),
				// 获取商品
				queryAllGoods(),
				// 获取跑腿服务
				queryAllExpress()
			])
			articles.value = res1
			if (res2) {
				goods.value = res2.filter(item => item.userId !== myId.value)
			}
			if (res3) {
				express.value = res3.filter(item => item.userId !== myId.value)
			}
		} catch (err) {
			console.log(err)
		} finally {
			isLoading.value = false
		}
	})

	// 点赞
	const onLike = async (articleId, publishUserId) => {
		const res = await like(articleId, publishUserId)
		if (res.data.code === 200) {
			likeAfter(articles.value, articleId, myInfo.value)
		}
	}

	// 取消点赞
	const onUnLike = async (articleId, otherId) => {
		const res = await unlike(articleId, otherId)
		if (res.data.code === 200) {
			unlikeAfter(articles.value, articleId, myInfo.value.userId)
		}
	}


	// 点击浮动图标
	const fabClick = () => {
		isExtend.value = true
	}

	// 点击浮动图标里面的选项
	const trigger = (event) => {
		const routes = {
			0: "/pages/home/schoolShare/schoolShare",
			1: "/pages/home/goodsMarket/goodsMarket",
			2: "/pages/home/express/express"
		}
		const url = routes[event.index]

		uni.navigateTo({
			url: url
		})
	};

	// 点击设置新的菜单
	const setCurrentMenu = (index) => {
		currentMenu.value = index
	}

	// 滑动设置新的菜单
	const onSwiperChange = (e) => {
		currentMenu.value = e.detail.current
	}


	// 整个页面的滑动的监听事件
	const scroll = (e) => {
		if (e.detail.scrollTop === 0) {
			opacity.value = 0
			isScroll.value = false
			isGoodsScroll.value = false
			isExpressScroll.value = false
			articleEnabled.value = true
			goodsEnabled.value = true
			expressEnabled.value = true
		}
		if (e.detail.scrollTop > 0 && e.detail.scrollTop < 30) {
			opacity.value = 0.2
			isScroll.value = false
			isGoodsScroll.value = false
			isExpressScroll.value = false
			articleEnabled.value = false
			goodsEnabled.value = false
			expressEnabled.value = false
		}
		if (e.detail.scrollTop > 30 && e.detail.scrollTop < 60) {
			opacity.value = 0.4
			isScroll.value = false
			isGoodsScroll.value = false
			isExpressScroll.value = false
			articleEnabled.value = false
			goodsEnabled.value = false
			expressEnabled.value = false
		}
		if (e.detail.scrollTop > 60 && e.detail.scrollTop < 90) {
			opacity.value = 0.6
			isScroll.value = false
			isGoodsScroll.value = false
			isExpressScroll.value = false
			articleEnabled.value = false
			goodsEnabled.value = false
			expressEnabled.value = false
		}
		if (e.detail.scrollTop > 90 && e.detail.scrollTop < 120) {
			opacity.value = 0.8
			isScroll.value = false
			isGoodsScroll.value = false
			isExpressScroll.value = false
			articleEnabled.value = false
			goodsEnabled.value = false
			expressEnabled.value = false
		}
		if (e.detail.scrollTop > 120 && e.detail.scrollTop < 130) {
			opacity.value = 1
			isScroll.value = false
			isGoodsScroll.value = false
			isExpressScroll.value = false
			articleEnabled.value = false
			goodsEnabled.value = false
			expressEnabled.value = false
		}
		if (e.detail.scrollTop >= 130) {
			opacity.value = 1
			isScroll.value = true
			isGoodsScroll.value = true
			isExpressScroll.value = true
			articleEnabled.value = false
			goodsEnabled.value = false
			expressEnabled.value = false
		}
	}

	// 下拉刷新
	const onRefresh = () => {
		if (articleEnabled.value) {
			isRefreshing.value = true; // 开启刷新状态
			setTimeout(async () => {
				try {
					articles.value = await getSchoolArticle()
				} catch (err) {
					console.log(err);
				} finally {
					isRefreshing.value = false; // 关闭刷新状态
				}
			}, 1000);
		}
	};

	const onRestore = () => {
		isRefreshing.value = false; // 恢复默认状态
	};

	const onAbort = () => {
		isRefreshing.value = false; // 恢复默认状态
	};

	// 下拉刷新
	const onRefresh1 = () => {
		if (goodsEnabled.value) {
			isGoodsRefreshing.value = true; // 开启刷新状态
			setTimeout(async () => {
				try {
					goods.value = await queryAllGoods()
				} catch (err) {
					console.log(err);
				} finally {
					isGoodsRefreshing.value = false; // 关闭刷新状态
				}
			}, 1000);
		}
	};

	const onRestore1 = () => {
		isGoodsRefreshing.value = false; // 恢复默认状态
	};

	const onAbort1 = () => {
		isGoodsRefreshing.value = false; // 恢复默认状态
	};
	
	// 下拉刷新
	const onRefresh2 = () => {
		if (expressEnabled.value) {
			isExpressRefreshing.value = true; // 开启刷新状态
			setTimeout(async () => {
				try {
					express.value = await queryAllExpress()
				} catch (err) {
					console.log(err);
				} finally {
					isExpressRefreshing.value = false; // 关闭刷新状态
				}
			}, 1000);
		}
	};
	
	const onRestore2 = () => {
		isExpressRefreshing.value = false; // 恢复默认状态
	};
	
	const onAbort2 = () => {
		isExpressRefreshing.value = false; // 恢复默认状态
	};

	uni.$on("updateArticles", (article) => {
		articles.value.forEach(item => {
			if (item.articleId === article.articleId) {
				// 点赞相关
				item.like.articleUserVOList = article.like.articleUserVOList
				item.like.count = article.like.count
				// 评论相关
				item.comment.articleUserVOList = article.comment.articleUserVOList
				item.comment.count = article.comment.count
				item.comment.commentList = article.comment.commentList
				item.comment.commentId = article.comment.commentId
				item.comment.time = article.comment.time
			}
		})
	})
</script>

<style lang="less" scoped>
	.background {
		position: absolute;
		top: 0;
		width: 100%;
		height: 68px;
		background-color: white;
		z-index: 999;
		transition: all .1s;
	}

	.home {
		width: 100vw;
		height: 100vh;

		.title {
			width: 100%;
			height: 200px;
			background: linear-gradient(to right, rgb(179, 86, 5), rgb(236, 130, 38));
			display: flex;
			flex-direction: column;
			justify-content: center;

			.title-item {
				width: 100%;
				height: 50px;
				display: flex;
				padding-left: 15px;

				.image {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: white;
					margin-left: 10px;

					.name {
						font-size: 20px;
						font-weight: bold;
					}

					.number {
						font-size: 14px;
					}
				}
			}
		}

		.content {
			position: relative;
			bottom: 15px;
			width: 100%;
			height: calc(100vh - 200px + 15px + 130px);
			border-top-right-radius: 20px;
			border-top-left-radius: 20px;
			background-color: white;

			.top {
				display: flex;

				.option {
					width: 85%;
					height: 60px;
					display: flex;

					.option-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 0 10px;
						width: 100px;

						text {
							margin-bottom: 5px;
							transition: all .2s;
						}

						.underline {
							width: 25px;
							height: 5px;
							background-color: white;
							border-radius: 50px;
							transition: all .2s;
						}
					}
				}

				.search {
					width: 15%;
					height: 60px;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 50%;
						height: 50%;
						object-fit: contain;
					}
				}
			}

			.share {
				width: 100vw;
				height: calc(100vh - 200px + 15px - 60px + 130px);
				display: flex;

				.swiper {
					width: 100%;
					height: 100%;

					swiper-item {
						width: 100%;
						height: 100%;

						.swiper-item {
							width: 100%;
							height: 100%;

							.page {
								width: 100%;
								height: 100%;

								.article {
									box-sizing: content-box;
									padding: 10px 0;
									width: 100%;
									display: flex;
									flex-direction: column;
									align-items: center;

									.userInfo {
										width: 95%;
										height: 50px;
										display: flex;
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
											width: calc(100% - 50px - 10px);
											height: 100%;

											.top {
												width: 100%;
												height: 50%;
												display: flex;
												justify-content: space-between;
											}

											.bottom {
												width: 100%;
												height: 50%;
												font-size: 12px;
												display: flex;
												align-items: center;
											}
										}
									}

									.text {
										margin-top: 10px;
										width: 95%;
									}

									.image {
										margin-top: 10px;
										width: 95%;
										display: flex;
										flex-wrap: wrap;

										.photo {
											margin-right: 2px;
											margin-bottom: 2px;
											width: 110px;
											height: 110px;

											image {
												width: 100%;
												height: 100%;
											}
										}
									}

									.function {
										width: 95%;
										display: flex;
										align-items: center;
										justify-content: right;

										.price {
											height: 100%;
											display: flex;
											align-items: center;
											margin-right: 10px;
											font-size: 20px;
											color: red;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	.active-underline {
		background-color: #FEE802 !important;
	}

	.active-optionName {
		font-size: 18px;
		font-weight: bold;
	}

	/* 已关注 */
	.active-buttom {
		background-color: #e0e0e0 !important;
	}
</style>