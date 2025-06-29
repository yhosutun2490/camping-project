const sampleComments = [
  {
    userInfo: {
      user_id: "u1000",
      name: "徐子豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2000",
      event_name: "松林谷地露營區",
      host_id: "h3000",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4000",
      description: "星空超美，露營體驗一流！",
      date: "2024-05-18",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1001",
      name: "張彥豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2001",
      event_name: "藍海灣露營地",
      host_id: "h3001",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4001",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2025-11-14",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1002",
      name: "吳詠珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2002",
      event_name: "星光山丘營地",
      host_id: "h3002",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4002",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2024-07-27",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1003",
      name: "陳佳傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2003",
      event_name: "溪谷林間營地",
      host_id: "h3003",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4003",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2024-04-28",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1004",
      name: "黃庭豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2004",
      event_name: "銀河谷露營地",
      host_id: "h3004",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4004",
      description: "風景優美，但夜間有點吵。",
      date: "2025-06-17",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1005",
      name: "王佳珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2005",
      event_name: "沙丘秘境營區",
      host_id: "h3005",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4005",
      description: "星空超美，露營體驗一流！",
      date: "2025-07-24",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1006",
      name: "曾庭珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2006",
      event_name: "霧峰森林營地",
      host_id: "h3006",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4006",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2024-11-04",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1007",
      name: "徐宏珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2007",
      event_name: "彩虹草原營地",
      host_id: "h3007",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4007",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2025-09-01",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1008",
      name: "周佳傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2008",
      event_name: "月影湖畔營地",
      host_id: "h3008",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4008",
      description: "星空超美，露營體驗一流！",
      date: "2024-11-30",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1009",
      name: "徐詠豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2009",
      event_name: "風之谷營區",
      host_id: "h3009",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4009",
      description: "離海邊很近，可以聽到海浪聲。",
      date: "2025-04-13",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1010",
      name: "張詠輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2010",
      event_name: "松林谷地露營區",
      host_id: "h3010",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4010",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2025-06-26",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1011",
      name: "黃明穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2011",
      event_name: "藍海灣露營地",
      host_id: "h3011",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4011",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2024-06-02",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1012",
      name: "黃柏輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2012",
      event_name: "星光山丘營地",
      host_id: "h3012",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4012",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2025-05-05",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1013",
      name: "張欣穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2013",
      event_name: "溪谷林間營地",
      host_id: "h3013",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4013",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2024-10-14",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1014",
      name: "張子恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2014",
      event_name: "銀河谷露營地",
      host_id: "h3014",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4014",
      description: "風景優美，但夜間有點吵。",
      date: "2024-09-11",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1015",
      name: "吳柏豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2015",
      event_name: "沙丘秘境營區",
      host_id: "h3015",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4015",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2025-07-24",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1016",
      name: "林詠珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2016",
      event_name: "霧峰森林營地",
      host_id: "h3016",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4016",
      description: "營區安靜，睡得很好，推薦！",
      date: "2025-08-03",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1017",
      name: "徐彥穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2017",
      event_name: "彩虹草原營地",
      host_id: "h3017",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4017",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-08-30",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1018",
      name: "李庭輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2018",
      event_name: "月影湖畔營地",
      host_id: "h3018",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4018",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2024-03-23",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1019",
      name: "林子珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2019",
      event_name: "風之谷營區",
      host_id: "h3019",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4019",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2025-07-23",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1020",
      name: "陳詠輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2020",
      event_name: "松林谷地露營區",
      host_id: "h3020",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4020",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2024-04-16",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1021",
      name: "周明輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2021",
      event_name: "藍海灣露營地",
      host_id: "h3021",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4021",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2025-01-15",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1022",
      name: "王詠輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2022",
      event_name: "星光山丘營地",
      host_id: "h3022",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4022",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2025-07-11",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1023",
      name: "黃彥豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2023",
      event_name: "溪谷林間營地",
      host_id: "h3023",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4023",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2025-08-14",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1024",
      name: "李子翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2024",
      event_name: "銀河谷露營地",
      host_id: "h3024",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4024",
      description: "風景優美，但夜間有點吵。",
      date: "2025-01-05",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1025",
      name: "林庭穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2025",
      event_name: "沙丘秘境營區",
      host_id: "h3025",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4025",
      description: "營主很親切，還送了柴火。",
      date: "2024-11-06",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1026",
      name: "周宏珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2026",
      event_name: "霧峰森林營地",
      host_id: "h3026",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4026",
      description: "星空超美，露營體驗一流！",
      date: "2025-02-09",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1027",
      name: "徐子茹",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2027",
      event_name: "彩虹草原營地",
      host_id: "h3027",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4027",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-08-20",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1028",
      name: "周庭傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2028",
      event_name: "月影湖畔營地",
      host_id: "h3028",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4028",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2025-03-12",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1029",
      name: "李庭傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2029",
      event_name: "風之谷營區",
      host_id: "h3029",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4029",
      description: "星空超美，露營體驗一流！",
      date: "2024-10-27",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1030",
      name: "黃明傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2030",
      event_name: "松林谷地露營區",
      host_id: "h3030",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4030",
      description: "離海邊很近，可以聽到海浪聲。",
      date: "2024-12-10",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1031",
      name: "林子穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2031",
      event_name: "藍海灣露營地",
      host_id: "h3031",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4031",
      description: "風景優美，但夜間有點吵。",
      date: "2024-12-27",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1032",
      name: "陳子珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2032",
      event_name: "星光山丘營地",
      host_id: "h3032",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4032",
      description: "離海邊很近，可以聽到海浪聲。",
      date: "2025-12-11",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1033",
      name: "曾子傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2033",
      event_name: "溪谷林間營地",
      host_id: "h3033",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4033",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-03-22",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1034",
      name: "曾柏珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2034",
      event_name: "銀河谷露營地",
      host_id: "h3034",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4034",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2024-03-06",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1035",
      name: "林詠瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2035",
      event_name: "沙丘秘境營區",
      host_id: "h3035",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4035",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-06-15",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1036",
      name: "黃彥恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2036",
      event_name: "霧峰森林營地",
      host_id: "h3036",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4036",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-06-06",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1037",
      name: "徐庭恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2037",
      event_name: "彩虹草原營地",
      host_id: "h3037",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4037",
      description: "風景優美，但夜間有點吵。",
      date: "2025-04-19",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1038",
      name: "李柏珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2038",
      event_name: "月影湖畔營地",
      host_id: "h3038",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4038",
      description: "星空超美，露營體驗一流！",
      date: "2024-11-10",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1039",
      name: "黃柏茹",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2039",
      event_name: "風之谷營區",
      host_id: "h3039",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4039",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2024-04-15",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1040",
      name: "張庭翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2040",
      event_name: "松林谷地露營區",
      host_id: "h3040",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4040",
      description: "風景優美，但夜間有點吵。",
      date: "2025-07-28",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1041",
      name: "林彥恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2041",
      event_name: "藍海灣露營地",
      host_id: "h3041",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4041",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2025-01-01",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1042",
      name: "張柏瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2042",
      event_name: "星光山丘營地",
      host_id: "h3042",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4042",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2025-08-14",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1043",
      name: "張宏瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2043",
      event_name: "溪谷林間營地",
      host_id: "h3043",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4043",
      description: "風景優美，但夜間有點吵。",
      date: "2025-12-11",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1044",
      name: "李佳豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2044",
      event_name: "銀河谷露營地",
      host_id: "h3044",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4044",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2024-12-09",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1045",
      name: "曾宏珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2045",
      event_name: "沙丘秘境營區",
      host_id: "h3045",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4045",
      description: "星空超美，露營體驗一流！",
      date: "2025-01-05",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1046",
      name: "吳欣輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2046",
      event_name: "霧峰森林營地",
      host_id: "h3046",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4046",
      description: "星空超美，露營體驗一流！",
      date: "2024-07-23",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1047",
      name: "張庭恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2047",
      event_name: "彩虹草原營地",
      host_id: "h3047",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4047",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2025-02-18",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1048",
      name: "王詠瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2048",
      event_name: "月影湖畔營地",
      host_id: "h3048",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4048",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2024-08-13",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1049",
      name: "陳宏輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2049",
      event_name: "風之谷營區",
      host_id: "h3049",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4049",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2024-08-10",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1050",
      name: "張明珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2050",
      event_name: "松林谷地露營區",
      host_id: "h3050",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4050",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2024-08-06",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1051",
      name: "周庭豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2051",
      event_name: "藍海灣露營地",
      host_id: "h3051",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4051",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2025-09-24",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1052",
      name: "吳宏珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2052",
      event_name: "星光山丘營地",
      host_id: "h3052",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4052",
      description: "風景優美，但夜間有點吵。",
      date: "2024-12-30",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1053",
      name: "曾子恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2053",
      event_name: "溪谷林間營地",
      host_id: "h3053",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4053",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2024-02-27",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1054",
      name: "吳庭翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2054",
      event_name: "銀河谷露營地",
      host_id: "h3054",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4054",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2024-11-21",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1055",
      name: "李宏傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2055",
      event_name: "沙丘秘境營區",
      host_id: "h3055",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4055",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2024-10-03",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1056",
      name: "曾子恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2056",
      event_name: "霧峰森林營地",
      host_id: "h3056",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4056",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2025-02-27",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1057",
      name: "王柏穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2057",
      event_name: "彩虹草原營地",
      host_id: "h3057",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4057",
      description: "營主很親切，還送了柴火。",
      date: "2025-10-22",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1058",
      name: "黃佳茹",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2058",
      event_name: "月影湖畔營地",
      host_id: "h3058",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4058",
      description: "星空超美，露營體驗一流！",
      date: "2025-10-16",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1059",
      name: "林宏豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2059",
      event_name: "風之谷營區",
      host_id: "h3059",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4059",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2024-12-27",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1060",
      name: "周子傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2060",
      event_name: "松林谷地露營區",
      host_id: "h3060",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4060",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-12-12",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1061",
      name: "林明恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2061",
      event_name: "藍海灣露營地",
      host_id: "h3061",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4061",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-12-27",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1062",
      name: "林子豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2062",
      event_name: "星光山丘營地",
      host_id: "h3062",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4062",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2025-02-25",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1063",
      name: "張彥翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2063",
      event_name: "溪谷林間營地",
      host_id: "h3063",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4063",
      description: "營區安靜，睡得很好，推薦！",
      date: "2024-11-13",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1064",
      name: "張子珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2064",
      event_name: "銀河谷露營地",
      host_id: "h3064",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4064",
      description: "離海邊很近，可以聽到海浪聲。",
      date: "2025-11-08",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1065",
      name: "曾佳恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2065",
      event_name: "沙丘秘境營區",
      host_id: "h3065",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4065",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-06-09",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1066",
      name: "黃柏翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2066",
      event_name: "霧峰森林營地",
      host_id: "h3066",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4066",
      description: "星空超美，露營體驗一流！",
      date: "2025-05-22",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1067",
      name: "林子翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2067",
      event_name: "彩虹草原營地",
      host_id: "h3067",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4067",
      description: "風景優美，但夜間有點吵。",
      date: "2025-06-14",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1068",
      name: "陳欣豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2068",
      event_name: "月影湖畔營地",
      host_id: "h3068",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4068",
      description: "營主很親切，還送了柴火。",
      date: "2025-11-04",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1069",
      name: "曾子翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2069",
      event_name: "風之谷營區",
      host_id: "h3069",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4069",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2024-01-26",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1070",
      name: "陳庭輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2070",
      event_name: "松林谷地露營區",
      host_id: "h3070",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4070",
      description: "風景優美，但夜間有點吵。",
      date: "2024-10-07",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1071",
      name: "張宏珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2071",
      event_name: "藍海灣露營地",
      host_id: "h3071",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4071",
      description: "風景優美，但夜間有點吵。",
      date: "2025-03-21",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1072",
      name: "周子傑",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2072",
      event_name: "星光山丘營地",
      host_id: "h3072",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4072",
      description: "營區安靜，睡得很好，推薦！",
      date: "2024-03-14",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1073",
      name: "王子珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2073",
      event_name: "溪谷林間營地",
      host_id: "h3073",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4073",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-02-15",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1074",
      name: "林子珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2074",
      event_name: "銀河谷露營地",
      host_id: "h3074",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4074",
      description: "星空超美，露營體驗一流！",
      date: "2025-02-13",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1075",
      name: "張明瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2075",
      event_name: "沙丘秘境營區",
      host_id: "h3075",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4075",
      description: "星空超美，露營體驗一流！",
      date: "2024-05-08",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1076",
      name: "李明珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2076",
      event_name: "霧峰森林營地",
      host_id: "h3076",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4076",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2025-01-04",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1077",
      name: "吳佳珮",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2077",
      event_name: "彩虹草原營地",
      host_id: "h3077",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4077",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2024-06-12",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1078",
      name: "周宏珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2078",
      event_name: "月影湖畔營地",
      host_id: "h3078",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4078",
      description: "營主很親切，還送了柴火。",
      date: "2025-02-03",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1079",
      name: "王子豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2079",
      event_name: "風之谷營區",
      host_id: "h3079",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4079",
      description: "離海邊很近，可以聽到海浪聲。",
      date: "2025-05-28",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1080",
      name: "周子穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2080",
      event_name: "松林谷地露營區",
      host_id: "h3080",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4080",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2024-07-27",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1081",
      name: "李柏茹",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2081",
      event_name: "藍海灣露營地",
      host_id: "h3081",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4081",
      description: "風景優美，但夜間有點吵。",
      date: "2024-04-29",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1082",
      name: "李子輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2082",
      event_name: "星光山丘營地",
      host_id: "h3082",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4082",
      description: "風景優美，但夜間有點吵。",
      date: "2025-09-28",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1083",
      name: "周庭瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2083",
      event_name: "溪谷林間營地",
      host_id: "h3083",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4083",
      description: "營主很親切，還送了柴火。",
      date: "2024-05-17",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1084",
      name: "黃彥翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2084",
      event_name: "銀河谷露營地",
      host_id: "h3084",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4084",
      description: "風景優美，但夜間有點吵。",
      date: "2025-07-05",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1085",
      name: "王詠輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2085",
      event_name: "沙丘秘境營區",
      host_id: "h3085",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4085",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2025-06-10",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1086",
      name: "李子恩",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2086",
      event_name: "霧峰森林營地",
      host_id: "h3086",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4086",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2024-09-02",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1087",
      name: "張宏珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2087",
      event_name: "彩虹草原營地",
      host_id: "h3087",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4087",
      description: "營區安靜，睡得很好，推薦！",
      date: "2025-11-07",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1088",
      name: "曾彥瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2088",
      event_name: "月影湖畔營地",
      host_id: "h3088",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4088",
      description: "離海邊很近，可以聽到海浪聲。",
      date: "2025-05-21",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1089",
      name: "徐庭茹",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2089",
      event_name: "風之谷營區",
      host_id: "h3089",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4089",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2024-10-23",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1090",
      name: "徐明穎",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2090",
      event_name: "松林谷地露營區",
      host_id: "h3090",
      host_name: "蔚然海岸"
    },
    comment: {
      id: "c4090",
      description: "晚上可以看到星星，廁所也很乾淨。",
      date: "2024-03-05",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1091",
      name: "吳明珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2091",
      event_name: "藍海灣露營地",
      host_id: "h3091",
      host_name: "嘎嘎作響"
    },
    comment: {
      id: "c4091",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2025-02-26",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1092",
      name: "徐宏茹",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2092",
      event_name: "星光山丘營地",
      host_id: "h3092",
      host_name: "山嵐小築"
    },
    comment: {
      id: "c4092",
      description: "環境非常優美，設施完善，適合親子同遊。",
      date: "2024-09-25",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1093",
      name: "黃彥翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2093",
      event_name: "溪谷林間營地",
      host_id: "h3093",
      host_name: "自然探險家"
    },
    comment: {
      id: "c4093",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2025-10-17",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1094",
      name: "吳宏瑜",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2094",
      event_name: "銀河谷露營地",
      host_id: "h3094",
      host_name: "野趣露營"
    },
    comment: {
      id: "c4094",
      description: "洗手間有點遠，但整體值得推薦。",
      date: "2024-07-17",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1095",
      name: "陳子輝",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2095",
      event_name: "沙丘秘境營區",
      host_id: "h3095",
      host_name: "沙嶼生活"
    },
    comment: {
      id: "c4095",
      description: "有小黑蚊要注意，其他都很好。",
      date: "2024-07-30",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1096",
      name: "王子豪",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2096",
      event_name: "霧峰森林營地",
      host_id: "h3096",
      host_name: "風林管理團隊"
    },
    comment: {
      id: "c4096",
      description: "離海邊很近，可以聽到海浪聲。",
      date: "2024-12-31",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1097",
      name: "曾明珊",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2097",
      event_name: "彩虹草原營地",
      host_id: "h3097",
      host_name: "彩虹露營會"
    },
    comment: {
      id: "c4097",
      description: "風景優美，但夜間有點吵。",
      date: "2025-08-09",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1098",
      name: "徐宏茹",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2098",
      event_name: "月影湖畔營地",
      host_id: "h3098",
      host_name: "月光小屋"
    },
    comment: {
      id: "c4098",
      description: "小朋友玩得很開心，下次會再來！",
      date: "2024-04-26",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1099",
      name: "周明翰",
      image: "/header/user_image.jpg"
    },
    eventInfo: {
      event_id: "e2099",
      event_name: "風之谷營區",
      host_id: "h3099",
      host_name: "風之谷小隊"
    },
    comment: {
      id: "c4099",
      description: "營區安靜，睡得很好，推薦！",
      date: "2024-08-02",
      rating: 4
    }
  },
];

export default sampleComments;