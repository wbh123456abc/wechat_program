// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

async function loaddis(name){
    var dis = new Array()
    var disa = await calladd({name:name, id:'a'})
    disa = disa.result.data.dis
    for(var i = 0; i < disa.length; i++)
    {
      dis.push(disa[i])
    }
    disa = await calladd({name:name, id:'b'})
    disa = disa.result.data.dis
    for(var i = 0; i < disa.length; i++)
    {
      dis.push(disa[i])
    }
    disa = await calladd({name:name, id:'c'})
    disa = disa.result.data.dis
    for(var i = 0; i < disa.length; i++)
    {
      dis.push(disa[i])
    }
    return dis
}
async function calladd(p){
    return new Promise(function(resolve, reject){
      cloud.callFunction({
        name:'add',
        data:{
          name:p.name,
          id:p.id
        }
      }).then(res=>{
        resolve(res)
      })
    })
}
function Max(a,b)
{
  if(a>b){
    return a
  }
  else{
    return b
  }
}
function point(num, dis){
  var level = dis/1000
  //return dis/Max(1,Math.sqrt(num))
  return level / Max(1,num)
  //return dis
}
function cal_cost(cost){
  //return Math.ceil(cost/100)
  var num = 0
  //console.log(cost)
  if(typeof(cost) == 'string')
  {
    for(var i = 0; i < cost.length; i++)
    {
        if(cost[i] == ',') continue;
        num = num*10 + (cost[i]-'0')
    }
    //console.log(cost)
    //console.log(num)
  }
  else num = cost
  return num
}
function lost(x)
{
  return Math.sqrt(x)
}
function get_id(x){
    if(x == 0 || x == 2) return 0;
    if(x == 1 || x == 3) return 1;
    return 2;
}
// 云函数入口函数
exports.main = async (event, context) => {

    var jingdian = await calladd({name:'jingdiandz', id:'dizhi'})
    jingdian = jingdian.result.data.list
    var jiudian = await calladd({name:'jiudiandz', id:'dizhi'})
    jiudian = jiudian.result.data.list
    var meishi = await calladd({name:'meishidz', id:'dizhi'})
    meishi = meishi.result.data.list
    var t = event.t
    var T = t*5
    var mon = cal_cost(event.mon)
    console.log(t)
    console.log(mon)
    var INF = 10000000
    var chosen = new Array()
    var reroute = new Array()
    for(var i = 0; i < 3; i++){
        chosen[i] = new Array()
        for(var j = 0; j < jiudian.length; j++){
            chosen[i][j] = 0
        }
    }
    var nowpos = 0
    var dis = event.dis
    var Min = INF
    for(var i = 0; i < dis.length; i++)
    {
        //console.log(i)
        var dic = jingdian[i]
        var cost = cal_cost(dic.cost)
        if(cost >= mon) continue
        if(point(dic.num, dis[i]) < Min)
        {
            Min = point(dic.num, dis[i])
            nowpos = i
        }
    }
    reroute.push(jingdian[nowpos])
    mon -= cal_cost(jingdian[nowpos].cost)
    chosen[get_id(0)][nowpos] = 1
    console.log(nowpos)
    
    var disjingdianmeishi = await calladd({name:'jingdianmeishi', id:'a'})
    disjingdianmeishi = disjingdianmeishi.result.data.dis
    //console.log(disjingdianmeishi)
    var disjiudianmeishi = await loaddis('jiudianmeishi')
    //console.log(disjiudianmeishi)
    var disjiudianjingdian = await loaddis('jiudianjingdian')
    
    for(var day = 0; day < t; day++)
        for(var i = 0; i < 5; i++)
        {
          if(i == 0 && day == 0) {continue}
          var maxj
          var dis
          var maxlst
          var disrev = 0
          Min = INF
          var nxtpos = 0
          var nxtcost = 0
          if(i == 0) {dis = disjiudianjingdian; maxj = jingdian.length; maxlst = jiudian.length}
          else if(i == 1 || i == 2 || i == 3) 
          {
            dis = disjingdianmeishi
            if(i == 1 || i == 3) {maxj = meishi.length; maxlst = jingdian.length;}
            else {maxj = jingdian.length; maxlst = meishi.length; disrev = 1;}
          }
          else if(i == 4) 
          {
            dis = disjiudianmeishi
            maxj = jiudian.length
            maxlst = meishi.length
            disrev = 1
          }
          
          for(var j = 0; j < maxj; j++)
          {
            if(chosen[get_id(i)][j] == 1) continue;
            var cost
            var num
            if(i == 0 || i == 2) {
              cost = cal_cost(jingdian[j].cost)
              num = jingdian[j].num
            }
            if(i == 1 || i == 3) {
              cost = cal_cost(meishi[j].cost)
              num = meishi[j].num
            }
            if(i == 4) {
              cost = cal_cost(jiudian[j].cost)
              num = jiudian[j].num
            }
            if(cost >= mon) continue;
            var distance = 0
            if(disrev == 0) distance = dis[nowpos][j]
            else distance = dis[j][nowpos]
            if(point(num, distance) < Min)
            {
                Min = point(num, distance)
                nxtpos = j
                nxtcost = cost
            }
          }
          nowpos = nxtpos
          if(Min == INF) return reroute;
          if(i == 0 || i == 2) reroute.push(jingdian[nowpos])
          else if(i == 1 || i == 3) reroute.push(meishi[nowpos])
          else reroute.push(jiudian[nowpos])
          mon -= nxtcost
          //console.log(mon)
          chosen[get_id(i)][nowpos] = 1
        }
    return reroute
}