import {
	request,
	requestPromise
} from "/pages/common/util/request.js"
// ============================ 点赞模块 =================================
/**
 * @description 取消点赞
 * @param articleId 动态id
 * @param otherId 动态发表者id
 */
export const unlike = async (articleId, otherId) => {
	return await request(`/likes/unlike?articleId=${articleId}&userId=${otherId}`, "PUT", null)
}

/**
 * @description 点赞
 * @param articleId 动态id
 * @param otherId 动态发表者id
 */
export const like = async (articleId, otherId) => {
	return await request(`/likes/like?articleId=${articleId}&userId=${otherId}`, "PUT", null)
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