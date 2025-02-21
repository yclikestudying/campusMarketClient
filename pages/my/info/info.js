import { ref } from "vue";

/**
 * 数据
 */
export let role = ref('') // 用户角色
export let permission = ref('') // 用户权限
export let user = ref(null); // 用户信息


/**
 * 方法
 */
export const toOtherPage = (name) => {
	const routes = {
		"username": "/pages/info/username/username",
		"birthday": "/pages/info/birthday/birthday",
		"profile": "/pages/info/profile/profile",
		"location": "/pages/info/location/location",
		"homeTown": "/pages/info/homeTown/homeTown",
		"profession": "/pages/info/profession/profession",
		"tag": "/pages/info/tag/tag",
		"gender": "/pages/info/gender/gender"
	}
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}