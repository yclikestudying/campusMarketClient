
// 去到其他地方
export const toOtherPage = (name, param, role) => {
	if (role === 'me') {
		const routes = {
			"username": `/pages/info/username/username?param=${param}`,
			"birthday": `/pages/info/birthday/birthday?param=${param}`,
			"profile": `/pages/info/profile/profile?param=${param}`,
			"location": `/pages/info/location/location?param=${param}`,
			"homeTown": `/pages/info/homeTown/homeTown?param=${param}`,
			"profession": `/pages/info/profession/profession?param=${param}`,
			"tag": `/pages/info/tag/tag?param=${param}`,
			"gender": `/pages/info/gender/gender?param=${param}`
		}
		const url = routes[`${name}`]
		uni.navigateTo({
			url: url
		})
	}
}