const profession = [
    {
        "text": "工程与技术",
        "children": [
            {
                "text": "计算机科学与技术",
                "id": 1
            },
            {
                "text": "电子工程",
                "id": 2
            },
            {
                "text": "土木工程",
                "id": 3
            },
            {
                "text": "机械工程",
                "id": 4
            },
            {
                "text": "环境工程",
                "id": 26
            },
            {
                "text": "化学工程",
                "id": 27
            },
            {
                "text": "材料科学与工程",
                "id": 28
            },
            {
                "text": "生物工程",
                "id": 29
            },
            {
                "text": "交通工程",
                "id": 30
            },
            {
                "text": "能源与动力工程",
                "id": 31
            },
            {
                "text": "电气工程及其自动化",
                "id": 32
            }
        ]
    },
    {
        "text": "商业与管理",
        "children": [
            {
                "text": "市场营销",
                "id": 5
            },
            {
                "text": "财务管理",
                "id": 6
            },
            {
                "text": "人力资源管理",
                "id": 7
            },
            {
                "text": "国际贸易",
                "id": 8
            },
            {
                "text": "会计学",
                "id": 33
            },
            {
                "text": "审计学",
                "id": 34
            },
            {
                "text": "物流管理",
                "id": 35
            },
            {
                "text": "旅游管理",
                "id": 36
            },
            {
                "text": "酒店管理",
                "id": 37
            },
            {
                "text": "电子商务",
                "id": 38
            }
        ]
    },
    {
        "text": "医学",
        "children": [
            {
                "text": "临床医学",
                "id": 9
            },
            {
                "text": "药学",
                "id": 10
            },
            {
                "text": "护理学",
                "id": 11
            },
            {
                "text": "公共卫生",
                "id": 12
            },
            {
                "text": "基础医学",
                "id": 39
            },
            {
                "text": "口腔医学",
                "id": 4
            },
            {
                "text": "预防医学",
                "id": 41
            },
            {
                "text": "医学检验技术",
                "id": 42
            }
        ]
    },
    {
        "text": "艺术与设计",
        "children": [
            {
                "text": "平面设计",
                "id": 13
            },
            {
                "text": "插画设计",
                "id": 14
            },
            {
                "text": "室内设计",
                "id": 15
            },
            {
                "text": "工业设计",
                "id": 16
            },
            {
                "text": "动画设计",
                "id": 17
            },
            {
                "text": "时尚设计",
                "id": 43
            },
            {
                "text": "摄影",
                "id": 44
            },
            {
                "text": "影视制作",
                "id": 45
            },
            {
                "text": "音乐学",
                "id": 46
            },
            {
                "text": "舞蹈学",
                "id": 47
            }
        ]
    },
    {
        "text": "教育与培训",
        "children": [
            {
                "text": "教育学",
                "id": 18
            },
            {
                "text": "心理学",
                "id": 19
            },
            {
                "text": "特殊教育",
                "id": 20
            },
            {
                "text": "幼儿教育",
                "id": 21
            },
            {
                "text": "成人教育",
                "id": 48
            },
            {
                "text": "远程教育",
                "id": 49
            },
            {
                "text": "职业教育",
                "id": 50
            }
        ]
    },
    {
        "text": "法律与社会工作",
        "children": [
            {
                "text": "法学",
                "id": 22
            },
            {
                "text": "社会学",
                "id": 23
            },
            {
                "text": "社会工作",
                "id": 24
            },
            {
                "text": "国际关系",
                "id": 25
            },
            {
                "text": "政治学",
                "id": 51
            },
            {
                "text": "公共管理",
                "id": 52
            },
            {
                "text": "公共政策",
                "id": 53
            }
        ]
    }
]


const getProfession = (activeId) => {
	let length = profession.length
	let name = null
	profession.forEach(firstName => {
		firstName.children.forEach(lastName => {
			if (lastName.id === activeId) {
				name = `${firstName.text}/${lastName.text}`
			}
		})
	})
	return name
}

export {
	profession,
	getProfession
}