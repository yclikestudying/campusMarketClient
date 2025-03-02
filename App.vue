<script setup>
	import Socket from "/pages/common/util/socket.js"
	import { onLaunch } from '@dcloudio/uni-app';
	
	const sockets = {}; // 用来存储所有用户的socket实例
	
	onLaunch(() => {
	  // 将 globalData 挂载到全局
	  const app = getApp();
	  if (!app.globalData) {
	    app.globalData = {};
	  }
	  app.globalData.sockets = sockets;
	});
	
	uni.$on('websocketMessage', (message) => {
		const data = JSON.parse(message)
		// 判断当前用户是不是发送者
		if (uni.getStorageSync("user").userId === data.sendUserId) {
			// 是发送者，那么更新发送者的聊天记录
			uni.$emit("updateMessage")
		} else {
			// 不是发送者，判断当前用户是否连接服务器
			let socket = getApp().globalData.sockets[`${data.acceptUserId}`]
			if (socket.getIsConnected()) {
				// 连接服务器，那么判断当前用户是否在与发送者的聊天页面
				if (socket.getOneByOne() === data.sendUserId) {
					uni.$emit("updateMessage")
				}
			}
			// 没有连接服务器就算了
		}
	});
</script>

<style>
	view {
		box-sizing: border-box;
	}
</style>
