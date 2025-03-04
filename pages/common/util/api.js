import {
	request,
	requestPromise,
	singleFile,
	uploadFile
} from "/pages/common/util/request.js"
// ============================================================= 点赞模块 ============================================================= 
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

// ============================================================= 动态模块 ============================================================= 
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

// ============================================================= 搜索模块 ============================================================= 
/**
 * @description 搜索用户
 * @param content 搜索关键字
 */
export const searchUser = async (content) => {
	return await request(`/userInfo/queryLikeUser?keyword=${content}`, "GET", null)
}

// ============================================================= 用户模块 ============================================================= 
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

// ============================================================= 文件上传模块 ============================================================= 
/**
 * @description 上传单个文件
 * @paam file 文件对象
 */
export const uploadSingleFile = async (file) => {
	return await singleFile("/message/uploadImage", file)
}

// ============================================================= 聊天记录模块 ============================================================= 
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

/**
 * @description 查询聊天消息列表
 */
export const queryMessageList = async () => {
	return await requestPromise(`/message/queryMessageList`, "GET", null)
}

/**
 * @description 查询未读消息数量
 */
export const queryUnReadMessage = async () => {
	return await requestPromise(`/message/queryUnReadMessage`, "GET", null)
}

// ============================================================= 商品模块 ============================================================= 
/**
 * @description 商品上传
 * @param files 图片集合
 * @param textContent 文本内容
 * @param price 价格
 */
export const uploadGoods = async (files, textContent, price) => {
	return await uploadFile('/goods/uploadGoods', files, textContent, price)
}

/**
 * @description 商品上传
 * @param textContent 文本内容
 * @param price 价格
 */
export const uploadText = async (textContent, price) => {
	return await request(`/goods/uploadGoods?text=${textContent}&price=${price}`, "POST", null)
}

/**
 * @description 查询商品
 * @param userId 用户id
 */
export const queryGoods = async (userId) => {
	let url;
	if (userId) {
		url = `/goods/queryGoods?userId=${userId}`
	} else {
		url = '/goods/queryGoods'
	}
	return await requestPromise(url, "GET", null)
}

/**
 * @description 查询所有商品
 * @param userId 用户id
 */
export const queryAllGoods = async () => {
	return await requestPromise(`/goods/queryAllGoods`, "GET", null)
}

/**
 * @description 删除商品
 * @param goodsId 商品id
 */
export const deleteByGoodsId = async (goodsId) => {
	return await request(`/goods/deleteByGoodsId?goodsId=${goodsId}`, "DELETE", null)
}

// ============================================================= 跑腿服务模块 ============================================================= 
/**
 * @description 发布跑腿服务
 * @param content 跑腿服务内容
 * @param price 跑腿服务价格
 */
export const uploadExpress = async (content, price) => {
	return await request(`/express/upload`, "POST", {content: content, price: price})
}

/**
 * @description 查询所有跑腿服务
 */
export const queryAllExpress = async () => {
	return await requestPromise('/express/queryAllExpress', "GET", null)
}

/**
 * @description 查询自己的跑腿服务
 * @Param userId 用户id
 */
export const queryMyExpress = async (userId) => {
	let url;
	if (userId) {
		url = `/express/queryMyExpress?userId=${userId}`
	} else {
		url = '/express/queryMyExpress'
	}
	
	return await requestPromise(url, "GET", null)
}

/**
 * @description 删除自己的跑腿服务
 * @Param expressId 跑腿服务id
 */
export const deleteExpressById = async (expressId) => {
	return await request(`/express/deleteExpress?expressId=${expressId}`, "DELETE", null)
}