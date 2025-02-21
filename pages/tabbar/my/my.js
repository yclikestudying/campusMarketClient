import {
	ref
} from "vue"
import {
	request,
	requestPromise
} from "/pages/common/util/request.js"

//数据
export let userAvatar = ref(''); // 用户头像
export let userName = ref(''); // 用户名称
export let isAdmin = ref(0); // 管理员
export let articleCount = ref(0); // 动态数量
export let attentionFansCount = ref(0); // 互关数量
export let attentionCount = ref(0); // 关注数量
export let fansCount = ref(0); // 粉丝数量

// 查询动态数量
export const getArticleCount = async () => {
	return await requestPromise("/article/articleCount", "GET", null)
}

// 查询互关数量
export const getAttentionFansCount = async () => {
	return await requestPromise("/friend/attentionAndFansCount", "GET", null)
}

// 查询关注数量
export const getAttentionCount = async () => {
	return await requestPromise("/friend/attentionCount", "GET", null)
}

// 查询粉丝数量
export const getFansCount = async () => {
	return await requestPromise("/friend/fansCount", "GET", null)
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