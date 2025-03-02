<template>
	<view class="chat">
		<view class="content">
			<scroll-view scroll-y="true" :scroll-with-animation="isLoading" class="chat-content"
				:scroll-into-view="scrollIntoId">
				<template v-if="messages !== null" v-for="(message, index) in messages">
					<view class="date">
						<text>{{ index === 0 ? relativeTime(message.createTime) : (message.createTime === messages[index - 1].createTime ? '' : relativeTime(message.createTime)) }}</text>
					</view>
					<view :id="index === messages.length - 1 ? `message${index}` : ''"
						:class="{user: true, me: message.sendUserId === myId}">
						<view class="image">
							<image class="avatar" lazy-load="true"
								:src="message.sendUserId === myId ? myAvatar : otherAvatar" mode=""></image>
						</view>
						<view v-if="message.type === 'text'" class="message">
							<text>{{ message.content }}</text>
						</view>
						<view v-else class="messageImage"
							@click="toOtherPage('image', role, permission, message.content, 'image')">
							<image lazy-load="true" :src="message.content" mode="widthFix"></image>
						</view>
					</view>
				</template>
			</scroll-view>
			<view class="input">
				<uni-icons type="image" size="30" @click="sendImage"></uni-icons>
				<uni-easyinput class="uni-mt-5" v-model="content" trim="all" placeholder="请输入内容"></uni-easyinput>
				<text @click="send('text')">发送</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		relativeTime
	} from "/pages/common/util/common.js"
	import {
		uploadSingleFile,
		queryChatMessage,
		read
	} from "/pages/common/util/api.js"

	// 数据
	let role = ref(null); // 用户角色
	let permission = ref(null); // 用户权限
	let myId = ref(uni.getStorageSync("user").userId); // 我的id
	let myAvatar = ref(uni.getStorageSync("user").userAvatar); // 我的头像
	let otherId = ref(uni.getStorageSync("chatUser").userId); // 当前聊天用户id
	let otherAvatar = ref(uni.getStorageSync("chatUser").userAvatar)
	let title = ref(uni.getStorageSync("chatUser").userName)
	let scrollIntoId = ref('');
	let content = ref(''); // 发送的消息内容
	let messages = ref(null); // 聊天记录
	let isLoading = ref(false); // 是否开启动画滚动
	let socket = getApp().globalData.sockets[`${myId.value}`]; // websocket实例

	onLoad(async (e) => {
		role.value = e.role
		permission.value = e.permission
		uni.setNavigationBarTitle({
			title: title.value
		})


		const [res1, res2] = await Promise.all([
			// 查询聊天记录
			queryChatMessage(otherId.value),
			// 把消息标为已读
			read(otherId.value)
		])
		// 查询聊天记录
		messages.value = res1  
		scrollIntoId.value = `message${messages.value.length - 1}`
		// 记录当前用户的id
		socket.setOneByOne(otherId.value)
	})

	watch(messages, (value) => {
		scrollIntoId.value = `message${value.length - 1}`
	})

	// 发送文本消息
	const send = (type) => {
		socket.send(JSON.stringify({
			content: content.value,
			sendUserId: myId.value,
			acceptUserId: otherId.value,
			type: type
		}))
		content.value = ''
	}

	// 发送图片
	const sendImage = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: async (res) => {
				try {
					const res1 = await uploadSingleFile(res.tempFilePaths[0])
					const data = JSON.parse(res1.data)
					if (data.code === 200) {
						content.value = data.data
						send('image')
					}
				} catch (err) {
					console.log(err)
				}
			}
		});
	}

	uni.$on("updateMessage", async () => {
		messages.value = await queryChatMessage(otherId.value)
	})

	// 去到其他页面
	const toOtherPage = (name, role, permission, param, type) => {
		const routes = {
			"image": `/pages/image/image?role=${role}&permission=${permission}&type=${type}`
		}

		if (name === 'image') {
			uni.setStorageSync("image", param)
		}

		const url = routes[`${name}`]
		uni.navigateTo({
			url: url
		})
	}
	
	// function relativeTime(timeString) {
	// 	const date1 = new Date(formatDate(timeString)); // 传入的时间
	// 	const date2 = new Date(); // 当前时间
	// 	const diffMs = date2 - date1; // 时间差（毫秒）
	
	// 	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 相差天数
	
	// 	// 星期几的映射
	// 	const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	
	// 	let result;
	
	// 	if (isToday(date1)) {
	// 		// 如果是今天，显示“今天 HH:mm”
	// 		const hours = String(date1.getHours()).padStart(2, '0'); // 补零
	// 		const minutes = String(date1.getMinutes()).padStart(2, '0'); // 补零
	// 		result = `今天 ${hours}:${minutes}`;
	// 	} else if (diffDays === 1) {
	// 		// 昨天
	// 		const yesterdayHours = String(date1.getHours()).padStart(2, '0'); // 昨天的小时数
	// 		const yesterdayMinutes = String(date1.getMinutes()).padStart(2, '0'); // 昨天的分钟数
	// 		result = `昨天 ${yesterdayHours}:${yesterdayMinutes}`;
	// 	} else if (diffDays < 7) {
	// 		// 本周内，显示星期几
	// 		const dayOfWeek = weekDays[date1.getDay()]; // 获取星期几
	// 		const hours = String(date1.getHours()).padStart(2, '0'); // 补零
	// 		const minutes = String(date1.getMinutes()).padStart(2, '0'); // 补零
	// 		result = `${dayOfWeek} ${hours}:${minutes}`;
	// 	} else {
	// 		// 超过一周，显示具体日期
	// 		const year = date1.getFullYear();
	// 		const month = String(date1.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
	// 		const day = String(date1.getDate()).padStart(2, '0'); // 补零
	// 		const hours = String(date1.getHours()).padStart(2, '0'); // 补零
	// 		const minutes = String(date1.getMinutes()).padStart(2, '0'); // 补零
	
	// 		if (date1.getFullYear() === date2.getFullYear()) {
	// 			// 未跨年
	// 			result = `${month}/${day} ${hours}:${minutes}`;
	// 		} else {
	// 			// 跨年
	// 			result = `${year}/${month}/${day} ${hours}:${minutes}`;
	// 		}
	// 	}
	
	// 	return result === currentTime ? '' : (currentTime = result);
	// }
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
				padding-bottom: 10px;
				width: 100%;
				height: calc(100% - 60px);

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

						.avatar {
							width: 100%;
							height: 100%;
							object-fit: contain;
						}
					}

					.message {
						border-radius: 5px;
						margin: 0 10px;
						max-width: 250px;
						padding: 10px;
						background-color: white;
					}

					.messageImage {
						margin: 0 10px;
						width: 150px;
						border-radius: 5px;
						overflow: hidden;

						image {
							width: 100%;
						}
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
				padding: 0 5px;

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