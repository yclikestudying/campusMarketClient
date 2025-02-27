import {
	request,
	requestPromise
} from "/pages/common/util/request.js"

// 查询当前用户是否被我关注
export const isAttention = (fansList, myId) => {
	if (fansList) {
		for (let user of fansList) {
			if (user.userId === myId) {
				return true;
			}
		}
	}
	return false;
}

// 关注用户
export const attentionUser = async (url) => {
	return await request(url, "PUT", null)
}

// 取消关注用户
export const unattentionUser = async (url) => {
	return await request(url, "PUT", null)
}

// 去到其他页面
export const toOtherPage = (name, role, permission, param, type) => {
	const routes = {
		"info": `/pages/my/info/info?role=${role}&permission=${permission}`,
		"image": `/pages/image/image?role=${role}&permission=${permission}&type=${type}`,
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