let currentTime = null

/**
 * 计算用户信息的完善情况
 */
export const userInfoProgress = () => {
	const user = uni.getStorageSync("user")
	const totle = Object.keys(user).length - 6;
	let count = 0;
	for (let item in user) {
		if (item === 'userGender' && user[`${item}`] !== null) {
			count++;
			continue;
		}
		if (item !== "createTime" && item !== 'userId' && item !== 'userAvatar' && item !== 'isAdmin' && item !== 'userPhone' && item !== "userPassword" && user[`${item}`] !== null) {
			count++;
		}
	}

	return Math.round((count / totle) * 100) + "%";
};

/**
 * 计算当前时间
 */
export const formatDate = (time) => {
	let date = new Date(time);
	let year = date.getUTCFullYear();
	let month = date.getUTCMonth() + 1;
	let day = date.getUTCDate();
	let hour = date.getUTCHours();
	let minute = date.getUTCMinutes();
	let second = date.getUTCSeconds();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;

	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

/**
 * 聊天页面的时间展示
 */
export function relativeTime(timeString, keyword) {
	const date1 = new Date(formatDate(timeString)); // 传入的时间
	const date2 = new Date(); // 当前时间
	const diffMs = date2 - date1; // 时间差（毫秒）

	const diffSeconds = Math.floor(diffMs / 1000); // 相差秒数
	const diffMinutes = Math.floor(diffSeconds / 60); // 相差分钟数
	const diffHours = Math.floor(diffMinutes / 60); // 相差小时数
	const diffDays = Math.floor(diffHours / 24); // 相差天数

	let result;

	if (diffSeconds < 60) {
		result = '刚刚'; // 小于1分钟，显示“刚刚”
	} else if (diffMinutes < 60) {
		result = `${diffMinutes}分钟前`; // 小于1小时，显示“X分钟前”
	} else if (diffHours < 24) {
		result = `${diffHours}小时前`; // 小于1天，显示“X小时前”
	} else if (diffDays === 1) {
		// 昨天
		const yesterdayHours = String(date1.getHours()).padStart(2, '0'); // 昨天的小时数
		const yesterdayMinutes = String(date1.getMinutes()).padStart(2, '0'); // 昨天的分钟数
		result = `昨天 ${yesterdayHours}:${yesterdayMinutes}`;
	} else {
		// 超过昨天，显示具体日期和时间
		const year = date1.getFullYear();
		const month = String(date1.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
		const day = String(date1.getDate()).padStart(2, '0'); // 补零
		const hours = String(date1.getHours()).padStart(2, '0'); // 补零
		const minutes = String(date1.getMinutes()).padStart(2, '0'); // 补零

		if (date1.getFullYear() === date2.getFullYear()) {
			// 未跨年
			result = `${month}/${day} ${hours}:${minutes}`;
		} else {
			// 跨年
			result = `${year}/${month}/${day} ${hours}:${minutes}`;
		}
	}

	if (keyword === 'other') {
		return result;
	}

	return result === currentTime ? '' : (currentTime = result);
}