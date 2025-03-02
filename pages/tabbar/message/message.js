
// 去到其他页面
export const toOtherPage = (name, role, permission, param) => {
	console.log('点击')
	const routes = {
		'chat': `/pages/message/chat/chat?role=${role}&permission=${permission}`
	}
	
	if (name === 'chat') {
		uni.setStorageSync("chatUser", param)
	}
	
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}
