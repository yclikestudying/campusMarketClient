// 去到其他页面
export const toOtherPage = (name, role, permission, param, type) => {
	const routes = {
		"info": `/pages/my/info/info?role=${role}&permission=${permission}`,
		"image": `/pages/image/image?role=${role}&permission=${permission}&type=${type}`,
		"article": `/pages/article/article?role=${role}&permission=${permission}`,
		'chat': `/pages/message/chat/chat?role=${role}&permission=${permission}`,
		// "attention": `/pages/my/friend/friend?keyword=关注&userId=${param}`,
		// "fans": `/pages/my/friend/friend?keyword=粉丝&userId=${param}`
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