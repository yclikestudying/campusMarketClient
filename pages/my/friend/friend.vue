<template>
	<view class="friend">
		<scroll-view scroll-y="true" class="scroll">
			<van-empty v-if="users === null" description="这里空空如也" />
			<template v-else v-for="(user, index) in users" :key="user.userId">
				<uni-list-chat clickable :title="user.userName" :avatar="user.userAvatar"
					:note="user.userProfile ?? ''" :time="relativeTime(user.visitTime, 'other')" @click="onClick(user.userId)"></uni-list-chat>
			</template>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue"
	import {
		getFriend
	} from './friend.js'
	import {
		queryVisit
	} from "/pages/common/util/api.js"
	import {
		relativeTime
	} from "/pages/common/util/common.js"

	// 数据
	let userId = ref(uni.getStorageSync("user").userId)
	let users = ref(null)

	onLoad(async (e) => {
		uni.setNavigationBarTitle({
			title: e.keyword
		})
		if (e.userId) {
			userId.value = e.userId
		}
		if (e.keyword === '关注') {
			const res = await getFriend(`/friend/attention?userId=${userId.value}`)
			if (res.data.code === 200) {
				users.value = res.data.data
			}
			return;
		}
		if (e.keyword === '粉丝') {
			const res = await getFriend(`/friend/fans?userId=${userId.value}`)
			if (res.data.code === 200) {
				users.value = res.data.data
			}
			return;
		}
		if (e.keyword === '互关') {
			const res = await getFriend(`/friend/attentionAndFans?userId=${userId.value}`)
			if (res.data.code === 200) {
				users.value = res.data.data
			}
			return;
		}
		if (e.keyword === '最近访问') {
			users.value = await queryVisit()
		}
	})
	
	// 去到用户主页
	const onClick = (userId) => {
		uni.navigateTo({
			url: `/pages/my/myIndex/myIndex?role=other&permission=read&userId=${userId}`
		})
	}
</script>

<style lang="less" scoped>
	.friend {
		width: 100vw;
		height: 100vh;

		.scroll {
			width: 100%;
			height: 100%;
		}
	}
</style>