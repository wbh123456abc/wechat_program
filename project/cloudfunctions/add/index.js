// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {

    const db = cloud.database()
    var res = await db.collection(event.name).doc(event.id).get()
    var lst = res.data.list
    /*
    for (var dic of lst)
    {
        //console.log(dic)
        var name = dic.name
        var num = dic.num
        var point = dic.point
        var cost = dic.cost
        console.log(name)
        console.log(num)
        console.log(point)
        console.log(cost)
        break
    }
    */
    return res
}

