// 跳转到其他页面
export const toOtherPage = (name) => {
	const routes = {
		"主页": "/pages/my/myIndex/myIndex"
	}
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}