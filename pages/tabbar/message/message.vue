<template>
	<view class="message">
		<view class="title">
			<view class="title-item" @click="setCurrentOption(0)">
				<text :class="{'active-title-item-text': currentOption === 0}">用户私信</text>
				<view class="underline active-underline" :style="{transform: `translateX(${currentOption * 50}vw)`}">

				</view>
			</view>
			<view class="title-item" @click="setCurrentOption(1)">
				<text :class="{'active-title-item-text': currentOption === 1}">活动通知</text>
				<view class="underline">

				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="content">
			<swiper class="swiper" :current="currentOption" @change="onSwiperChange">
				<swiper-item>
					<view class="swiper-item">
						<scroll-view scroll-y="true" class="userList">
							<template v-for="item in 2">
								<uni-list-chat title="uni-app" clickable @click="toOtherPage('chat')"
									avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
									note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
							</template>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<scroll-view scroll-y="true" class="userList">

						</scroll-view>
					</view>
				</swiper-item>
			</swiper>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		toOtherPage
	} from "./message.js"
	import {
		ref
	} from 'vue';
	import {
		relativeTime
	} from '../../common/util/common.js'
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"

	// 数据
	let currentOption = ref(0)

	// 设置新的currentOption
	const setCurrentOption = (index) => {
		currentOption.value = index
	}

	// 切换页面
	const onSwiperChange = (event) => {
		currentOption.value = event.detail.current
	}
</script>

<style lang="less" scoped>
	.message {
		width: 100vw;
		height: 100vh;

		.title {
			border-bottom: 1px solid #f5f4f1;
			height: 40px;
			display: flex;
			justify-content: space-around;

			.title-item {
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

		.content {
			width: 100%;
			height: calc(100% - 40px);

			.swiper {
				width: 100%;
				height: 100%;

				swiper-item {
					width: 100%;
					height: 100%;

					.swiper-item {
						width: 100%;
						height: 100%;

						.userList {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}

	.active-underline {
		background-color: #FEE802 !important;
	}

	.active-title-item-text {
		font-weight: bold;
	}
</style>