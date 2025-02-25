
// 去到其他页面
export const toOtherPage = (name) => {
	console.log('点击')
	const routes = {
		"chat": "/pages/message/chat/chat"
	}
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}
