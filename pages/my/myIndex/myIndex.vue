<template>
	<scroll-view scroll-y="true" class="myIndex" @scroll="scroll">
		<view class="background">
			<image src="/static/my/backgroundImage.jpg" mode=""></image>
		</view>
		<view class="content">
			<view class="info">
				<view class="avatar">
					<view class="left" @click="toOtherPage('image', role, permission, user.userAvatar, 'avatar')">
						<image :src="user?.userAvatar" mode=""></image>
					</view>
					<view v-if="role === 'me'" class="right">
						<van-icon name="edit" size="20" />
						<text @click="toOtherPage('info', role, permission)">资料待完善<text
								style="color: #FEE802;">{{ progress }}</text></text>
					</view>
					<view v-else class="right">
						<van-button style="width: 50px;background-color: #FEE802;border: none;color: black;"
							type="primary" size="mini" @click="toOtherPage('info')">资料展示</van-button>
						<van-button v-if="isAttention(fansList, myId)"
							style="width: 40px;background-color: #FEE802;border: none;color: black;" type="primary"
							size="mini" @click="unattention">已关注</van-button>
						<van-button v-else style="width: 40px;background-color: #FEE802;border: none;color: black;"
							type="primary" size="mini" @click="attention">关注</van-button>
						<uni-icons type="chat" size="30" @click="toOtherPage('chat', 'me', 'update', {userId: user.userId, userAvatar: user.userAvatar, userName:user.userName})"></uni-icons>
					</view>
				</view>
				<view class="name">
					<text>{{ user?.userName }}</text>
					<view v-if="user?.isAdmin === 1" class="image">
						<image src="/static/my/administrater.png" mode=""></image>
					</view>
				</view>
				<view class="data">
					<view class="data-item">
						<text>{{ attentionList?.length ?? 0 }}</text>
						<text>关注</text>
					</view>
					<view class="data-item">
						<text>{{ fansList?.length ?? 0 }}</text>
						<text>粉丝</text>
					</view>
