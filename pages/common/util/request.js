/**
 * 请求数据接口
 */
// 开发环境访问地址
const baseURL = "http://192.168.128.28:8080"
const token = uni.getStorageSync("token")

/**
 * 请求普通数据
 */
export const request = async (url, method) => {
	return await uni.request({
		url: `${baseURL}${url}`,
		method: method,
		header: {
			"Authorization": token
		}
	})
}

/**
 * 上传文件
 */
export const pushFile = async (url, data, count, textContent) => {
	return await uni.uploadFile({
		url: `${baseURL}${url}`,
		files: data,
		formData: {
			"count": count, // 文件数量
			"text": textContent // 文本内容
		},
		header: {
			"Authorization": token
		}
	})
}