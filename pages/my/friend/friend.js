import {
	request
} from "/pages/common/util/request.js"

// 查询互关或关注或粉丝
export const getFriend = async (url) => {
	return await request(url, "GET", null)
}