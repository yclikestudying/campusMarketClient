<template>
	<scroll-view scroll-y="true" class="info">
		<scroll-view class="scrollView" scroll-y="true">
			<view @click="toOtherPage('username')">
				<van-cell title="用户名" :value="user.userName || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('gender')">
				<van-cell title="性别" :value="user.userGender === 1 ? '男' : user.userGender === 0 ? '女' : '保密'" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('birthday')">
				<van-cell title="生日" :value="user.userBirthday || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('profile')">
				<van-cell title="简介" :value="user.userProfile || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('location')">
				<van-cell title="所在地" :value="user.userLocation || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('homeTown')">
				<van-cell title="家乡" :value="user.userHometown || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('profession')">
				<van-cell title="职业" :value="user.userProfession || ''" :is-link="permission === 'update'" size="large" />
			</view>
			<view @click="toOtherPage('tag')">
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
		onLoad
	} from "@dcloudio/uni-app"
	import {
		role,
		permission,
		user
	} from "./info.js"
	import {
		toOtherPage
	} from "./info.js"
	
	onLoad((e) => {
		role.value = e.user
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
		// 获取用户信息
		user.value = uni.getStorageSync("user")
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