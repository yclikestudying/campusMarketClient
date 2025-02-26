<template>
	<view class="article-detail">
		<view class="article">
			<view class="userInfo">
				<view class="avatar" @click="toOtherPage('myIndex', role, permission, article.publishUser.userId)">
					<image :src="article.publishUser.userAvatar" mode=""></image>
				</view>
				<view class="right">
					<view class="top">
						<text>{{ article.publishUser.userName }}</text>
						<uni-icons v-if="permission === 'update'" type="trash" size="25"
							@click="deleteByArticleId(article.articleId)"></uni-icons>
					</view>
					<view class="bottom">
						<text>{{ relativeTime(article.createTime, 'other') }}</text>
					</view>
				</view>
			</view>
			<view class="text">
				<text>{{ article.articleContent }}</text>
			</view>
			<view class="image">
				<template v-for="(photo, index) in JSON.parse(article.articlePhotos)">
					<view class="photo" @click="toOtherPage('image', role, permission, photo, 'photo')">
						<image :src="photo" mode=""></image>
					</view>
				</template>
			</view>
			<view class="function">
				<uni-icons v-if="isLike(article.articleId, myId)" type="hand-up-filled" color="red" size="25"
					@click="unlike(article.articleId)"></uni-icons>
				<uni-icons v-else type="hand-up" size="25" @click="like(article.articleId)"></uni-icons>
				<text>{{ article.like.count ?? 0 }}</text>
				<uni-icons type="chat" size="25"></uni-icons>
				<text>{{ article.comment.count ?? 0 }}</text>
			</view>
		</view>
		<view class="input">
			<uni-easyinput class="uni-mt-5" v-model="content" trim="all" placeholder="请输入内容"></uni-easyinput>
			<text @click="publishComment(article.articleId)">发送</text>
		</view>
		<view class="comment">
			<template v-for="(one, index) in article.comment.articleUserVOList">
				<uni-list-chat :title="one.userName" :avatar="one.userAvatar" :note="article.comment.commentList[index]"
					badge-positon="left">
					<view class="chat-custom-right">
						<uni-icons type="trash" color="#999" size="18"
							@click="deleteComment(article.articleId, article.comment.commentId[index])"></uni-icons>
					</view>
					<text style="font-size: 12px;">{{ relativeTime(article.comment.time[index], 'other') }}</text>
				</uni-list-chat>
			</template>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		relativeTime
	} from "../common/util/common.js"
	import {
		computed,
		ref
	} from "vue"
	import {
		request,
		requestPromise
	} from "/pages/common/util/request.js"
	import {
		toOtherPage
	} from "./article.js"

	// 数据
	let role = ref('')
	let permission = ref('')
	let article = ref(uni.getStorageSync("article"))
	let myId = ref(uni.getStorageSync("user").userId); // 自己的id
	let otherId = ref(article.value.publishUser.userId) // 动态发表用户的id
	let content = ref('')

	onLoad((e) => {
		role.value = e.role
		permission.value = e.permission
	})

	// 删除评论
	const deleteComment = (articleId, commentId) => {
		uni.showModal({
			title: '温馨提示',
			content: '确认删除该评论吗',
			success: async function(res) {
				if (res.confirm) {
					const res1 = await request(
						`/comment/delete?articleId=${articleId}&commentId=${commentId}&userId=${otherId.value}`, "DELETE",
						null)
					if (res1.data.code === 200) {
						const res2 = await requestPromise(`/article/queryArticleByUserId?userId=${otherId.value}`, "GET", null)
						article.value = res2.find(article => article.articleId === articleId)
						uni.showToast({
							title: "删除成功"
						})
						uni.$emit("attentionUserArticle", article.value)
					}
				}
			}
		});
	}

	// 发表评论
	const publishComment = async (articleId) => {
		if (content.value.length !== 0) {
			const res = await request("/comment/publish", "POST", {
				articleId: articleId,
				content: content.value,
				userId: otherId.value
			})
			if (res.data.code === 200) {
				const res1 = await requestPromise(`/article/queryArticleByUserId?userId=${otherId.value}`, "GET", null)
				article.value = res1.find(article => article.articleId === articleId)
				content.value = ''
				uni.showToast({
					title: "发表成功"
				})
				uni.$emit("attentionUserArticle", article.value)
			}
		} else {
			uni.showToast({
				title: "内容不能为空"
			})
		}
	}

	// 判断自己是否点赞别人的动态
	const isLike = (articleId, id) => {
		if (article.value.like.articleUserVOList) {
			for (let user of article.value.like.articleUserVOList) {
				if (user.userId === id) {
					return true;
				}
			}
		}
		return false;
	}
	
	// 点赞动态
	const like = async (articleId) => {
		const res = await request(`/likes/like?articleId=${articleId}&userId=${otherId.value}`, "PUT", null)
		if (res.data.code === 200) {
			const res1 = await requestPromise(`/article/queryArticleByUserId?userId=${otherId.value}`, "GET", null)		
			article.value = res1.find(article => article.articleId === articleId)
			uni.showToast({
				title: "点赞成功"
			})
			uni.$emit("attentionUserArticle", article.value)
		}
	}
	
	// 取消点赞动态
	const unlike = async (articleId) => {
		const res = await request(`/likes/unlike?articleId=${articleId}&userId=${otherId.value}`, "PUT", null)
		if (res.data.code === 200) {
			const res1 = await requestPromise(`/article/queryArticleByUserId?userId=${otherId.value}`, "GET", null)		
			article.value = res1.find(article => article.articleId === articleId)
			uni.showToast({
				title: "点赞成功"
			})
			uni.$emit("attentionUserArticle", article.value)
		}
	}

	// 删除动态
	const deleteByArticleId = (id) => {
		uni.showModal({
			title: '温馨提示',
			content: '确认删除该动态吗',
			success: async function(res) {
				if (res.confirm) {
					const res = await request(`/article/deleteArticleByArticleId?articleId=${id}`,
						"DELETE", null)
					if (res.data.code === 200) {
						uni.navigateBack()
						uni.showToast({
							title: "删除成功"
						})

					}
				}
			}
		});
	}
</script>

<style lang="less" scoped>
	.article-detail {
		width: 100vw;
		height: 100vh;

		.article {
			box-sizing: content-box;
			padding: 10px 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.userInfo {
				width: 95%;
				height: 50px;
				display: flex;
				justify-content: space-between;

				.avatar {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					width: calc(100% - 50px - 10px);
					height: 100%;

					.top {
						width: 100%;
						height: 50%;
						display: flex;
						justify-content: space-between;
					}

					.bottom {
						width: 100%;
						height: 50%;
						font-size: 12px;
						display: flex;
						align-items: center;
					}
				}
			}

			.text {
				margin-top: 10px;
				width: 95%;
			}

			.image {
				margin-top: 10px;
				width: 95%;
				display: flex;
				flex-wrap: wrap;

				.photo {
					margin-right: 2px;
					margin-bottom: 2px;
					width: 110px;
					height: 110px;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.function {
				width: 95%;
				display: flex;
				align-items: center;
				justify-content: right;
			}
		}

		.input {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			padding: 0 10px;

			.uni-mt-5 {
				caret-color: deepskyblue;
			}

			text {
				margin-left: 5px;
			}
		}

		.comment {
			width: 100%;
		}
	}
</style>