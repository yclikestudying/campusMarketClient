const hobbies = [{
		text: '艺术创作',
		children: [{
				text: '绘画',
				id: 1
			},
			{
				text: '音乐',
				id: 2
			},
			{
				text: '写作',
				id: 3
			},
			{
				text: '摄影',
				id: 4
			},
		],
	},
	{
		text: '体育运动',
		children: [{
				text: '足球',
				id: 5
			},
			{
				text: '篮球',
				id: 6
			},
			{
				text: '游泳',
				id: 7
			},
			{
				text: '瑜伽',
				id: 8
			},
		],
	},
	{
		text: '休闲娱乐',
		children: [{
				text: '旅游',
				id: 9
			},
			{
				text: '阅读',
				id: 10
			},
			{
				text: '游戏',
				id: 11
			},
			{
				text: '电影',
				id: 12
			},
		],
	},
	{
		text: '科技创新',
		children: [{
				text: '编程',
				id: 13
			},
			{
				text: '机器人制作',
				id: 14
			},
			{
				text: '3D打印',
				id: 15
			},
			{
				text: '无人机操作',
				id: 16
			},
			{
				text: '虚拟现实',
				id: 17
			},
		],
	},
	{
		text: '生活技能',
		children: [{
				text: '烹饪',
				id: 18
			},
			{
				text: '园艺',
				id: 19
			},
			{
				text: '手工艺',
				id: 20
			},
			{
				text: '家居装饰',
				id: 21
			},
		],
	},
	{
		text: '社交活动',
		children: [{
				text: '聚会',
				id: 22
			},
			{
				text: '志愿者服务',
				id: 23
			},
			{
				text: '社团活动',
				id: 24
			},
			{
				text: '文化节庆',
				id: 25
			},
		]
	}
]

const getHobbies = (activeIds) => {
	if (activeIds.length > 30) return;

	const idSet = new Set(activeIds)
	return hobbies.flatMap(hobby =>
		hobby.children
		.filter(item => idSet.has(item.id))
		.map(item => {
			return {
				text: item.text,
				id: item.id
			}
		})
	)
}


export {
	hobbies,
	getHobbies
}