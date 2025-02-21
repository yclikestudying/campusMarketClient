import {
	ref
} from 'vue';
import {
	relativeTime
} from '../../common/util/common.js'
import socket from "../../common/util/socket.js"

// 数据
export let currentOption = ref(0)

// 设置新的currentOption
export const setCurrentOption = (index) => {
	currentOption.value = index
}

// 切换页面
export const onSwiperChange = (event) => {
	currentOption.value = event.detail.current
}

// 去到其他页面
export const toOtherPage = (name) => {
	console.log('点击')
	const routes = {
		"chat": "/pages/message/chat/chat"
	}
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}
