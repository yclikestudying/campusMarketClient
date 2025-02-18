import {
	ref
} from 'vue';

// 数据
export let currentOption = ref(0)
export let isScroll = ref(false)


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