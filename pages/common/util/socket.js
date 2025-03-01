class WebSocketClient {
  constructor(userId) {
    this.userId = userId;
    this.socketTask = null;
    this.isConnected = false;
    this.reconnectTimer = null;
    this.reconnectInterval = 5000;
	this.oneByOne = null; // 如果处于与哪个用户的聊天页面，那么记录他的id，否则就是null
    this.baseURL = "http://192.168.180.28:8080/wsConnect";
  }

  connect() {
    if (this.socketTask && this.isConnected) {
      console.log('WebSocket 已经连接');
      return;
    }

    this.socketTask = uni.connectSocket({
      url: `${this.baseURL}/${this.userId}`,
      success: () => {
        console.log('WebSocket 连接成功');
      },
      fail: (err) => {
        console.error('WebSocket 连接失败', err);
        this.reconnect();
      }
    });

    this.socketTask.onOpen(() => {
      console.log('WebSocket 已打开');
      this.isConnected = true;
      clearTimeout(this.reconnectTimer);
    });

    this.socketTask.onMessage((res) => {
      this.handleMessage(res.data);
    });

    this.socketTask.onClose(() => {
      console.log('WebSocket 已关闭');
      this.isConnected = false;
    });

    this.socketTask.onError((err) => {
      console.error('WebSocket 发生错误', err.errMsg);
      this.isConnected = false;
      this.reconnect();
    });
  }

  handleMessage(message) {
    uni.$emit('websocketMessage', message);
  }

  send(data) {
    if (this.socketTask && this.isConnected) {
      this.socketTask.send({
        data: data,
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
  }

  close() {
    if (this.socketTask) {
      this.socketTask.close({
        success: () => {
          this.isConnected = false;
        },
        fail: (err) => {
          console.error('WebSocket 关闭失败', err);
        }
      });
    }
  }

  reconnect() {
    if (this.isConnected) return;

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  }
  
  getOneByOne() {
	  return this.oneByOne
  }
  
  setOneByOne(id) {
	  this.oneByOne = id
  }
  
  getIsConnected() {
	  return this.isConnected
  }
}

export default WebSocketClient;