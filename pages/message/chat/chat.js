import {
	ref,
	computed,
	onMounted
} from 'vue';
import {
	onLoad,
	onShow
} from '@dcloudio/uni-app'

// 数据
export let scrollIntoId = ref('');
export let content = ref(''); // 发送的消息内容
export let messages = ref([]); // 聊天信息

// 发送消息
export const send = () => {

}