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
						<uni-icons type="chat" size="30"></uni-icons>
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
						<text>{{ attentionList ? attentionList.length : 0 }}</text>
						<text>关注</text>
					</view>
					<view class="data-item">
						<text>{{ fansList ? fansList.length : 0 }}</text>
						<text>粉丝</text>
					</view>
					<view class="data-item">
						<text>4</text>
						<text>访客</text>
					</view>
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
													<text>{{ formatDate(article.createTime) }}</text>
												</view>
											</view>
										</view>
										<view class="text" @click="toOtherPage('article', article.articleId)">
											<text>{{ article.articleContent }}</text>
										</view>
										<view class="image" @click="toOtherPage('article', article.articleId)">
											<template v-for="(photo, index) in JSON.parse(article.articlePhotos)">
												<view class="photo"
													@click.stop="toOtherPage('image', role, permission, photo, 'photo')">
													<image :src="photo" mode=""></image>
												</view>
											</template>
										</view>
										<view class="function">
											<uni-icons v-if="isLike(articles, article.articleId, myId)"
												type="hand-up-filled" color="red" size="25"
												@click="unlike(article.articleId)"></uni-icons>
											<uni-icons v-else type="hand-up" size="25"
												@click="like(article.articleId)"></uni-icons>
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
		userInfoProgress
	} from "../../common/util/common.js"
	import {
		getAttention,
		getFans,
		getUserInfo,
		toOtherPage,
		attentionUser,
		isAttention,
		unattentionUser,
		getArticle,
		isLike,
		deleteArticle,
		artilceLike,
		unArticleLike
	} from './myIndex.js'

	// 数据
	let role = ref(''); // 用户角色
	let permission = ref(''); // 用户权限
	let currentOption = ref(1); // 当前页的菜单
	let progress = ref(0); // 基本信息完善程度
	let user = ref(null); // 当前用户基本信息
	let myId = ref(uni.getStorageSync("user").userId); // 我的id
	let otherId = ref(null); // 进入其他用户主页时他们的id
	let attentionList = ref(null); // 当前用户的关注
	let fansList = ref(null); // 当前用户的粉丝
	let articles = ref([]); // 动态
	let isLoading = ref(false); // 是否开启加载动画
	let isScroll = ref(false); // 滚动监听

	onLoad((e) => {
		role.value = e.role
		permission.value = e.permission
		if (e.userId) {
			// 说明进入了其他用户的主页
			otherId.value = e.userId
		}
	})

	onShow(async () => {
		if (role.value === 'me') {
			// 如果是自己进入主页，那么从本地缓存获取用户信息
			user.value = uni.getStorageSync("user")
			// 计算基本信息完善程度
			progress.value = userInfoProgress()
			try {
				// 并发请求
				const [res1, res2, res3] = await Promise.all([
					// 获取关注数量
					getAttention("/friend/attention"),
					// 获取粉丝数量
					getFans("/friend/fans"),
					// 获取用户动态信息
					getArticle("/article/queryArticleByUserId")
				])
				attentionList.value = res1
				fansList.value = res2
				articles.value = res3
			} catch (err) {
				console.log(err)
			}
		} else {
			// 如果进入别的用户主页，那么根据id查询他的信息
			// 并发请求
			try {
				const [res1, res2, res3, res4] = await Promise.all([
					// 获取关注数量
					getAttention(`/friend/attention?userId=${otherId.value}`),
					// 获取粉丝数量
					getFans(`/friend/fans?userId=${otherId.value}`),
					// 获取用户信息
					getUserInfo(`/userInfo/getUserInfoByUserId?userId=${otherId.value}`),
					// 获取用户动态信息
					getArticle(`/article/queryArticleByUserId?userId=${otherId.value}`)
				])
				attentionList.value = res1
				fansList.value = res2
				user.value = res3
				articles.value = res4
				uni.setStorageSync("other", user.value)
			} catch (err) {
				console.log(err)
			} finally {

			}
		}

		// 设置title
		uni.setNavigationBarTitle({
			title: user.value.userName
		})
	})

	// 动态点赞
	const like = async (articleId) => {
		let url;
		let id;
		if (otherId.value) {
			url = `/article/queryArticleByUserId?userId=${otherId.value}`
			id = otherId.value
		} else {
			url = `/article/queryArticleByUserId`
			id = myId.value
		}
		const res = await artilceLike(articleId, id)
		if (res.data.code === 200) {
			const res1 = await getArticle(url)
			articles.value = res1
			uni.showToast({
				title: "点赞成功"
			})
		}
	}

	// 取消动态点赞
	const unlike = async (articleId) => {
		let url;
		let id;
		if (otherId.value) {
			url = `/article/queryArticleByUserId?userId=${otherId.value}`
			id = otherId.value
		} else {
			url = `/article/queryArticleByUserId`
			id = myId.value
		}
		const res = await unArticleLike(articleId, id)
		if (res.data.code === 200) {
			const res1 = await getArticle(url)
			articles.value = res1
			uni.showToast({
				title: "取消成功"
			})
		}
	}

	// 删除动态
	const deleteByArticleId = (articleId) => {
		uni.showModal({
			title: '温馨提示',
			content: '确认删除该动态吗',
			success: async function(res) {
				if (res.confirm) {
					const res = await deleteArticle(
						`/article/deleteArticleByArticleId?articleId=${articleId}`)
					if (res.data.code === 200) {
						const res1 = await getArticle("/article/queryArticleByUserId")
						articles.value = res1
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
		const res = await attentionUser(`/friend/attentionUser?userId=${myId.value}&otherId=${otherId.value}`)
		if (res.data.code === 200) {
			uni.showToast({
				title: "关注成功"
			})
			// 获取粉丝数量
			const [res] = await Promise.all([
				getFans(`/friend/fans?userId=${otherId.value}`)
			])
			fansList.value = res
		}
	}

	// 取消关注
	const unattention = async () => {
		const res = await unattentionUser(`/friend/unAttentionUser?userId=${myId.value}&otherId=${otherId.value}`)
		if (res.data.code === 200) {
			uni.showToast({
				title: "取消成功"
			})
			// 获取粉丝数量
			const [res] = await Promise.all([
				getFans(`/friend/fans?userId=${otherId.value}`)
			])
			fansList.value = res
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

	// import {
	// 	formatDate,
	// 	userInfoProgress
	// } from "../../common/util/common.js"
	// import {
	// 	onLoad,
	// 	onShow
	// } from "@dcloudio/uni-app"
	// import {
	// 	ref
	// } from 'vue';


	// // 数据
	// let role = ref(null); // 角色
	// let permission = ref(null); // 权限
	// let currentOption = ref(1)
	// let isScroll = ref(false)
	// let user = ref(null); // 用户信息
	// let articles = ref([]); // 文章动态
	// let attentionCount = ref(null); // 关注数量
	// let fansCount = ref(null); // 粉丝数量
	// let likeMap = ref(null); // 动态点赞map
	// let commentMap = ref(null); // 动态评论map
	// let isLoading = ref(false); // 是否加载
	// let progress = ref(null); // 资料完善进度
	// let userId = ref(null)

	// onLoad(async (e) => {
	// 	console.log(e)
	// 	// 获取角色和权限
	// 	role.value = e.role
	// 	permission.value = e.permission

	// 	// 查询自己的数据
	// 	if (role.value === 'me') {
	// 		// 获取用户信息
	// 		user.value = uni.getStorageSync("user")
	// 		uni.setNavigationBarTitle({
	// 			title: user.value.userName
	// 		})
	// 		try {
	// 			isLoading.value = true
	// 			// 并发请求
	// 			const [res1, res2, res3] = await Promise.all([
	// 				// 获取关注数量
	// 				getAttentionCount("/friend/attentionCount"),
	// 				// 获取粉丝数量
	// 				getFansCount("/friend/fansCount"),
	// 				// 获取动态相关信息
	// 				getArticle("/article/queryArticleByUserId")
	// 			])
	// 			attentionCount.value = res1
	// 			fansCount.value = res2
	// 			articles.value = res3
	// 		} catch (err) {
	// 			console.log(err)
	// 		} finally {
	// 			isLoading.value = false
	// 		}
	// 		return;
	// 	}
	// 	if (role.value === 'other') {
	// 		// 查询别人的数据
	// 		const id = e.userId
	// 		try {
	// 			isLoading.value = true
	// 			// 并发请求
	// 			const [res1, res2, res3, res4] = await Promise.all([
	// 				// 获取关注数量
	// 				getAttentionCount(`/friend/attentionCount?userId=${e.userId}`),
	// 				// 获取粉丝数量
	// 				getFansCount(`/friend/fansCount?userId=${e.userId}`),
	// 				// 获取动态相关信息
	// 				getArticle(`/article/queryArticleByUserId?userId=${e.userId}`),
	// 				// 获取用户信息
	// 				getUserInfo(`/userInfo/getUserInfoByUserId?userId=${e.userId}`)
	// 			])
	// 			attentionCount.value = res1
	// 			fansCount.value = res2
	// 			articles.value = res3
	// 			console.log(articles.value)
	// 			user.value = res4
	// 			uni.setNavigationBarTitle({
	// 				title: user.value.userName
	// 			})
	// 		} catch (err) {
	// 			console.log(err)
	// 		} finally {
	// 			isLoading.value = false
	// 		}
	// 	}
	// })

	// onShow(() => {
	// 	if (role.value === 'me') {
	// 		// 获取用户信息
	// 		user.value = uni.getStorageSync("user")
	// 		uni.setNavigationBarTitle({
	// 			title: user.value.userName
	// 		})
	// 		progress.value = userInfoProgress()
	// 	}
	// })

	// // 取消点赞
	// const unlike = async (articleId, id) => {
	// 	// const res = await request(`/likes/unlike?articleId=${articleId}&userId=${user.value.userId}`, "PUT", null)
	// 	// if (res.data.code === 200) {
	// 	// 	const res1 = await request(`/article/queryArticleByUserId?userId=${id}`, "GET", null)
	// 	// 	articles.value = res1.data.data
	// 	// 	uni.showToast({
	// 	// 		title: "取消点赞成功"
	// 	// 	})
	// 	// }
	// }

	// // 删除动态
	// const deleteByArticleId = (id) => {
	// 	uni.showModal({
	// 		title: '温馨提示',
	// 		content: '确认删除该动态吗',
	// 		success: async function(res) {
	// 			if (res.confirm) {
	// 				const res = await request(`/article/deleteArticleByArticleId?articleId=${id}`,
	// 					"DELETE",
	// 					null)
	// 				if (res.data.code === 200) {
	// 					articles.value = articles.value.filter(article => article.articleId !== id)
	// 					uni.showToast({
	// 						title: "删除成功"
	// 					})
	// 				}
	// 			}
	// 		}
	// 	});
	// }
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