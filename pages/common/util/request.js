/**
 * 请求数据接口
 */
// 开发环境访问地址
const baseURL = "http://192.168.41.28:8080"

/**
 * 请求普通数据
 */
export const request = async (url, method, data) => {
	return await uni.request({
		url: `${baseURL}${url}`,
		method: method,
		data: data,
		header: {
			"Authorization": uni.getStorageSync("token")
		}
	})
}

/**
 * 并发请求
 */
export const requestPromise = async (url, method, data) => {
	return await new Promise((resolve, reject) => {
		uni.request({
			url: `${baseURL}${url}`,
			method: method,
			data: data,
			header: {
				"Authorization": uni.getStorageSync("token")
			},
			success: (res) => {
				resolve(res.data.data)
			}
		})
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
			"Authorization": uni.getStorageSync("token")
		}
	})
}