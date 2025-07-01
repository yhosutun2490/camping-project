// app/(admin)/activities/page.tsx


import { getAdminEvents } from "@/api/server-components/admin/event"
import AdminEventList from "@/components/Admin/AdminEventList";
// 假資料：實際可改成 SWR / fetch
// const mockActivities: EventInfo[] = [
//   {
//     id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//     host_info_id: "01dd3f66-431d-4041-b248-cdade474f15f",
//     title: "親子水樂園溪谷露營兩天一夜",
//     address: "新竹縣尖石鄉那羅部落水源營地",
//     description:
//       "炎炎夏日避暑首選，親子戲水、溪邊煮食、夜晚營火晚會，讓孩子與大自然建立連結！",
//     start_time: "2025-07-20T02:00:00.000Z",
//     end_time: "2025-07-21T08:00:00.000Z",
//     max_participants: 50,
//     cancel_policy: "全額退費需提前10日",
//     active: "pending",
//     status: "preparing",
//     registration_open_time: "2025-05-31T16:00:00.000Z",
//     registration_close_time: "2025-07-15T15:59:59.000Z",
//     latitude: 24.6589,
//     longitude: 121.3237,
//     created_at: "2025-05-03T08:51:55.591Z",
//     updated_at: "2025-05-03T08:51:55.591Z",
//     host: {
//       id: "01dd3f66-431d-4041-b248-cdade474f15f",
//       member_info_id: "ce795db1-a327-4f67-a9ad-886c0ac549ac",
//       name: "『六角瘋露營』",
//       description:
//         "我們是全台最熱愛寫程式、同時最擅長策劃露營活動的團隊，結合科技教育與戶外探索，致力於打造寓教於樂的露營體驗。不論是新手家庭、熱血學生、還是科技業夥伴，我們都能設計出兼具實用技能學習與自然生活體驗的活動內容。透過精緻的課程設計、專業的活動引導與完善的後勤支援，讓每一位參與者都能在山林間獲得成長、交流與放鬆。",
//       email: "hexschool@example.com",
//       phone: "0912345678",
//       verification_status: "unverified",
//       photo_url:
//         "https://storage.googleapis.com/everforest-e0f71.firebasestorage.app/host/avatars/6b7b99b6-7ec3-4828-846b-02d72e6c8dcb.jpg?GoogleAccessId=firebase-adminsdk-fbsvc%40everforest-e0f71.iam.gserviceaccount.com&Expires=1781243640&Signature=MCK5itRjSQDm6%2FzWE182%2FW8%2BgAWn7V%2FOKyRv6lgE%2BbJ%2FBA4Ybm4bYhVp16YegIog2pxKILli9n4GLhbO9TwLnXRUP%2Bd3at%2B3XyAzGBvMZCIuANOAqW%2Fw61%2BRH0yOobSBwoszl3sDtHDapeXcwxlRdE1%2BMoswskp%2BL%2FDXk8L17M8wKNrPjRBi1aPmeHjH%2FxFFrUFkiksdOZWQSzl0ld7pA%2B5RGrW4c8dYKILNZSEN8rDLBGW4O%2Fm3l2DqDcA5RjS7lilxU4CEbrhoUh5XeJqoW9%2B0cZyqZz%2B%2Fw2JIJEnxwkQvKhfpkRALC834knj3H40DyEwMGQ5qjZCjTH%2BMujnIEw%3D%3D",
//       photo_background_url:
//         "https://storage.googleapis.com/everforest-e0f71.firebasestorage.app/host/covers/f0503afc-be8c-478d-83e4-85805d340df4.png?GoogleAccessId=firebase-adminsdk-fbsvc%40everforest-e0f71.iam.gserviceaccount.com&Expires=1781244079&Signature=qJ3NyYOpoI6MeMbJuv5RZbOdorhu8WKi2pP4r%2BJzwiS42leRICS5mMkvWO%2Bo37ouf1fuxoSf%2FOw%2BiG23NWuxLgksDZDbNF35ZL9EEa5JOlczBWTyKLUICpFMa7V%2Fneets55RrsLyt5Of5ztViwRWV1yCd3XNDmqGvq1h4ihcNOI4u4fkiuXZDhAYmOeFhlBcQ%2F%2BLF4IJiy5EyXOi61hlI3mSc1c5ZwnvD5eLNtkdoomZmrZrZwXJxdnqvmlWblYsEJYZ5F3xc17OcNaMehDmvkCVZX1gZMCOb5y%2FlNIS9NufmamnokqaeDF6ybqOoouNpBfNQRG5NAObfmAg15rMug%3D%3D",
//       created_at: "2025-05-02T03:58:28.072Z",
//       updated_at: "2025-05-02T03:58:28.072Z",
//     },
//     photos: [
//       {
//         id: "12ab3f29-4e7b-49df-a701-4e64fd55524b",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "cover",
//         photo_url:
//           "https://storage.googleapis.com/everforest-e0f71.firebasestorage.app/event/covers/a48d4987-0c8a-4e94-9acf-3925506b845f.jpg?GoogleAccessId=firebase-adminsdk-fbsvc%40everforest-e0f71.iam.gserviceaccount.com&Expires=1746597118&Signature=l8Ien46qtpdMEzup3S7GqSECi7k1rdVroBV4lZDB3wwBrIPgBz06NN0o3JXyPI9O8Ti5NGhFQwZLxGgXvVlClHE%2BKqzhznNQSweK0SQg8MDlJpkZ4NXkmYC1m2OU6PptZGNrwtVUUm0y0PSWa%2FG3G%2BHcXA4pfacLaX9%2F2%2BMTuB1oPvQwbCADUguro%2BsH0EHqBZcJhm%2FEFaMUUg8R%2FPcV11WLxo4tCzl6u6oLseQn4yOpbxrrfrEHkoGAOsJ7lmzDFpHVC45hioGfdxByeX3fkg4HofnGRdYseH5irg%2FqfKc6L19rc%2B1XCBvqxcv4iYNLOKCzKnQl9OT6LkaLyHus2g%3D%3D",
//         description: null,
//         created_at: "2025-05-06T05:51:58.535Z",
//         updated_at: "2025-05-06T05:51:58.535Z",
//       },
//       {
//         id: "f400bbe2-86ac-4b03-b31a-2b3e0412162e",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "cover",
//         photo_url:
//           "https://storage.googleapis.com/everforest-e0f71.firebasestorage.app/event/covers/ac076de6-6e65-4e99-b6fa-3720c779fcd8.png?GoogleAccessId=firebase-adminsdk-fbsvc%40everforest-e0f71.iam.gserviceaccount.com&Expires=1746597121&Signature=AQ2WX1ABDPO9e4B2PQJ%2F5jYll0Nr%2FjuauCGyafwu2g8zsWo8e41bs44W64AXqNPO8JXIPXc2jomLY2ao3ODcEEbCmYmTdDQmQabf9u8PtbjwHriVcspayX%2BHMuEsJTDv2j8NEQQ71KPoZe8%2B5T0ZygNc%2Fx6pVNFFUmB%2BPtWx3XddIAu0Z9OdiOrm8K%2BeuyFzwrEXe2zCtrueEbHtlhdAH8Ltxs3UW4Qvzi89CKVXi5MZXPW0CfXiDdF5fxBjgi0d3CY39JGK3tf%2Bol5NBTFUHnzLSJWmZYNcVAmHdtj7wdIdG%2FrzDMU3I7FUIx%2FqJiD72HqkUbJ7gE0Zhaaiu618Sw%3D%3D",
//         description: null,
//         created_at: "2025-05-06T05:52:01.007Z",
//         updated_at: "2025-05-06T05:52:01.007Z",
//       },
//       {
//         id: "965b1bd7-e263-4766-8115-efac4c274c1b",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "detail",
//         photo_url:
//           "https://storage.googleapis.com/everforest-e0f71.firebasestorage.app/event/details/159a0bfd-4da2-4b30-b399-b6d3572fee36.jpg?GoogleAccessId=firebase-adminsdk-fbsvc%40everforest-e0f71.iam.gserviceaccount.com&Expires=1746597348&Signature=A1uyllpedLqoMQ2dHKLOdE44Hb4QoYGzhPr%2BBoXmbgPlfBDbgUP0AftwtESMYnmnD2tK6IhTYagSMgTKTpVXPiF1VJ47roCTilCURrnmauK6g5tZzKYJ0ZnhHwJ1XofTzuzf1KmraeB4swFufnr0vtfmbOzg8I73yrsyvtpHnkGllEnYIHYwmQb7Mc%2FezcPAVdJ8HeTVEZ9%2BQSAYHdmeI5wFa9PYGxuW8ZZKxl3miL389QCv5mDJ61SIO1QT3vft5awz0BhwVqWXIyYI%2B%2BcI%2B%2BVfd9HJtNcYOQ%2FUbreL66feBir6e5KoqFkSWMoqP2esZr6bwoGXoVUdUGqFXIY2xg%3D%3D",
//         description:
//           "在野地的山林，築起營火，溫暖身在自然中的我們彼此，拾起童心與共享天倫之樂！",
//         created_at: "2025-05-06T05:55:48.415Z",
//         updated_at: "2025-05-06T05:55:48.415Z",
//       },
//       {
//         id: "5ead47e0-c0f4-4b2a-8168-42651a5e2146",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "detail",
//         photo_url:
//           "https://storage.googleapis.com/everforest-e0f71.firebasestorage.app/event/details/9ca7bce5-0bc3-4a29-a126-caee062f8323.jpg?GoogleAccessId=firebase-adminsdk-fbsvc%40everforest-e0f71.iam.gserviceaccount.com&Expires=1746597350&Signature=Enb3lrJIPWIJ%2BVE8Tfx98Wv0k0giWjkObPArZm0mmBqmAAaTlZY6eNiO0DWOZdlwp6rhYIQryRqVk5JorYbNp3kxT%2Fwm%2BfXc8lM%2BCwNamWdxBCDAiIoh%2BAEvIq9TW8yfAOt%2BSG3ZLltcuqoRx%2BWCJYA%2Fyxk%2BkKsN7WHA93VayDSu1f9eNFDLLVXkhoWIwjXIQApl6LUk2Mu3OpShedGYEl1gC4ts8NggNVIhq%2BEVpha8Xw8yzSA6RQRCOYPzrrGXQLblbVefebcbbaoCe548Wqvc4MYSGDKfYfogNhQvghsH9wuTGEDmPzyu30DTEb0I5g4OnIuy1S4ryE1OSunfZg%3D%3D",
//         description:
//           "被大自然環抱著，回歸最樸實的初心，搭營倚著河畔，和最愛的家人重拾最初最天然的自己，把煩惱拋出山林之外！",
//         created_at: "2025-05-06T05:55:50.656Z",
//         updated_at: "2025-05-06T05:55:50.656Z",
//       },
//     ],
//     notices: [
//       {
//         id: "40cced1a-a8c4-4f92-a0bd-e88d09edb054",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content: "請攜帶防蚊液與防曬乳，以應對夏季戶外活動中的蚊蟲與陽光曝曬。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//       {
//         id: "d74709f1-7451-4f5b-823b-c56b2d37cd32",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content:
//           "集合地點：活動開始當天在樂灣糧倉園區(如地址所示)集合，請準時集合以便順利出發。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//       {
//         id: "8402d95e-c98d-4291-964f-bca304e767cb",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content: "僅限大型重機參加，請於報名後提供車型與行照資料（不會公開）。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//       {
//         id: "f78fd5be-8069-4d0a-b0ae-257cea12e00e",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content: "全程需配合安全帽與交通規範，禁止危險駕駛。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//       {
//         id: "fb7d8d34-1aab-4707-afa7-ad043bf124c4",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content: "若遇天候或災害不宜出團，將全額退費或延期通知。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//       {
//         id: "f73682c4-ad28-42e5-a223-1212f4533820",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content: "請記得攜帶個人藥品以及雨具或常用的隨需個人用品。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//       {
//         id: "d30f6419-2deb-4a0d-991a-cdff7158fb3b",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content: "本次活動搭配：活動車貼、頭巾、雷雕杯，參加即送！。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//       {
//         id: "fe04d5d6-468d-4a66-956c-770fab037b21",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         type: "行前提醒",
//         content: "行車時，請勿超速或做任何危險駕駛動作，否則將退團不予退費。",
//         created_at: "2025-06-12T07:45:45.677Z",
//         updated_at: "2025-06-12T07:45:45.677Z",
//       },
//     ],
//     plans: [
//       {
//         id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         title: "【五人帳區 SKYDOME 豪華野營組】雙層透氣帳篷（最多5人含孩童）",
//         price: 3000,
//         discounted_price: 2069,
//         people_capacity: 0,
//         created_at: "2025-05-06T06:02:24.511Z",
//         updated_at: "2025-05-06T06:02:24.511Z",
//         eventPlanContentBox: [
//           {
//             id: "fdb826b7-c8f3-453e-9057-4da036058ee8",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             content: "一泊二食：含早餐與專業 BBQ 晚餐（台灣在地食材）",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "2578d762-8f72-4ef0-a538-ff9d430a2590",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             content:
//               "專人搭設 SKYDOME 雙層透氣帳，帳內附設地墊、LED 燈條、野營桌椅",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "44ff239c-2bab-4c7c-a8a2-2a54c292c680",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             content: "獨立營位區塊，鄰近溪流與木棧道，享受私密山林空間",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "fac0d7fe-b1ac-4eaa-b32c-b58db74b5d43",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             content: "帳篷大小彈性配置，可依家庭人數與活動性質調整",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "1777b241-98ca-411d-bf2b-c0f9886f5f21",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             content: "專屬防蚊區與遮陰天幕，營位全天候保持舒適",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//         ],
//         eventPlanAddonBox: [
//           {
//             id: "a1565608-30c3-4b49-898e-c042e29d3838",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             name: "戶外懶人沙發 x2",
//             price: 300,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "986a83d7-75e2-4a65-bf27-e5df2c9ce5d9",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             name: "LED 露營燈組",
//             price: 200,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "ff9caa81-5e6f-4c33-985e-68ecbb22c2a4",
//             event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
//             name: "天幕遮陽棚（附吊燈與布幔）",
//             price: 500,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//         ],
//       },
//       {
//         id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         title: "【輕裝體驗組】雙人經典帳＋景觀營位",
//         price: 2500,
//         discounted_price: 1980,
//         people_capacity: 0,
//         created_at: "2025-05-06T06:02:24.511Z",
//         updated_at: "2025-05-06T06:02:24.511Z",
//         eventPlanContentBox: [
//           {
//             id: "07f62ac1-4b8c-4b7e-ae6c-461f853ad75e",
//             event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//             content:
//               "提供睡墊、野營椅與 LED 露營燈，適合輕裝入門旅人或好友同行",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "10fb4a67-0906-47b1-bfd7-e88faf38e5b4",
//             event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//             content: "晚餐升級：山野燒肉組（牛豬雙拼＋野菜盤＋手工醬料）",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "a75c1edb-102b-4755-87f2-108ead468994",
//             event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//             content: "營位鄰近溪谷步道與夜間投影活動區，視野遼闊，景觀絕佳",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "72057124-7943-42dc-bece-6999a21e80cb",
//             event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//             content: "贈送手沖咖啡體驗一次（每帳），享受早晨山林香氣",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//         ],
//         eventPlanAddonBox: [
//           {
//             id: "a87b5420-bc8b-4d9e-8fe8-49e9aa174cca",
//             event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//             name: "延長住宿至中午12點退房",
//             price: 200,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "04fb5395-b485-497b-971d-f395c4944704",
//             event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//             name: "簡易炊事套組（瓦斯爐＋鍋具＋餐具）",
//             price: 350,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "f976b8be-d238-48a6-8131-4c1bc4a9cb7c",
//             event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
//             name: "露天投影機租用（含布幕＋藍牙喇叭）",
//             price: 500,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//         ],
//       },
//       {
//         id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//         event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
//         title: "【親子專屬帳篷區】四人帳含玩水裝備＋森林任務包",
//         price: 2800,
//         discounted_price: 2100,
//         people_capacity: 0,
//         created_at: "2025-05-06T06:02:24.511Z",
//         updated_at: "2025-05-06T06:02:24.511Z",
//         eventPlanContentBox: [
//           {
//             id: "8b860ac6-5241-4db6-b02e-f03b3b4c2d7b",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             content:
//               "提供親子四人帳（附睡墊與室內小燈飾），營位距離溪水僅10公尺",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "af23f59f-9561-4bb5-9d68-9a529ebaf18d",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             content: "包含親水安全裝備（兒童浮具、防滑水鞋、戶外地墊）",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "dcdd4f26-50ab-4365-9bb3-51247bc4cfeb",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             content: "每組家庭將獲得『森林任務包』一份，鼓勵孩子與自然互動",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "7a516e4c-f588-4215-91ac-0548c7d8b156",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             content: "晚餐為親子互動式焚火料理體驗（附專人指導與食材）",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "9d2155b9-b007-4624-b0ff-6e7b9ea187ff",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             content: "營地特設夜間微光燈區，適合小朋友探索與說故事時光",
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//         ],
//         eventPlanAddonBox: [
//           {
//             id: "adb54215-fa2b-42d0-a0d5-2c3737c90b2e",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             name: "專屬攝影服務（15 張精修照）",
//             price: 600,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "31d73679-2e68-4d96-888b-9e15102028a1",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             name: "多功能親子遊戲帳",
//             price: 400,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//           {
//             id: "85992123-f6a5-49bb-81a9-a4d20e767532",
//             event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
//             name: "泡泡機與戶外玩具組",
//             price: 150,
//             created_at: "2025-05-06T06:02:24.511Z",
//             updated_at: "2025-05-06T06:02:24.511Z",
//           },
//         ],
//       },
//     ],
//     tags: [
//       {
//         id: "671a85d8-baf5-49e2-8cfc-19084a9b0abc",
//         name: "進階挑戰",
//         description:
//           "這不是 Glamping，這是硬派挑戰！野地搭帳、生火烹飪、無電原始生活，邀請你和自然正面對決。你會發現，簡單生活才是最極致的浪漫，每一次挑戰都讓你更靠近真正的野營玩家。",
//         level: "hard",
//       },
//       {
//         id: "22c5ca29-8700-4ac6-aeac-7631440d8aca",
//         name: "團體活動",
//         description:
//           "不只是露營，更是一場團隊挑戰賽！闖關任務、默契大考驗，適合公司團建、學校社團或好朋友，一起笑、一起瘋，留下最真實的回憶與凝聚力爆棚的夥伴情。",
//         level: "medium",
//       },
//       {
//         id: "05ea9e21-1964-4dd3-976a-82939be58d4f",
//         name: "騎士 Chill 行",
//         description:
//           "引擎一發，旅程就開始了。重機騎士專屬的露營基地，白天馳騁山路、晚上營火談車、帳篷旁停著你的寶貝機車。速度與風景共舞，這是屬於自由靈魂的帥氣夜晚。",
//         level: "medium",
//       },
//     ],
//     comments: [],
//   },
// ];

export default async function ActivityAuditPage() {
  const pending = await getAdminEvents('pending')
  const reject = await getAdminEvents('reject')
  const unpublishPending= await getAdminEvents('unpublish_pending')
  const archived = await getAdminEvents('archived')
  const eventsPending = pending?.data_lists ?? [];
  const eventReject = reject?.data_lists?? [];
  const eventUnPublishPending = unpublishPending?.data_lists ?? []
  const eventArchived = archived?.data_lists?? []

  return (
    <section className="mx-auto">
      <h1 className="mb-6 heading-2 text-neutral-950">待審核活動清單</h1>
      <AdminEventList 
        pendingEvents={eventsPending} 
        rejectEvents={eventReject} 
        unpublishPending={eventUnPublishPending}
        archivedEvents={eventArchived}
      />
    </section>
  );
}
