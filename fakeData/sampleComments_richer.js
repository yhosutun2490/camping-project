const sampleComments = [
  {
    userInfo: {
      user_id: "u1000",
      name: "曾彥翰",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2024-03-25",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1001",
      name: "林佳珮",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-05-12",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1002",
      name: "黃柏輝",
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
      description: "最失望的一次露營，地面凹凸不平難以搭帳，還好備有防潮墊勉強解決。",
      date: "2024-02-02",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1003",
      name: "王彥傑",
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
      description: "營主態度還算可以，但對新手露營者的說明稍微不足，得自己摸索。",
      date: "2024-06-05",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1004",
      name: "林明瑜",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2024-10-27",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1005",
      name: "陳柏茹",
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
      description: "整體露營體驗中規中矩，沒有太大問題但也沒特別驚喜，適合初學者體驗。",
      date: "2024-04-03",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1006",
      name: "王佳珮",
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
      description: "最失望的一次露營，地面凹凸不平難以搭帳，還好備有防潮墊勉強解決。",
      date: "2025-05-11",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1007",
      name: "吳明恩",
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
      description: "風景優美，營位之間有足夠距離，保有隱私感。晚餐在帳篷外看夕陽是一大享受。",
      date: "2024-10-08",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1008",
      name: "曾庭輝",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-07-20",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1009",
      name: "林明珊",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2024-03-26",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1010",
      name: "王彥瑜",
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
      description: "晚上還能參加主辦的星空導覽活動，小朋友聽得津津有味，是一段非常難忘的體驗。",
      date: "2024-05-17",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1011",
      name: "周欣瑜",
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
      description: "營主態度還算可以，但對新手露營者的說明稍微不足，得自己摸索。",
      date: "2024-08-19",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1012",
      name: "張明瑜",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2024-12-23",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1013",
      name: "徐明豪",
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
      description: "公共設施老舊且清潔度不佳，尤其廁所異味重，實在無法久待。",
      date: "2024-11-15",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1014",
      name: "陳詠瑜",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-08-16",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1015",
      name: "李詠珊",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2025-04-05",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1016",
      name: "徐子豪",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2025-04-11",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1017",
      name: "王詠翰",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2024-09-22",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1018",
      name: "徐彥瑜",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2024-08-06",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1019",
      name: "李詠輝",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2025-03-15",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1020",
      name: "徐宏恩",
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
      description: "夜間燈光不足，小朋友走路差點絆倒，營主應加強安全措施。",
      date: "2024-04-23",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1021",
      name: "王柏瑜",
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
      description: "營地地勢平坦，適合搭帳，夜晚營火區氣氛超棒，孩子們玩得非常開心，是難得的親子時光。",
      date: "2024-08-15",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1022",
      name: "李子恩",
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
      description: "風景優美，營位之間有足夠距離，保有隱私感。晚餐在帳篷外看夕陽是一大享受。",
      date: "2024-06-10",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1023",
      name: "曾柏恩",
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
      description: "營區位置不錯，進出方便，但假日人多時會稍嫌吵雜，建議平日前往會比較悠閒。",
      date: "2024-01-20",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1024",
      name: "黃柏瑜",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2024-09-25",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1025",
      name: "吳彥豪",
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
      description: "從預約到入住過程都非常順利，營地主人貼心地介紹了附近的景點與步道，非常值得一遊。",
      date: "2024-09-29",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1026",
      name: "吳子輝",
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
      description: "場地本身不錯，但部分營位靠近廁所，味道略重。整體維持尚可，若再改善會更理想。",
      date: "2025-03-16",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1027",
      name: "王宏翰",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2025-05-26",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1028",
      name: "曾宏瑜",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-06-01",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1029",
      name: "林宏瑜",
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
      description: "整體露營體驗中規中矩，沒有太大問題但也沒特別驚喜，適合初學者體驗。",
      date: "2024-06-04",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1030",
      name: "張欣珮",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-01-26",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1031",
      name: "周欣豪",
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
      description: "風景優美，營位之間有足夠距離，保有隱私感。晚餐在帳篷外看夕陽是一大享受。",
      date: "2025-03-01",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1032",
      name: "李佳輝",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-12-06",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1033",
      name: "周宏豪",
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
      description: "蚊蟲極多，噴了防蚊液也沒什麼用，夜裡幾乎睡不好，希望營區能處理。",
      date: "2025-04-30",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1034",
      name: "周宏翰",
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
      description: "營地地勢平坦，適合搭帳，夜晚營火區氣氛超棒，孩子們玩得非常開心，是難得的親子時光。",
      date: "2024-10-30",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1035",
      name: "林子輝",
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
      description: "網站照片看起來很美，但實際環境有落差，感覺沒有維護，草地也不整齊。",
      date: "2024-01-09",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1036",
      name: "吳佳輝",
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
      description: "晚上還能參加主辦的星空導覽活動，小朋友聽得津津有味，是一段非常難忘的體驗。",
      date: "2024-06-16",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1037",
      name: "林子翰",
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
      description: "營區位置不錯，進出方便，但假日人多時會稍嫌吵雜，建議平日前往會比較悠閒。",
      date: "2024-09-01",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1038",
      name: "陳子翰",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2024-01-28",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1039",
      name: "王子穎",
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
      description: "最失望的一次露營，地面凹凸不平難以搭帳，還好備有防潮墊勉強解決。",
      date: "2024-01-22",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1040",
      name: "王子茹",
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
      description: "從預約到入住過程都非常順利，營地主人貼心地介紹了附近的景點與步道，非常值得一遊。",
      date: "2024-01-10",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1041",
      name: "陳欣珮",
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
      description: "營地地勢平坦，適合搭帳，夜晚營火區氣氛超棒，孩子們玩得非常開心，是難得的親子時光。",
      date: "2025-04-28",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1042",
      name: "吳佳翰",
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
      description: "公共設施老舊且清潔度不佳，尤其廁所異味重，實在無法久待。",
      date: "2024-10-25",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1043",
      name: "林佳翰",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-02-20",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1044",
      name: "周宏瑜",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-08-02",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1045",
      name: "徐宏穎",
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
      description: "整體露營體驗中規中矩，沒有太大問題但也沒特別驚喜，適合初學者體驗。",
      date: "2025-02-09",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1046",
      name: "黃柏恩",
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
      description: "營區位置不錯，進出方便，但假日人多時會稍嫌吵雜，建議平日前往會比較悠閒。",
      date: "2024-08-03",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1047",
      name: "曾柏輝",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2024-02-05",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1048",
      name: "李柏傑",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2024-05-31",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1049",
      name: "曾明茹",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2024-12-29",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1050",
      name: "李子珮",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2024-12-25",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1051",
      name: "王欣茹",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2025-05-11",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1052",
      name: "張子珮",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-04-02",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1053",
      name: "吳佳瑜",
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
      description: "夜間燈光不足，小朋友走路差點絆倒，營主應加強安全措施。",
      date: "2024-06-11",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1054",
      name: "林彥傑",
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
      description: "營主態度還算可以，但對新手露營者的說明稍微不足，得自己摸索。",
      date: "2024-12-29",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1055",
      name: "林明珊",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2024-11-05",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1056",
      name: "吳明翰",
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
      description: "夜間燈光不足，小朋友走路差點絆倒，營主應加強安全措施。",
      date: "2024-11-12",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1057",
      name: "林子瑜",
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
      description: "風景優美，營位之間有足夠距離，保有隱私感。晚餐在帳篷外看夕陽是一大享受。",
      date: "2024-09-25",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1058",
      name: "林柏輝",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2024-09-11",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1059",
      name: "陳宏穎",
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
      description: "晚上還能參加主辦的星空導覽活動，小朋友聽得津津有味，是一段非常難忘的體驗。",
      date: "2024-01-12",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1060",
      name: "張欣輝",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2024-09-08",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1061",
      name: "吳宏珊",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-01-07",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1062",
      name: "吳子豪",
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
      description: "營區位置不錯，進出方便，但假日人多時會稍嫌吵雜，建議平日前往會比較悠閒。",
      date: "2025-04-07",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1063",
      name: "曾佳茹",
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
      description: "夜間燈光不足，小朋友走路差點絆倒，營主應加強安全措施。",
      date: "2025-02-07",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1064",
      name: "黃欣珊",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-05-13",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1065",
      name: "林宏穎",
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
      description: "營地地勢平坦，適合搭帳，夜晚營火區氣氛超棒，孩子們玩得非常開心，是難得的親子時光。",
      date: "2024-02-03",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1066",
      name: "張柏輝",
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
      description: "從預約到入住過程都非常順利，營地主人貼心地介紹了附近的景點與步道，非常值得一遊。",
      date: "2024-07-11",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1067",
      name: "黃彥瑜",
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
      description: "營主態度還算可以，但對新手露營者的說明稍微不足，得自己摸索。",
      date: "2024-04-09",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1068",
      name: "林柏瑜",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-05-09",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1069",
      name: "李彥恩",
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
      description: "晚上還能參加主辦的星空導覽活動，小朋友聽得津津有味，是一段非常難忘的體驗。",
      date: "2025-03-03",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1070",
      name: "周佳穎",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-06-11",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1071",
      name: "周明恩",
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
      description: "營主態度還算可以，但對新手露營者的說明稍微不足，得自己摸索。",
      date: "2024-12-15",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1072",
      name: "王彥輝",
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
      description: "場地本身不錯，但部分營位靠近廁所，味道略重。整體維持尚可，若再改善會更理想。",
      date: "2024-06-08",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1073",
      name: "李詠恩",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2025-03-09",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1074",
      name: "林柏瑜",
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
      description: "晚上還能參加主辦的星空導覽活動，小朋友聽得津津有味，是一段非常難忘的體驗。",
      date: "2025-02-06",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1075",
      name: "陳詠恩",
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
      description: "營主態度冷淡，詢問事情感覺被敷衍，不會再考慮來第二次。",
      date: "2024-02-06",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1076",
      name: "李宏輝",
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
      description: "營區位置不錯，進出方便，但假日人多時會稍嫌吵雜，建議平日前往會比較悠閒。",
      date: "2024-07-25",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1077",
      name: "吳欣翰",
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
      description: "場地本身不錯，但部分營位靠近廁所，味道略重。整體維持尚可，若再改善會更理想。",
      date: "2025-05-26",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1078",
      name: "王柏珮",
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
      description: "營地地勢平坦，適合搭帳，夜晚營火區氣氛超棒，孩子們玩得非常開心，是難得的親子時光。",
      date: "2024-07-09",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1079",
      name: "陳柏穎",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-02-13",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1080",
      name: "周子輝",
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
      description: "從預約到入住過程都非常順利，營地主人貼心地介紹了附近的景點與步道，非常值得一遊。",
      date: "2024-11-22",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1081",
      name: "吳庭恩",
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
      description: "營區位置不錯，進出方便，但假日人多時會稍嫌吵雜，建議平日前往會比較悠閒。",
      date: "2024-02-26",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1082",
      name: "吳柏輝",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-09-11",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1083",
      name: "周詠茹",
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
      description: "公共設施老舊且清潔度不佳，尤其廁所異味重，實在無法久待。",
      date: "2024-08-23",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1084",
      name: "李明豪",
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
      description: "從預約到入住過程都非常順利，營地主人貼心地介紹了附近的景點與步道，非常值得一遊。",
      date: "2024-11-18",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1085",
      name: "曾柏傑",
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
      description: "網站照片看起來很美，但實際環境有落差，感覺沒有維護，草地也不整齊。",
      date: "2025-05-16",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1086",
      name: "陳明豪",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2025-05-20",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1087",
      name: "徐宏翰",
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
      description: "最失望的一次露營，地面凹凸不平難以搭帳，還好備有防潮墊勉強解決。",
      date: "2024-01-12",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1088",
      name: "張彥穎",
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
      description: "場地本身不錯，但部分營位靠近廁所，味道略重。整體維持尚可，若再改善會更理想。",
      date: "2025-05-01",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1089",
      name: "李子傑",
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
      description: "洗手台水壓有點小，廚房使用時需要排隊，但還在可接受範圍內。",
      date: "2024-08-20",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1090",
      name: "陳柏珊",
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
      description: "營地設施完善，從洗澡間到共用廚房都保持得很乾淨，讓人感受到經營者的用心。",
      date: "2024-06-16",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1091",
      name: "張子穎",
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
      description: "從預約到入住過程都非常順利，營地主人貼心地介紹了附近的景點與步道，非常值得一遊。",
      date: "2024-04-21",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1092",
      name: "黃柏輝",
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
      description: "這是我們家第二次造訪，設施有明顯升級，還新設了洗衣區和兒童遊戲區，大人小孩都滿意。",
      date: "2024-09-02",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1093",
      name: "吳宏豪",
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
      description: "從預約到入住過程都非常順利，營地主人貼心地介紹了附近的景點與步道，非常值得一遊。",
      date: "2025-05-17",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1094",
      name: "吳欣傑",
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
      description: "環境乾淨但缺乏遮蔭，白天較熱，需自備遮陽布，夜晚則很涼爽。",
      date: "2024-04-15",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1095",
      name: "吳宏珊",
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
      description: "蚊蟲極多，噴了防蚊液也沒什麼用，夜裡幾乎睡不好，希望營區能處理。",
      date: "2025-03-10",
      rating: 3
    }
  },
  {
    userInfo: {
      user_id: "u1096",
      name: "王詠珊",
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
      description: "這次露營經驗非常棒，營區環境整潔，工作人員也很親切，晚上還能看到滿天星星，非常浪漫！會推薦給朋友。",
      date: "2025-01-04",
      rating: 5
    }
  },
  {
    userInfo: {
      user_id: "u1097",
      name: "張子茹",
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
      description: "營區位置不錯，進出方便，但假日人多時會稍嫌吵雜，建議平日前往會比較悠閒。",
      date: "2024-03-14",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1098",
      name: "張子瑜",
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
      description: "營主態度還算可以，但對新手露營者的說明稍微不足，得自己摸索。",
      date: "2024-02-08",
      rating: 4
    }
  },
  {
    userInfo: {
      user_id: "u1099",
      name: "曾詠瑜",
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
      description: "夜間燈光不足，小朋友走路差點絆倒，營主應加強安全措施。",
      date: "2024-07-13",
      rating: 3
    }
  },
];
const updatedComments = sampleComments.map(comment => {
  const random = Math.floor(Math.random() * 1000);
  return {
    ...comment,
    userInfo: {
      ...comment.userInfo,
      image: `https://i.pravatar.cc/150?u=${random}`
    }
  };
});
export default updatedComments;