<!-- 					<view class="data-item">
						<text>4</text>
						<text>访客</text>
					</view> -->
				</view>
				<view class="tag">
					<text>标签:</text>
					<template v-if="user?.userTags" v-for="(tag, index) in JSON.parse(user.userTags)">
						<view class="tag-item">
							<van-tag type="primary" size="mini">
								{{ tag.text }}
							</van-tag>
						</view>
					</template>
				</view>
				<view class="date">
					<text>注册时间:{{ formatDate(user?.createTime) }}</text>
				</view>
				<view class="IP">
					<text>IP属地:重庆</text>
				</view>
				<view class="profile">
					<text>简介:{{ user?.userProfile }}</text>
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
								<TopLoading v-if="isLoading" des="主页加载中..."></TopLoading>
								<van-empty v-else-if="!isLoading && articles.length === 0" description="暂无数据" />
								<text v-else>主页</text>
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
								<TopLoading v-if="isLoading" des="动态加载中..."></TopLoading>
								<van-empty v-else-if="!isLoading && articles.length === 0" description="暂无数据" />
								<template v-else v-for="(article, index) in articles" :key="article.articleId">
									<view class="article">
										<view class="userInfo">
											<view class="avatar">
												<image :src="user.userAvatar" mode=""></image>
											</view>
											<view class="right">
												<view class="top">
													<text>{{ user.userName }}</text>
													<uni-icons v-if="permission === 'update'" type="trash" size="25"
														@click="deleteByArticleId(article.articleId)"></uni-icons>
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
													<image lazy-load="true" :src="photo" mode=""></image>
												</view>
											</template>
										</view>
										<view class="function">
											<uni-icons v-if="isLikeInList(articles, article.articleId, myId)"
												type="hand-up-filled" color="red" size="25"
												@click="onUnlike(article.articleId, article.publishUser.userId)"></uni-icons>
											<uni-icons v-else type="hand-up" size="25"
												@click="onLike(article.articleId, article.publishUser.userId)"></uni-icons>
											<text>{{ article.like.count ?? 0 }}</text>
											<uni-icons type="chat" size="25"></uni-icons>
											<text>{{ article.comment.count ?? 0 }}</text>
										</view>
									</view>
								</template>
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
								<TopLoading v-if="isLoading" des="商品加载中..."></TopLoading>
								<van-empty v-else-if="!isLoading && articles.length === 0" description="暂无数据" />
								<text v-else>商品</text>
							</scroll-view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
								<TopLoading v-if="isLoading" des="代取加载中..."></TopLoading>
								<van-empty v-else-if="!isLoading && articles.length === 0" description="暂无数据" />
								<text v-else>代取</text>
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
		onLoad,
		onShow
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";
	import {
		formatDate,
		relativeTime,
		userInfoProgress
	} from "../../common/util/common.js"
	import {
		toOtherPage,
	} from './myIndex.js'
	import {
		getAttention,
		getFans,
		getUserArticle,
		getUserInfo,
		like,
		likeAfter,
		unlike,
		unlikeAfter,
		deleteArticle,
		deleteArticleAfter,
		isLikeInList,
		isAttention,
		attentionUser,
		unattentionUser,
		attentionUserAfter,
		unattentionUserAfter,
		visitLog
	} from "/pages/common/util/api.js"

	// 数据
	let role = ref(''); // 用户角色
	let permission = ref(''); // 用户权限
	let currentOption = ref(1); // 当前页的菜单
	let progress = ref(0); // 基本信息完善程度
	let user = ref(null); // 当前用户基本信息
	let myId = ref(uni.getStorageSync("user").userId); // 我的id
	let otherId = ref(null); // 进入其他用户主页时他们的id
	let attentionList = ref(null); // 当前用户的关注
	let fansList = ref([]); // 当前用户的粉丝
	let articles = ref([]); // 动态
	let isLoading = ref(false); // 是否开启加载动画
	let isScroll = ref(false); // 滚动监听
	let myInfo = ref({
		userId: uni.getStorageSync("user").userId,
		userAvatar: uni.getStorageSync("user").userAvatar,
		userName: uni.getStorageSync("user").userName,
		userProfile: uni.getStorageSync("user").userProfile
	})
	let socket = getApp().globalData.sockets[`${myId.value}`]; // websocket实例

	onLoad(async(e) => {
		role.value = e.role
		permission.value = e.permission
		if (e.userId) {
			// 说明进入了其他用户的主页
			otherId.value = e.userId
		}
		if (role.value === 'me') {
			try {
				// 并发请求
				const [res1, res2, res3] = await Promise.all([
					// 获取关注数量
					getAttention(null),
					// 获取粉丝数量
					getFans(null),
					// 获取用户动态信息
					getUserArticle(null)
				])
				attentionList.value = res1
				fansList.value = res2 ?? []
				articles.value = res3 ?? []
			} catch (err) {
				console.log(err)
			}
		} else {
			// 如果进入别的用户主页，那么根据id查询他的信息
			// 并发请求
			try {
				const [res1, res2, res3, res4, res5] = await Promise.all([
					// 获取关注数量
					getAttention(otherId.value),
					// 获取粉丝数量
					getFans(otherId.value),
					// 获取用户信息
					getUserInfo(otherId.value),
					// 获取用户动态信息
					getUserArticle(otherId.value),
					// 记录访客记录
					visitLog(otherId.value)
				])
				attentionList.value = res1
				fansList.value = res2 ?? []
				user.value = res3
				articles.value = res4 ?? []
				uni.setStorageSync("other", user.value)
			} catch (err) {
				console.log(err)
			}
		}
		// 设置title
		uni.setNavigationBarTitle({
			title: user.value.userName
		})
		// 清除当前用户的id
		socket.setOneByOne(null)
	})

	onShow(async () => {
		if (role.value === 'me') {
			// 如果是自己进入主页，那么从本地缓存获取用户信息
			user.value = uni.getStorageSync("user")
			// 计算基本信息完善程度
			progress.value = userInfoProgress()
		}	
	})

	// 动态点赞
	const onLike = async (articleId, publishUserId) => {
		const res = await like(articleId, publishUserId)
		if (res.data.code === 200) {
			likeAfter(articles.value, articleId, myInfo.value)
		}
	}

	// 取消点赞
	const onUnlike = async (articleId, publishUserId) => {
		const res = await unlike(articleId, publishUserId)
		if (res.data.code === 200) {
			unlikeAfter(articles.value, articleId, myId.value)
		}
	}

	// 删除动态
	const deleteByArticleId = (articleId) => {
		uni.showModal({
			title: '温馨提示',
			content: '确认删除该动态吗',
			success: async function(res) {
				if (res.confirm) {
					const res1 = await deleteArticle(articleId)
					if (res1.data.code === 200) {
						articles.value = deleteArticleAfter(articles.value, articleId)
						uni.showToast({
							title: "删除成功"
						})
					}
				}
			}
		});
	}

	// 关注
	const attention = async () => {
		const res = await attentionUser(myId.value, otherId.value)
		if (res.data.code === 200) {
			attentionUserAfter(fansList.value, myInfo.value)
		}
	}

	// 取消关注
	const unattention = async () => {
		const res = await unattentionUser(myId.value, otherId.value)
		if (res.data.code === 200) {
			fansList.value = unattentionUserAfter(fansList.value, myInfo.value)
		}
	}

	// 点击设置菜单
	const setCurrentOption = (index) => {
		currentOption.value = index
	}

	// 滑动设置菜单
	const onSwiperChange = (e) => {
		currentOption.value = e.detail.current
	}

	// 监听滚动
	const scroll = (e) => {
		isScroll.value = e.detail.scrollTop > 325 ? true : false
	}
	
	// 更新动态缓存
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
	
	// 删除动态之后更新缓存
	uni.$on("deleteArticle", (articleId) => {
		articles.value = articles.value.filter(article => article.articleId !== articleId)
	})
