<template>
	<view class="chat">
		<view class="content">
			<scroll-view scroll-y="true" class="chat-content" :scroll-into-view="scrollIntoId">
				<image src="/static/my/backgroundImage.jpg" mode=""></image>
				<template v-if="messages !== null" v-for="(message, index) in messages">
					<view class="date">
						<text>{{ relativeTime(message.createTime) }}</text>
					</view>
					<view :id="index === messages.length - 1 ? `message${index}` : ''"
						:class="{user: true, me: userId === message.userId}">
						<view class="image">
							<image :src="message.userAvatar" mode=""></image>
						</view>
						<view class="message">
							<text>{{ message.content }}</text>
						</view>
					</view>
				</template>
			</scroll-view>
			<view class="input">
				<uni-easyinput class="uni-mt-5" v-model="content" trim="all" placeholder="请输入内容"></uni-easyinput>
				<text @click="send">发送</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		scrollIntoId,
		content,
		messages,
		send
	} from "./chat.js"
</script>

<style lang="less" scoped>
	@import url("./chat.css");
</style>