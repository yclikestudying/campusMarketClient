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
		onShow
	} from "@dcloudio/uni-app"
	import {
		getAttentionArticle
	} from "./share.js"

	// 数据
	let currentOption = ref(0); // 当前选项
	
	onShow(async () => {
		const res = await getAttentionArticle("/article/queryArticleOfAttention")
		console.log(res)
	})

	// 设置新的选项
	const setCurrentOption = (index) => {
		currentOption.value = index
	}

	// 页面滑动
	const onSwiperChange = (event) => {
		currentOption.value = event.detail.current
	}
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