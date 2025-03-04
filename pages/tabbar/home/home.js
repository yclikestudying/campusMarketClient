// 去到其他页面
export const toOtherPage = (name, role, permission, param, type, id) => {
	const routes = {
		"image": `/pages/image/image?role=${role}&permission=${permission}&type=${type}`,
		"myIndex": `/pages/my/myIndex/myIndex?role=${role}&permission=${permission}&userId=${param}`,
		"article": `/pages/article/article?role=${role}&permission=${permission}`,
		"search": "/pages/home/search/search",
		'chat': `/pages/message/chat/chat?role=${role}&permission=${permission}&goodsId=${id}`,
		'goods': `/pages/goods/goods?goodsId=${param}`
	}

	if (name === 'image') {
		uni.setStorageSync("image", param)
	}
	
	if (name === 'article') {
		uni.setStorageSync("article", param)
	}
	
	if (name === 'chat') {
		uni.setStorageSync("chatUser", param)
	}

	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}