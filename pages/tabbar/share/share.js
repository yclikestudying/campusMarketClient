import {
	ref
} from 'vue';
import uniFab from '@/uni_modules/uni-fab/components/uni-fab/uni-fab.vue';
import {
	onShow
} from "@dcloudio/uni-app"

// 数据
export let currentOption = ref(0); // 当前选项

// 设置新的选项
export const setCurrentOption = (index) => {
	currentOption.value = index
}

// 页面滑动
export const onSwiperChange = (event) => {
	currentOption.value = event.detail.current
}