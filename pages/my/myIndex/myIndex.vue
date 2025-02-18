<template>
	<scroll-view scroll-y="true" class="myIndex" @scroll="scroll">
		<view class="background">
			<image src="/static/my/backgroundImage.jpg" mode=""></image>
		</view>
		<view class="content">
			<view class="info">
				<view class="avatar">
					<view class="left">
						<image src="/static/初始化头像.jpg" mode=""></image>
					</view>
					<view class="right">
						<van-icon name="edit" size="20" />
						<text @click="toOtherPage('edit')">资料待完善0%</text>
					</view>
				</view>
				<view class="name">
					<text>coderyc</text>
				</view>
				<view class="data">
					<view class="data-item">
						<text>4</text>
						<text>关注</text>
					</view>
					<view class="data-item">
						<text>4</text>
						<text>粉丝</text>
					</view>
					<view class="data-item">
						<text>4</text>
						<text>访客</text>
					</view>
				</view>
				<view class="tag">
					<text>标签</text>
				</view>
				<view class="date">
					<text>注册时间</text>
				</view>
				<view class="IP">
					<text>IP属地</text>
				</view>
				<view class="profile">
					<text>简介</text>
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
				</swiper>
			</view>
		</view>
	</scroll-view>
</template>
<script setup>
	import { onLoad } from "@dcloudio/uni-app"
	import {
		currentOption,
		isScroll,
		setCurrentOption,
		onSwiperChange,
		scroll,
		toOtherPage
	} from "./myIndex.js"

	onLoad((e) => {
		uni.setNavigationBarTitle({
			title: "coderyc"
		})
	})

</script>
<style lang="less" scoped>
	@import url("./myIndex.css");
</style>