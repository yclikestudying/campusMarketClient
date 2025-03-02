import {
	ref,
	watch
} from 'vue'
import {
	request
} from "/pages/common/util/request.js"
import WebSocketClient from "/pages/common/util/socket.js"
import {
	queryUnReadMessage
} from "/pages/common/util/api.js"

// 数据变量
export let phoneNumber = ref('17823257046'); // 手机号码
export let password = ref('111111'); // 密码
export let checkPassword = ref(''); // 验证密码
export let currentState = ref("login"); // 当前状态处于登录
export let clearImageEl = null; // 清除手机号图标DOM元素
export let isClearImageShow = ref(true); // 清除图标是否显示
export let loading = ref(false)

// 对输入框进行侦听
watch(phoneNumber, (value) => {
	// 清除图标是否显示
	value.length !== 0 ? isClearImageShow.value = false : isClearImageShow.value = true
})

// 清除手机号码
export const onClearPhoneNumber = () => {
	phoneNumber.value = ""
}

// 登录还是注册
export const onLogin = (state) => {
	state === "register" ? currentState.value = "register" : currentState.value = "login"
}

// 登录注册提交
export const onSubmit = async () => {
	// 开启加载状态
	loading.value = true
	try {
		if (currentState.value === 'login') {
			const res = await request("/user/phoneLogin", "POST", {phone: phoneNumber.value, password: password.value})
			const data = res.data
			if (data.code === 200) {
				// token存入本地缓存
				uni.setStorageSync("token", data.data.token)
				// 用户信息存入本地缓存
				uni.setStorageSync("user", data.data.user)
				// 连接服务器
				const socket = new WebSocketClient(data.data.user.userId)
				socket.connect()
				// 把这个实例存储到本地
				const app = getApp()
				app.globalData.sockets[`${data.data.user.userId}`] = socket
				// 跳转到主页
				uni.switchTab({
					url: "/pages/tabbar/home/home"
				})
				
				const count = await queryUnReadMessage()
				if (count !== 0) {
					uni.setTabBarBadge({
						index: 2,
						text: `${count}`
					})
				}		
			} else {
				uni.showToast({
					title: data.message,
					icon: "none"
				})
			}
		} else {
			const res = await request("/user/phoneRegister", "POST", {phone: phoneNumber.value, password: password.value, checkPassword: checkPassword.value})
			const data = res.data
			if (data.code === 200) {
				// 切换到登录页面
				currentState.value = 'login'
				uni.showToast({
					title: data.message
				})
			} else {
				uni.showToast({
					title: data.message,
					icon: "none"
				})
			}
		}
	} catch(err) {
		console.log(err)
	} finally {
		// 关闭加载状态
		loading.value = false
	}
}