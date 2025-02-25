import {
	ref
} from "vue"
import {
	request,
	requestPromise
} from "/pages/common/util/request.js"

// 查询动态数量
export const getArticle = async () => {
	return await requestPromise("/article/queryArticleByUserId", "GET", null)
}

// 查询互关数量
export const getAttentionFans = async () => {
	return await requestPromise("/friend/attentionAndFans", "GET", null)
}

// 查询关注数量
export const getAttention = async () => {
	return await requestPromise("/friend/attention", "GET", null)
}

// 查询粉丝数量
export const getFans = async () => {
	return await requestPromise("/friend/fans", "GET", null)
}

// 跳转到其他页面
export const toOtherPage = (name) => {
	const routes = {
		"myIndex": "/pages/my/myIndex/myIndex?role=me&permission=update",
		"attentionFans": "/pages/my/friend/friend?keyword=互关",
		"attention": "/pages/my/friend/friend?keyword=关注",
		"fans": "/pages/my/friend/friend?keyword=粉丝",
		"setting": "/pages/my/setting/setting",
		"article": "/pages/my/myIndex/myIndex?role=me&permission=update"
	}
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}