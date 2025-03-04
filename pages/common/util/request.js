/**
 * 请求数据接口
 */
// 开发环境访问地址
const baseURL = "http://192.168.180.28:8080"

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
 * 上传不带内容的文件
 */
export const singleFile = async (url, filePath) => {
	return await uni.uploadFile({
		url: `${baseURL}${url}`,
		filePath: filePath, 
		name: "file",
		header: {
			"Authorization": uni.getStorageSync("token")
		}
	});
}

/**
 * 上传带一个内容的文件
 */
export const moreFile = async (url, files, textContent) => {
	return await uni.uploadFile({
		url: `${baseURL}${url}`,
		files: files,
		formData: {
			"text": textContent // 文本内容
		},
		header: {
			"Authorization": uni.getStorageSync("token")
		}
	})
}

/**
 * @description 上传带两个内容的文件
 */
export const uploadFile = async (url, files, textContent, price) => {
	return await uni.uploadFile({
		url: `${baseURL}${url}`,
		files: files,
		formData: {
			"text": textContent ,// 文本内容
			"price": price
		},
		header: {
			"Authorization": uni.getStorageSync("token")
		}
	})
}