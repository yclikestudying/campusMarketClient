// 去到其他页面
export const toOtherPage = (name, role, permission, param, type) => {
	const routes = {
		"image": `/pages/image/image?role=${role}&permission=${permission}&type=${type}`,
		"myIndex": `/pages/my/myIndex/myIndex?role=${role}&permission=${permission}&userId=${param}`
	}

	if (name === 'image') {
		uni.setStorageSync("image", param)
	}

	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}