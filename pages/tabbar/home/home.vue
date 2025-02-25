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
						<text :class="{'active-optionName': currentMenu === 2}">快递代取</text>
						<view class="underline">

						</view>
					</view>
				</view>
				<view class="search" @click="toOtherPage('搜索')">
					<image src="/static/home/搜索.svg" mode=""></image>
				</view>
			</view>
			<view class="share">
				<swiper class="swiper" :current="currentMenu" @change="onSwiperChange">
					<swiper-item>
						<view class="swiper-item">
							<scroll-view :scroll-y="isScroll" class="page">
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
							2
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							3
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
		opacity,
		isScroll,
		currentMenu,
		background,
		isExtend,
		horizontal,
		vertical,
		direction,
		content,
		pattern,
		setCurrentMenu,
		onSwiperChange,
		scroll,
		toOtherPage,
		fabClick,
		trigger
	} from './home.js';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"
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