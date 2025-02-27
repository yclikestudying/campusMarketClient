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
	.chat {
		width: 100vw;
		height: 100vh;
	
		.content {
			width: 100%;
			height: 100%;
	
			.chat-content {
				position: relative;
				width: 100%;
				height: calc(100% - 50px);
				
				image {
					position: absolute;
					width: 100%;
					height: 100%;
				}
	
				.date {
					width: 100%;
					text-align: center;
	
					text {
						font-size: 12px;
					}
				}
	
				.user {
					width: 100%;
					display: flex;
					margin-top: 10px;
					padding: 0 10px;
	
					.image {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						overflow: hidden;
	
						image {
							width: 100%;
							height: 100%;
							object-fit: contain;
						}
					}
	
					.message {
						border-radius: 5px;
						margin: 0 10px;
						max-width: 250px;
						padding: 5px 10px;
						background-color: white;
					}
				}
	
				.me {
					display: flex;
					flex-flow: row-reverse;
	
					.message {
						background-color: limegreen;
					}
				}
			}
	
			.input {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				padding: 0 10px;
				
				.uni-mt-5 {
					caret-color: deepskyblue;
				}
	
				text {
					margin-left: 5px;
				}
			}
		}
	}
</style>