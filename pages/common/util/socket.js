let socketTask = null;
let isConnected = false; // 用户是否连接服务器
let reconnectTimer = null;
const reconnectInterval = 5000; // 重连间隔时间
let count = 0;
let oneByOne = null; // 记录用户一对一聊天时是否在聊天页面

const Socket = {
  // 初始化 WebSocket 连接
  connect(url) {
    if (socketTask && isConnected) {
      console.log('WebSocket 已经连接');
      return;
    }

    socketTask = uni.connectSocket({
      url: url,
      success: () => {
        console.log('WebSocket 连接成功');
      },
      fail: (err) => {
        console.error('WebSocket 连接失败', err);
        this.reconnect(url);
      }
    });

    socketTask.onOpen(() => {
      console.log('WebSocket 已打开');
      isConnected = true;
      clearTimeout(reconnectTimer);
    });

    socketTask.onMessage((res) => {
      this.handleMessage(res.data);
    });

    socketTask.onClose(() => {
      console.log('WebSocket 已关闭');
      isConnected = false;
      this.reconnect(url);
    });

    socketTask.onError((err) => {
      console.error('WebSocket 发生错误', err.errMsg);
      isConnected = false;
      this.reconnect(url);
    });
  },

  // 处理收到的消息
  handleMessage(message) {
    // 例如：触发全局事件、更新状态等
    uni.$emit('websocketMessage', message);
  },

  // 发送消息
  send(message, userId, otherUserId, userAvatar, userName) {
    if (socketTask && isConnected) {
      socketTask.send({
        data: JSON.stringify({"message": message, "userId": userId, "otherUserId": otherUserId, "userAvatar": userAvatar, "userName": userName}),
        success: () => {
          console.log('消息发送成功');
        },
        fail: (err) => {
          console.error('消息发送失败', err);
        }
      });
    } else {
      console.error('WebSocket 未连接，无法发送消息');
    }
  },

  // 关闭 WebSocket 连接
  close() {
    if (socketTask) {
      socketTask.close({
        success: () => {
          isConnected = false;
        },
        fail: (err) => {
          console.error('WebSocket 关闭失败', err);
        }
      });
    }
  },

  // 重连机制
  reconnect(url) {
    if (isConnected) return;
	
	count++
	if (count === 5) {
		console.log('取消重连')
		count = 0
		return;
	}
	console.log(`第${count}次重新连接`)
	uni.showToast({
		title: "正在与服务器进行连接",
		icon: "none"
	})
    clearTimeout(reconnectTimer);

    reconnectTimer = setTimeout(() => {
      this.connect(url);
    }, reconnectInterval);
  },
  
  // 获取用户连接状态，是否连接
  getIsConnected() {
	  return isConnected
  },
  
  // 设置当前用户一对一聊天时是否在聊天页面
  setOneByOne(userId) {
	  oneByOne = userId
  },
  
  // 获取当前用户一对一聊天时是否在聊天页面
  getOneByOne() {
	  return oneByOne;
  }
};

export default Socket;