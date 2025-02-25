<template>
	<view style="padding-top: var(--status-bar-height);">
		<uni-search-bar v-model="content" placeholder="用户搜索" clearButton="always" cancelButton="always"
			@confirm="search('')" @cancel="cancel" @clear="clear" />
	</view>
	<view class="content">
		<SmallLoading v-if="isLoading"></SmallLoading>
		<view v-if="users.length === 0" class="history">
			<view class="title">
				<text>历史</text>
				<text @click="clearHistory">一键清空</text>
			</view>
			<view class="record">
				<template v-for="(item, index) in history">
					<text @click="search(item)">{{ item }}</text>
				</template>
			</view>
		</view>
		<scroll-view scroll-y="true" v-else class="user">
			<template v-for="(user, index) in users" :key="user.userId">
				<uni-list-chat clickable :title="user.userName" :avatar="user.userAvatar" :note="user.userProfile"
					@click="onClick('myIndex', user.userId)"></uni-list-chat>
			</template>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		request
	} from "/pages/common/util/request.js"

	// 数据
	let content = ref("");
	let history = ref([])
	let users = ref([])
	let isLoading = ref(false)

	onLoad((e) => {
		history.value = uni.getStorageSync("history")
	})

	// 返回
	const cancel = () => {
		uni.navigateBack()
	}

	// 搜索
	const search = async (item) => {
		if (item !== '') {
			content.value = item
		}
		isLoading.value = true
		try {
			const res = await request(`/userInfo/queryLikeUser?keyword=${content.value}`, "GET", null)
			if (res.data.code === 200) {
				users.value = res.data.data
				if (users.value.length === 0) {
					uni.showToast({
						title: "暂无用户",
						icon: "none"
					})
				}
				// 检索是否有相同的搜索记录
				const index = history.value.findIndex(item => item === content.value)
				if (index === -1) {
					history.value.push(content.value)
					uni.setStorageSync("history", history.value)
					history.value = uni.getStorageSync("history")
				}
			}
		} catch (err) {
			console.log(err)
		} finally {
			isLoading.value = false
		}
	}

	// 一键清空历史记录
	const clearHistory = () => {
		history.value.length = 0
		uni.setStorageSync("history", history.value)
		history.value = uni.getStorageSync("history")
	}

	// 清空搜索
	const clear = () => {
		content.value = ''
		users.value.length = 0
	}

	// 去到其他页面
	const onClick = (name, userId) => {
		uni.navigateTo({
			url: `/pages/my/myIndex/myIndex?role=other&permission=read&userId=${userId}`
		})
	}
</script>

<style lang="less" scoped>
	.content {
		position: relative;
		width: 100%;
		height: calc(100vh - 93px);

		.history {
			position: relative;
			z-index: 9999;
			width: 100%;

			.title {
				padding: 0 5px;
				color: black;
				display: flex;
				justify-content: space-between;
			}

			.record {
				padding: 0 5px;

				text {
					margin-right: 5px;
					font-size: 14px;
					color: gray;
				}
			}
		}

		.user {
			width: 100%;
			height: 100%;
		}
	}
</style>