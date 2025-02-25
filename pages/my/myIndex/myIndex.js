import {
	request,
	requestPromise
} from "/pages/common/util/request.js"


// 动态点赞
export const artilceLike = async (articleId, myId) => {
	return await request(`/likes/like?articleId=${articleId}&userId=${myId}`, "PUT", null)
}

// 取消动态点赞
export const unArticleLike = async (articleId, myId) => {
	return await request(`/likes/unlike?articleId=${articleId}&userId=${myId}`, "PUT", null)
}

// 删除动态
export const deleteArticle = async (url) => {
	return await request(url, "DELETE", null)
}

// 判断当前用户是否点赞自己的动态
export const isLike = (articles, articleId, id) => {
	for (let article of articles) {
		if (article.articleId === articleId) {
			if (article.like.articleUserVOList) {
				for (let user of article.like.articleUserVOList) {
					if (user.userId === id) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

// 获取用户动态相关信息
export const getArticle = async (url) => {
	return await requestPromise(url, "GET", null)
}

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

// 获取关注数量
export const getAttention = async (url) => {
	return await requestPromise(url, "GET", null)
}

// 获取粉丝数量
export const getFans = async (url) => {
	return await requestPromise(url, "GET", null)
}

// 获取用户信息
export const getUserInfo = async (url) => {
	return await requestPromise(url, "GET", null)
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