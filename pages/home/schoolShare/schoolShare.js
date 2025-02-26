import {
	ref
} from "vue";

import {
	moreFile,
	request
} from "/pages/common/util/request.js"

// 数据
export let fileLists = ref([])
export let text = ref('')
export let isLoading = ref(false)

// 选择图片后触发
export const onSelect = (event) => {
	event.tempFiles.forEach(tempFile => {
		fileLists.value.push(tempFile.file.path)
	})
}

// 图片从列表中删除
export const onDelete = (event) => {
	fileLists.value.splice(event.index, 1)
}

// 上传文件
export const onSubmit = async () => {
	isLoading.value = true
	try {
		// 单独上传文本
		if (fileLists.value.length === 0) {
			const res = await request(`/article/uploadArticle?text=${text.value}`, "POST", null)
			if (res.data.code === 200) {
				uni.navigateBack()
				uni.showToast({
					title: "上传成功"
				})
				text.value = ''
			}	
			return;
		}
		// 上传图片或上传文本和图片
		const files = fileLists.value.map((file, index) => {
			return {
				name: `file${index}`,
				uri: file
			}
		})
		const res = await moreFile("/article/uploadArticle", files, text.value)
		if (JSON.parse(res.data).code === 200) {
			uni.navigateBack()
			uni.showToast({
				title: "上传成功"
			})
			fileLists.value.length = 0
			text.value = ''
		}
	} catch(err) {
		console.log(err)
	} finally {
		isLoading.value = false
	}
}