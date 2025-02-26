import {
	request,
	requestPromise
} from "/pages/common/util/request.js"

// 去到其他页面
export const toOtherPage = (name, role, permission, param, type) => {
	const routes = {
		"image": `/pages/image/image?role=${role}&permission=${permission}&type=${type}`,
		"myIndex": `/pages/my/myIndex/myIndex?role=${role}&permission=${permission}&userId=${param}`,
		"article": `/pages/article/article?role=${role}&permission=${permission}`
	}

	if (name === 'image') {
		uni.setStorageSync("image", param)
	}
	
	if (name === 'article') {
		uni.setStorageSync("article", param)
	}

	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}