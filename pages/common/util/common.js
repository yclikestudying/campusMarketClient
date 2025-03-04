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
		if (item !== "createTime" && item !== 'userId' && item !== 'userAvatar' && item !== 'isAdmin' && item !==
			'userPhone' && item !== "userPassword" && user[`${item}`] !== null) {
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
 * 聊天页面的时间展示（仿腾讯 QQ，今天显示“今天 HH:mm”）
 */
export function relativeTime(timeString) {
	const date1 = new Date(formatDate(timeString)); // 传入的时间
	const date2 = new Date(); // 当前时间
	const diffMs = date2 - date1; // 时间差（毫秒）

	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 相差天数

	// 星期几的映射
	const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

	let result;

	if (isToday(date1)) {
		// 如果是今天，显示“今天 HH:mm”
		const hours = String(date1.getHours()).padStart(2, '0'); // 补零
		const minutes = String(date1.getMinutes()).padStart(2, '0'); // 补零
		result = `今天 ${hours}:${minutes}`;
	} else if (diffDays === 1) {
		// 昨天
		const yesterdayHours = String(date1.getHours()).padStart(2, '0'); // 昨天的小时数
		const yesterdayMinutes = String(date1.getMinutes()).padStart(2, '0'); // 昨天的分钟数
		result = `昨天 ${yesterdayHours}:${yesterdayMinutes}`;
	} else if (diffDays < 7) {
		// 本周内，显示星期几
		const dayOfWeek = weekDays[date1.getDay()]; // 获取星期几
		const hours = String(date1.getHours()).padStart(2, '0'); // 补零
		const minutes = String(date1.getMinutes()).padStart(2, '0'); // 补零
		result = `${dayOfWeek} ${hours}:${minutes}`;
	} else {
		// 超过一周，显示具体日期
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

	return result;
}

/**
 * 判断日期是否是今天
 */
export function isToday(date) {
	const today = new Date();
	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	);
}

// 工具函数：格式化时间为微信风格
export function formatWeChatTime(dateStr) {
    const inputDate = new Date(dateStr);
    const now = new Date();

    // 获取日期的年、月、日、时、分
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth() + 1; // 月份从 0 开始，需要加 1
    const inputDay = inputDate.getDate();
    const inputHours = inputDate.getHours();
    const inputMinutes = inputDate.getMinutes();

    // 获取当前日期的年、月、日
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();

    // 判断是否是今天
    if (inputYear === nowYear && inputMonth === nowMonth && inputDay === nowDay) {
        return `${padZero(inputHours)}:${padZero(inputMinutes)}`;
    }

    // 判断是否是昨天
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
        inputYear === yesterday.getFullYear() &&
        inputMonth === yesterday.getMonth() + 1 &&
        inputDay === yesterday.getDate()
    ) {
        return `昨天 ${padZero(inputHours)}:${padZero(inputMinutes)}`;
    }

    // 判断是否是今年
    if (inputYear === nowYear) {
        return `${padZero(inputMonth)}-${padZero(inputDay)} ${padZero(inputHours)}:${padZero(inputMinutes)}`;
    }

    // 其他情况，显示完整日期
    return `${inputYear}-${padZero(inputMonth)}-${padZero(inputDay)} ${padZero(inputHours)}:${padZero(inputMinutes)}`;
}

// 工具函数：补零
function padZero(num) {
    return num < 10 ? `0${num}` : num;
}