import {
	ref
} from 'vue';
import {
	request,
	requestPromise
} from "/pages/common/util/request.js"

// 数据
export let role = ref(null); // 角色
export let permission = ref(null); // 权限
export let currentOption = ref(1)
export let isScroll = ref(false)
export let user = ref(null); // 用户信息
export let articles = ref(null); // 文章动态
export let attentionCount = ref(null); // 关注数量
export let fansCount = ref(null); // 粉丝数量
export let likeMap = ref(null); // 动态点赞map

// 获取文章点赞数
export const getArticleLike = async (url) => {
	return await requestPromise(url, "GET", null)
}

// 获取关注数量
export const getAttentionCount = async (url) => {
	return await requestPromise(url, "GET", null)
}

// 获取粉丝数量
export const getFansCount = async (url) => {
	return await requestPromise(url, "GET", null)
}

// 获取用户动态
export const getArticle = async (url) => {
	return await requestPromise(url, "GET", null)
}


// 点击设置菜单
export const setCurrentOption = (index) => {
	currentOption.value = index
}

// 滑动设置菜单
export const onSwiperChange = (e) => {
	currentOption.value = e.detail.current
}

// 监听滚动
export const scroll = (e) => {
	isScroll.value = e.detail.scrollTop > 325 ? true : false
}

// 去到其他页面
export const toOtherPage = (name) => {
	const routes = {
		"edit": "/pages/my/info/info?user=user&permission=update"
	}
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}