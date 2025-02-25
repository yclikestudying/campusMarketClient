import {
	request
} from "/pages/common/util/request.js"

// 获取关注用户的动态
export const getAttentionArticle = async (url) => {
	return await request(url, "GET", null)
}
