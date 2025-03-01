import {
	request,
	requestPromise,
	singleFile
} from "/pages/common/util/request.js"
// ============================ 点赞模块 =================================
/**
 * @description 取消点赞
 * @param articleId 动态id
 * @param publishUserId 动态发表者id
 */
export const unlike = async (articleId, publishUserId) => {
	return await request(`/likes/unlike?articleId=${articleId}&userId=${publishUserId}`, "PUT", null)
}

/**
 * @description 取消点赞后续对缓存的操作
 * @param articles 动态集合
 * @param articleId 动态id
 * @param userId 点赞人id
 */
export const unlikeAfter = (articles, articleId, userId) => {
	articles.forEach(article => {
		if (article.articleId === articleId) {
			article.like.articleUserVOList = article.like.articleUserVOList.filter(user => user.userId !==
				userId)
			article.like.count--
		}
	})
	uni.showToast({
		title: "取消成功"
	})
}

/**
 * @description 点赞
 * @param articleId 动态id
 * @param publishUserId 动态发表者id
 */
export const like = async (articleId, publishUserId) => {
	return await request(`/likes/like?articleId=${articleId}&userId=${publishUserId}`, "PUT", null)
}

/**
 * @description 点赞后续对缓存的操作
 * @param articles 动态集合
 * @param articleId 动态id
 * @param myInfo 点赞人信息
 */
export const likeAfter = (articles, articleId, myInfo) => {
	articles.forEach(article => {
		if (article.articleId === articleId) {
			if (!article.like.articleUserVOList) {
				article.like.articleUserVOList = []
			}
			article.like.articleUserVOList.push(myInfo)
			article.like.count++
		}
	})
	uni.showToast({
		title: "点赞成功"
	})
}

/**
 * @description 判断自己是否点赞
 * @param articles 动态集合
 * @param articleId 动态id
 * @param otherId 动态发表者id
 */
export const isLikeInList = (articles, articleId, id) => {
	for (let article of articles) {
		if (article.articleId === articleId && article.like.articleUserVOList) {
			for (let user of article.like.articleUserVOList) {
				if (user.userId === id) {
					return true;
				}
			}
		}
	}
	return false;
}

/**
 * @description 判断自己是否点赞
 * @param article 动态
 * @param otherId 动态发表者id
 */
export const isLike = (article, id) => {
	if (article.like.articleUserVOList) {
		for (let user of article.like.articleUserVOList) {
			if (user.userId === id) {
				return true;
			}
		}
	}
	return false;
}

// ============================ 动态模块 =================================
/**
 * @description 获取关注用户动态
 */
export const getAttentionArticle = async () => {
	return await requestPromise("/article/queryArticleOfAttention", "GET", null)
}

/**
 * @description 获取校园动态
 */
export const getSchoolArticle = async () => {
	return await requestPromise("/article/queryArticleOfSchool", "GET", null)
}

/**
 * @description 获取一个用户动态
 * @param userId 用户id
 */
export const getUserArticle = async (userId) => {
	let url = userId === null ? `/article/queryArticleByUserId` :
		`/article/queryArticleByUserId?userId=${userId}`
	return await requestPromise(url, "GET", null)
}

/**
 * @description 删除动态
 * @param articleId 动态id
 */
export const deleteArticle = async (articleId) => {
	return await request(`/article/deleteArticleByArticleId?articleId=${articleId}`, "DELETE", null)
}

/**
 * @description 删除动态后续缓存操作
 * @param articles 动态集合
 * @param articleId 动态id
 */
export const deleteArticleAfter = (articles, articleId) => {
	return articles.filter(article => article.articleId !== articleId)
}

// ============================ 搜索模块 =================================
/**
 * @description 搜索用户模块
 * @param content 搜索关键字
 */
export const searchUser = async (content) => {
	return await request(`/userInfo/queryLikeUser?keyword=${content}`, "GET", null)
}

// ============================ 用户模块 =================================
/**
 * @description 获取关注数量
 * @param userId 用户id
 */
export const getAttention = async (userId) => {
	let url = userId === null ? `/friend/attention` : `/friend/attention?userId=${userId}`
	return await requestPromise(url, "GET", null)
}

/**
 * @description 获取粉丝数量
 * @param userId 用户id
 */
export const getFans = async (userId) => {
	let url = userId === null ? `/friend/fans` : `/friend/fans?userId=${userId}`
	return await requestPromise(url, "GET", null)
}

/**
 * @description 获取用户信息
 * @param userId 用户id
 */
export const getUserInfo = async (userId) => {
	let url = userId === null ? `/userInfo/getUserInfoByUserId` :
		`/userInfo/getUserInfoByUserId?userId=${userId}`
	return await requestPromise(url, "GET", null)
}

/**
 * @description 查询当前用户是否被我关注
 * @param fansList 当前用户的粉丝集合
 * @param myId 我的id
 */
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

/**
 * @description 关注用户
 * @paam myId 我的id
 * @paam otherId 被关注用户的id
 */
export const attentionUser = async (myId, otherId) => {
	return await request(`/friend/attentionUser?userId=${myId}&otherId=${otherId}`, "PUT", null)
}

/**
 * @description 关注用户成功后续对缓存的操作
 * @paam fansList 当前用户的粉丝集合
 * @paam myInfo 关注当前用户的用户信息
 */
export const attentionUserAfter = (fansList, myInfo) => {
	fansList.push(myInfo)
}

/**
 * @description 取消关注用户
 * @paam myId 我的id
 * @paam otherId 被关注用户的id
 */
export const unattentionUser = async (myId, otherId) => {
	return await request(`/friend/unAttentionUser?userId=${myId}&otherId=${otherId}`, "PUT", null)
}

/**
 * @description 取消关注用户成功后续对缓存的操作
 * @paam fansList 当前用户的粉丝集合
 * @paam myInfo 关注当前用户的用户信息
 */
export const unattentionUserAfter = (fansList, myInfo) => {
	return fansList.filter(fan => fan.userId !== myInfo.userId)
}

/**
 * @description 用户退出登录
 */
export const logout = () => {
	return request(`/user/logout`, "DELETE", null)
}

/**
 * @description 记录访客记录
 * @param userId 被访问者的id
 */
export const visitLog = (userId) => {
	return requestPromise(`/visit/addVisit?visitedId=${userId}`, "PUT", null)
}

/**
 * @description 查询访客记录
 * @param userId 当前登录用户的id
 */
export const queryVisit = (userId) => {
	return requestPromise('/visit/queryVisit', "GET", null)
}

// ============================ 文件上传模块 =================================
/**
 * @description 上传单个文件
 * @paam file 文件对象
 */
export const uploadSingleFile = async (file) => {
	return await singleFile("/message/uploadImage", file)
}

// ============================ 聊天记录模块 =================================
/**
 * @description 查询聊天记录
 * @paam otherId 单聊对面用户id
 */
export const queryChatMessage = async (otherId) => {
	return await requestPromise(`/message/queryMessage?otherId=${otherId}`, "GET", null)
}

/**
 * @description 把聊天记录标为已读
 * @paam otherId 单聊对面用户id
 */
export const read = async (otherId) => {
	return await requestPromise(`/message/read?otherId=${otherId}`, "PUT", null)
}