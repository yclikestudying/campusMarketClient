import {
	ref,
	computed
} from "vue"
import {
	onShow
} from "@dcloudio/uni-app"

/**
 * 数据
 */
export let opacity = ref(0)
export let isScroll = ref(false)
export let currentMenu = ref(0) // 菜单
export const background = computed(() => {
	return {
		opacity: `${opacity.value}`
	}
})
export let isExtend = ref(false)
export let horizontal = ref('right')
export let vertical = ref('bottom')
export let direction = ref('horizontal')
export let pattern = ref({
	color: '#7A7E83',
	backgroundColor: '#fff',
	selectedColor: '#007AFF',
	buttonColor: '#FEE802',
	iconColor: '#fff'
})
export let content = ref([{
		iconPath: '/static/home/校园圈子.png',
		text: '校园动态',
		active: false
	},
	{
		iconPath: '/static/home/商品.png',
		text: '二手集市',
		active: false
	},
	{
		iconPath: '/static/home/快递.png',
		text: '快递代取',
		active: false
	}
])

/**
 * 方法
 */
// 点击浮动图标
export const fabClick = () => {
	isExtend.value = true
}

// 点击浮动图标里面的选项
export const trigger = (event) => {
	const routes = {
		0: "/pages/home/schoolShare/schoolShare",
		1: "/pages/home/goodsMarket/goodsMarket",
		2: "/pages/home/express/express"
	}
	const url = routes[event.index]

	uni.navigateTo({
		url: url
	})
};

// 搜索页面
export const toOtherPage = (name) => {
	const routes = {
		"搜索": "/pages/home/search/search"
	}
	const url = routes[`${name}`]
	uni.navigateTo({
		url: url
	})
}


// 点击设置新的菜单
export const setCurrentMenu = (index) => {
	currentMenu.value = index
}

// 滑动设置新的菜单
export const onSwiperChange = (e) => {
	currentMenu.value = e.detail.current
}


// 整个页面的滑动的监听事件
export const scroll = (e) => {
	if (e.detail.scrollTop === 0) {
		opacity.value = 0
		isScroll.value = false
	}
	if (e.detail.scrollTop > 0 && e.detail.scrollTop < 30) {
		opacity.value = 0.2
		isScroll.value = false
	}
	if (e.detail.scrollTop > 30 && e.detail.scrollTop < 60) {
		opacity.value = 0.4
		isScroll.value = false
	}
	if (e.detail.scrollTop > 60 && e.detail.scrollTop < 90) {
		opacity.value = 0.6
		isScroll.value = false
	}
	if (e.detail.scrollTop > 90 && e.detail.scrollTop < 120) {
		opacity.value = 0.8
		isScroll.value = false
	}
	if (e.detail.scrollTop > 120 && e.detail.scrollTop < 130) {
		opacity.value = 1
		isScroll.value = false
	}
	if (e.detail.scrollTop >= 130) {
		opacity.value = 1
		isScroll.value = true
	}
}