</script>
<style lang="less" scoped>
	.myIndex {
		width: 100vw;
		height: 100vh;

		.background {
			width: 100%;
			height: 180px;
			border: 1px solid black;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			width: 100%;
			height: calc(100% - 180px);

			.info {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.avatar {
					position: relative;
					width: 90%;
					height: 50px;

					.left {
						position: absolute;
						bottom: 0;
						width: 90px;
						height: 90px;
						border-radius: 50%;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.right {
						position: absolute;
						right: 0;
						bottom: 0;
						width: 200px;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: right;
					}
				}

				.name {
					width: 90%;
					height: 40px;
					font-size: 20px;
					font-weight: bold;
					display: flex;
					align-items: center;

					.image {
						width: 50px;
						height: 100%;
						display: flex;
						align-items: center;

						image {
							width: 50px;
							height: 20px;
						}
					}
				}

				.data {
					width: 90%;
					height: 40px;
					display: flex;

					.data-item {
						width: 60px;
						height: 100%;
						display: flex;
						align-items: center;

						text:nth-child(1) {
							font-size: 18px;
							font-weight: bold;
						}

						text:nth-child(2) {
							font-size: 14px;
						}
					}
				}

				.tag {
					padding: 5px 0;
					width: 90%;
					font-size: 12px;
					color: gray;
					display: flex;
					flex-wrap: wrap;

					.tag-item {
						margin-right: 2px;
					}
				}

				.date {
					padding: 5px 0;
					width: 90%;
					font-size: 12px;
					color: gray;
				}

				.IP {
					padding: 5px 0;
					width: 90%;
					font-size: 12px;
					color: gray;
				}

				.profile {
					padding: 5px 0;
					width: 90%;
					font-size: 12px;
					color: gray;
				}
			}

			.option {
				display: flex;
				align-items: center;
				padding: 5px 0;
				border-top: 1px solid gainsboro;
				border-bottom: 1px solid gainsboro;

				.option-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.underline {
						width: 25px;
						height: 5px;
						background-color: white;
						border-radius: 50px;
						transition: all .2s;
					}
				}
			}

			.detail {
				width: 100%;
				height: 680px;
				background-color: #F3F2F8;

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

	.active-option-name {
		font-weight: bold;
	}
</style>