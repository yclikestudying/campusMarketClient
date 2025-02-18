<template>
	<view class="profession">
		<view>
			<van-cell title="职业" is-link :value="userProfession" size="large" />
		</view>
		<van-tree-select class="select" v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="profession" />
		<view style="margin: 16px;">
		  <van-button round block type="primary" native-type="submit" color="#FEE802" @click="onSubmit">
		    提交
		  </van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from "vue";
	import {profession, getProfession} from "./data.js"


	// 数据
	const activeId = ref(1);
	const activeIndex = ref(0);
	let userProfession = ref(uni.getStorageSync("userInfo").userProfession)
	
	watch(activeId, (value) => {
		userProfession.value = getProfession(value)
	})
</script>

<style lang="less" scoped>
	.profession {
		width: 100vw;
		height: 100vh;
	}
</style>