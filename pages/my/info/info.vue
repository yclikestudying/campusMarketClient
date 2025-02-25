<template>
	<scroll-view scroll-y="true" class="info">
		<scroll-view class="scrollView" scroll-y="true">
			<view @click="toOtherPage('username', user.userName, role)">
				<van-cell title="用户名" :value="user.userName || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('gender', user.userGender, role)">
				<van-cell title="性别" :value="user.userGender === 1 ? '男' : user.userGender === 0 ? '女' : ''"
					:is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('birthday', user.userBirthday, role)">
				<van-cell title="生日" :value="user.userBirthday || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('profile', user.userProfile, role)">
				<van-cell title="简介" :value="user.userProfile || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('location', user.userLocation, role)">
				<van-cell title="所在地" :value="user.userLocation || ''" :is-link="permission === 'update'"
					size="large" />
			</view>
			<view @click="toOtherPage('homeTown', user.userHometown, role)">
				<van-cell title="家乡" :value="user.userHometown || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('profession', user.userProfession, role)">
				<van-cell title="职业" :value="JSON.parse(user.userProfession)?.text || ''" :is-link="permission === 'update'"
					size="large" />
			</view>
			<view @click="toOtherPage('tag', user.userTags, role)">
				<van-cell title="个性标签" :is-link="permission === 'update'" arrow-direction="down" size="large" />
				<view class="tag">
					<template v-for="(tag, index) in JSON.parse(user.userTags)">
						<view class="tag-item">
							<van-tag type="primary" size="large">
								{{ tag.text }}
							</van-tag>
						</view>
					</template>
				</view>
			</view>
		</scroll-view>
	</scroll-view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app"
	import { ref } from "vue"
	import {
		toOtherPage
	} from "./info.js"
	
	let role = ref('') // 用户角色
	let permission = ref('') // 用户权限
	let user = ref(null); // 用户信息

	onLoad((e) => {
		role.value = e.role
		permission.value = e.permission
		if (permission.value === 'update') {
			uni.setNavigationBarTitle({
				title: "编辑资料"
			})
		} else {
			uni.setNavigationBarTitle({
				title: "资料展示"
			})
		}

	})

	onShow(() => {
		if (role.value === 'me') {
			// 获取自己用户信息
			user.value = uni.getStorageSync("user")
		} else {
			// 获取其他用户的用户信息
			user.value = uni.getStorageSync("other")
		}
	})
</script>

<style lang="less" scoped>
	.info {
		width: 100vw;
		height: 100vh;
		background-color: #F3F2F8;

		.scrollView {
			width: 100%;
			height: calc(100vh - 83px - 46px);

			.tag {
				display: flex;
				flex-wrap: wrap;
				padding: 5px;

				.tag-item {
					margin-bottom: 5px;
					margin-left: 5px;
				}
			}
		}
	}

	.popup-content {
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		width: 100%;
		height: auto;
	}
</style>