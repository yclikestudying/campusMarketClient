import {
	ref
} from "vue";
import {
	request
} from "/pages/common/util/request.js"

// 数据
export let placeholder = ref('输入新用户名')
export let userName = ref('')

// 提交修改
export const onSubmit = async () => {
	if (userName.value.length === 0) {
		uni.showToast({
			title: "用户名不能为空",
			icon: "none"
		})
		return;
	}
	const res = await request("/userInfo/updateUser", "PUT", {
		'key': 'userName',
		'value': userName.value
	})
	if (res.data.code === 200) {
		uni.showToast({
			title: "修改成功"
		})
		// 重新查询用户信息
		const res = await request("/userInfo/getUserInfoByUserId", "GET", null)
		if (res.data.code === 200) {
			uni.setStorageSync("user", res.data.data)
		}

		uni.navigateBack()
	}
}