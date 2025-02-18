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
							<template v-for="item in 20">
								<uni-list-chat title="uni-app"
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
		currentOption,
		setCurrentOption,
		onSwiperChange
	} from "./message.js"
</script>

<style lang="less" scoped>
	@import url('./message.css');
</style>