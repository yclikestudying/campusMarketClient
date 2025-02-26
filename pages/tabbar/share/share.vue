<template>
	<view class="allPage">
		<view class="share" style="padding-top: var(--status-bar-height);">
			<view class="title">
				<view class="item">
					<view class="title-item" @click="setCurrentOption(0)">
						<text :class="{'active-optionName': currentOption === 0}">关注</text>
						<view class="underline active-underline"
							:style="{transform: `translateX(${currentOption * 75}px)`}">

						</view>
					</view>
					<view class="title-item" @click="setCurrentOption(1)">
						<text :class="{'active-optionName': currentOption === 1}">推荐</text>
						<view class="underline">

						</view>
					</view>
				</view>
			</view>
			<view class="search" @click="onSearch">
				<van-search placeholder="动态搜索" />
			</view>
			<view class="content">
				<swiper class="swiper" :current="currentOption" @change="onSwiperChange">
					<swiper-item>
						<view class="swiper-item">
							<scroll-view scroll-y="true" class="page" refresher-enabled
								:refresher-triggered="isRefreshing" @refresherpulling="onPulling"
								@refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
								<SmallLoading v-if="isLoading"></SmallLoading>
								<van-empty v-if="articles?.length === 0" description="这里空空如也" />
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
													<text>{{ relativeTime(article.createTime, 'other') }}</text>
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
							<scroll-view scroll-y="true" class="page">
								<template v-for="item in 10">
									<view class="article">
										<view class="userInfo">
											<view class="avatar">
												<image src="/static/初始化头像.jpg" mode=""></image>
											</view>
											<view class="right">
												<view class="top">
													<text>名称</text>
													<van-button
														style="width: 40px;background-color: #FEE802;border: none;color: black;"
														type="primary" size="mini">关注</van-button>
												</view>
												<view class="bottom">
													<text>时间</text>
												</view>
											</view>
										</view>
										<view class="text">
											<text>这是文本</text>
										</view>
										<view class="image">
											<template v-for="item in 4">
												<view class="photo">
													<image src="/static/初始化头像.jpg" mode=""></image>
												</view>
											</template>
										</view>
										<view class="function">
											<uni-icons type="hand-up" size="25"></uni-icons>
											<text>10</text>
											<uni-icons type="chat" size="25"></uni-icons>
											<text>99+</text>
										</view>
									</view>
								</template>
							</scroll-view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShow,
		onLoad,
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	import {
		toOtherPage
	} from "./share.js"
	import {
		relativeTime
	} from "/pages/common/util/common.js"
	import {
		unlike,
		like,
		isLikeInList,
		getAttentionArticle
	} from "/pages/common/util/api.js"

	// 数据
	let currentOption = ref(0); // 当前选项
	let articles = ref(null); // 关注用户的动态集合
	let isLoading = ref(false); // 是否开启加载动画
	let myId = ref(uni.getStorageSync("user").userId); // 我的id
	let myInfo = ref({
		userId: uni.getStorageSync("user").userId,
		userAvatar: uni.getStorageSync("user").userAvatar,
		userName: uni.getStorageSync("user").userName
	})
	let isRefreshing = ref(false); // 是否开启下拉刷新

	onLoad(async (e) => {
		try {
			isLoading.value = true
			articles.value = await getAttentionArticle()
		} catch (err) {
			console.log(err)
		} finally {
			isLoading.value = false
		}
	})

	// 点赞动态
	const onLike = async (articleId, otherId) => {
		const res = await like(articleId, otherId)
		if (res.data.code === 200) {
			articles.value.forEach(article => {
				if (article.articleId === articleId) {
					if (!article.like.articleUserVOList) {
						article.like.articleUserVOList = []
					}
					article.like.articleUserVOList.push(myInfo.value)
					article.like.count++
				}
			})
			uni.showToast({
				title: "点赞成功"
			})
		}
	}

	// 取消点赞
	const onUnLike = async (articleId, otherId) => {
		const res = await unlike(articleId, otherId)
		if (res.data.code === 200) {
			articles.value.forEach(article => {
				if (article.articleId === articleId) {
					article.like.articleUserVOList = article.like.articleUserVOList.filter(user => user
						.userId === otherId)
					article.like.count--
				}
			})
			uni.showToast({
				title: "取消成功"
			})
		}
	}

	// 设置新的选项
	const setCurrentOption = (index) => {
		currentOption.value = index
	}

	// 页面滑动
	const onSwiperChange = (event) => {
		currentOption.value = event.detail.current
	}

	const onRefresh = () => {
		 isRefreshing.value = true; // 开启刷新状态
		  setTimeout(async () => {
		    try {
		      articles.value = await getAttentionArticle()
		    } catch (err) {
		      console.log(err);
		    } finally {
		      isRefreshing.value = false; // 关闭刷新状态
		    }
		  }, 1000);
	};

	const onRestore = () => {
		isRefreshing.value = false; // 恢复默认状态
	};

	const onAbort = () => {
		isRefreshing.value = false; // 恢复默认状态
	};
	
	uni.$on("attentionUserArticle", (article) => {
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
	.allPage {
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		.share {
			width: 100%;
			height: 100%;

			.title {
				position: relative;
				width: 100%;
				height: 50px;

				.item {
					position: absolute;
					left: 0;
					right: 0;
					margin: 0 auto;
					width: 150px;
					height: 100%;
					display: flex;
					justify-content: center;


					.title-item {
						width: 75px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						text {
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
			}

			.content {
				width: 100vw;
				height: calc(100vh - 50px - 92px);
				display: flex;
				transition: all .2s;

				.swiper {
					width: 100%;
					height: 100%;

					swiper-item {
						width: 100%;
						height: 100%;

						.swiper-item {
							width: 100%;
							height: 100%;
						}
					}
				}

				.page {
					width: 100vw;
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

	.active-searchPage {
		transform: translateY(-100vh);
	}
</style>