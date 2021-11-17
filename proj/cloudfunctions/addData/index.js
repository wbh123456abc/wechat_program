// 云函数入口文件
const { database } = require('wx-server-sdk')
const cloud = require('wx-server-sdk')

cloud.init()
let db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('log').add({
    data: {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      description: "learn cloud database",
      due: new Date("2018-09-01"),
      tags: [
        "cloud",
        "database"
      ],
      // 为待办事项添加一个地理位置（113°E，23°N）
      location: new db.Geo.Point(113, 23),
      done: false
    },
  })
}