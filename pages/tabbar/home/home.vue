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
	
	onLoad((e) => {
		console.log('哈哈哈')
	})
</script>

<style lang="less" scoped>
	@import url('./home.css');
</style>