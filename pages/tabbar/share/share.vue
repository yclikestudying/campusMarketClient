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
		currentOption,
		setCurrentOption,
		onSwiperChange
	} from "./share.js"
</script>

<style lang="less" scoped>
	@import url('./share.css');
</style>